import { contextBridge, ipcRenderer } from "electron";
import IpcRendererChannel from "../../share/IpcRendererChannel";
import { Api } from "./api";
export const api: Api = {
  addTask: (id: string, type: string) =>
    ipcRenderer.invoke(IpcRendererChannel.ADD_TASK, id, type),
};
contextBridge.exposeInMainWorld("api", api);
