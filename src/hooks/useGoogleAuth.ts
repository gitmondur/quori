import { useCallback } from 'react';
import { usePersistedState } from './usePersistedState';
import { GoogleUser, OAuthConfig } from '../types';

const isElectron = typeof window !== 'undefined' && Boolean(window.ipcRenderer);

export function useGoogleAuth(config: OAuthConfig) {
  const [user, setUser] = usePersistedState<GoogleUser | null>('quori_google_user', null);

  /** Ensure access token is fresh; refreshes silently if within 5 minutes of expiry. */
  const getFreshToken = useCallback(async (u: GoogleUser): Promise<string> => {
    const fiveMin = 5 * 60 * 1000;
    if (u.expiresAt - Date.now() > fiveMin) return u.accessToken;

    if (!u.refreshToken) throw new Error('No refresh token — please sign in again.');
    if (!isElectron) throw new Error('Not running in Electron.');

    const result = await window.ipcRenderer.invoke(
      'google-refresh',
      config.clientId,
      config.clientSecret,
      u.refreshToken,
    );
    if ('error' in result) throw new Error(result.error);

    const updated: GoogleUser = { ...u, accessToken: result.accessToken, expiresAt: result.expiresAt };
    setUser(updated);
    return updated.accessToken;
  }, [config.clientId, config.clientSecret, setUser]);

  const signIn = useCallback(async () => {
    if (!config.clientId || !config.clientSecret) {
      throw new Error('Google OAuth Client ID and Secret are required. Configure them in Settings.');
    }
    if (!isElectron) {
      throw new Error('Google Sign-in is only available in the desktop app.');
    }

    const result = await window.ipcRenderer.invoke(
      'google-auth',
      config.clientId,
      config.clientSecret,
    );
    if ('error' in result) throw new Error(result.error);
    setUser(result);
    return result;
  }, [config.clientId, config.clientSecret, setUser]);

  const signOut = useCallback(() => setUser(null), [setUser]);

  return { user, signIn, signOut, getFreshToken, isElectron };
}
