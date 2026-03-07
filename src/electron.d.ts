/**
 * Type declarations for the IPC bridge exposed by electron/preload.ts
 * via contextBridge.exposeInMainWorld('ipcRenderer', ...).
 */
interface IpcRenderer {
  invoke(channel: 'google-auth', clientId: string, clientSecret: string): Promise<
    | {
        email: string;
        name: string;
        picture: string;
        sub: string;
        accessToken: string;
        refreshToken: string | null;
        expiresAt: number;
        error?: undefined;
      }
    | { error: string }
  >;
  invoke(
    channel: 'google-refresh',
    clientId: string,
    clientSecret: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; expiresAt: number } | { error: string }>;
  invoke(channel: string, ...args: unknown[]): Promise<unknown>;
  on(channel: string, listener: (event: unknown, ...args: unknown[]) => void): IpcRenderer;
  off(channel: string, listener: (...args: unknown[]) => void): IpcRenderer;
  send(channel: string, ...args: unknown[]): void;
}

interface Window {
  ipcRenderer: IpcRenderer;
}
