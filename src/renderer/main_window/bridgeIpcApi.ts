import { ipcRenderer } from "electron";
import IpcRendererChannel from "../../share/IpcRendererChannel";
import { TaskType } from "../../share/TaskType";

export const BridgeIpcApi = {
  addTask: (id: string, type: TaskType) =>
    ipcRenderer.invoke(IpcRendererChannel.ADD_TASK, id, type),
};
export type BridgeIpcApiType = typeof BridgeIpcApi;
