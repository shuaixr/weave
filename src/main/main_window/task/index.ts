import { BrowserWindow, ipcMain } from "electron";

export abstract class Task {
  window: BrowserWindow;
  id: string;
  handleChannelList: string[] = [];
  onChannelList: string[] = [];
  constructor(window: BrowserWindow, id: string) {
    this.window = window;
    this.id = id;
  }
  handle(
    channel: string,
    listener: (
      event: Electron.IpcMainInvokeEvent,
      ...args: unknown[]
    ) => unknown
  ) {
    this.handleChannelList.push(channel);
    ipcMain.handle(channel, listener);
  }
  on(
    channel: string,
    listener: (event: Electron.IpcMainEvent, ...args: unknown[]) => unknown
  ) {
    this.onChannelList.push(channel);
    ipcMain.on(channel, listener);
  }
  removeAllIpc() {
    this.onChannelList.forEach((c) => ipcMain.removeAllListeners(c));

    this.handleChannelList.forEach((c) => ipcMain.removeHandler(c));
  }
  abstract remove(): void;
}
