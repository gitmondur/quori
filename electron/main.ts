import { app, BrowserWindow, ipcMain, shell, dialog } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import http from 'node:http'
import crypto from 'node:crypto'
import type { AddressInfo } from 'node:net'
import { autoUpdater } from 'electron-updater'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// ── Google OAuth (PKCE, loopback redirect) ────────────────────────────────────

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
const SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/bigquery',
].join(' ')


ipcMain.handle(
  'google-auth',
  async (_event, clientId: string, clientSecret: string) => {
    try {
      // PKCE setup
      const verifier = crypto.randomBytes(32).toString('base64url')
      const challenge = crypto
        .createHash('sha256')
        .update(verifier)
        .digest('base64url')

      // Find a free port first via a temp server
      const port = await new Promise<number>((resolve, reject) => {
        const tmp = http.createServer()
        tmp.listen(0, '127.0.0.1', () => {
          const p = (tmp.address() as AddressInfo).port
          tmp.close(() => resolve(p))
        })
        tmp.on('error', reject)
      })

      const redirectUri = `http://127.0.0.1:${port}/callback`

      const authUrl = new URL(GOOGLE_AUTH_URL)
      authUrl.searchParams.set('client_id', clientId)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('response_type', 'code')
      authUrl.searchParams.set('scope', SCOPES)
      authUrl.searchParams.set('code_challenge', challenge)
      authUrl.searchParams.set('code_challenge_method', 'S256')
      authUrl.searchParams.set('access_type', 'offline')
      authUrl.searchParams.set('prompt', 'consent')

      // Start listening BEFORE opening browser
      const codePromise = new Promise<string>((resolve, reject) => {
        const server = http.createServer((req, res) => {
          const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`)
          const code = url.searchParams.get('code')
          const error = url.searchParams.get('error')

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          if (code) {
            res.end(`
              <html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#0f172a;color:#e2e8f0">
                <h2 style="color:#818cf8">&#10003; Signed in to Quori!</h2>
                <p style="color:#94a3b8">You can close this tab and return to the app.</p>
              </body></html>`)
            server.close()
            resolve(code)
          } else {
            res.end(`<html><body><p>Error: ${error ?? 'unknown'}</p></body></html>`)
            server.close()
            reject(new Error(error ?? 'auth_cancelled'))
          }
        })

        server.listen(port, '127.0.0.1')
        setTimeout(() => { server.close(); reject(new Error('timeout')) }, 5 * 60 * 1000)
      })

      await shell.openExternal(authUrl.toString())
      const code = await codePromise

      // Exchange code → tokens
      const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code_verifier: verifier,
        }),
      })
      const tokens = await tokenRes.json() as {
        access_token: string
        refresh_token?: string
        expires_in: number
        error?: string
      }
      if (tokens.error) throw new Error(tokens.error)

      // Fetch user profile
      const profileRes = await fetch(GOOGLE_USERINFO_URL, {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })
      const profile = await profileRes.json() as {
        email: string
        name: string
        picture: string
        sub: string
      }

      return {
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        sub: profile.sub,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? null,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      }
    } catch (err) {
      return { error: (err as Error).message }
    }
  },
)

ipcMain.handle(
  'google-refresh',
  async (_event, clientId: string, clientSecret: string, refreshToken: string) => {
    try {
      const res = await fetch(GOOGLE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      })
      const tokens = await res.json() as {
        access_token: string
        expires_in: number
        error?: string
      }
      if (tokens.error) throw new Error(tokens.error)
      return {
        accessToken: tokens.access_token,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      }
    } catch (err) {
      return { error: (err as Error).message }
    }
  },
)

// ── App lifecycle ─────────────────────────────────────────────────────────────

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.whenReady().then(() => {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'A new version of Quori has been downloaded. Restart to apply?',
      buttons: ['Restart', 'Later'],
    })
    .then(result => {
      if (result.response === 0) autoUpdater.quitAndInstall()
    })
})
