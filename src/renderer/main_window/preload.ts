import { contextBridge, ipcRenderer } from "electron";
import { TaskListIpc, TcpClientIpc } from "../../share/ipcChannel";
TaskListIpc;
import { Api } from "./api";
export const api: Api = {
  addTask: (id: string, type: string) =>
    ipcRenderer.invoke(TaskListIpc.ADD_TASK, id, type),
  TcpClient: {
    connect: (id: string, host: string, port: number) =>
      ipcRenderer.invoke(TcpClientIpc.CONNECT(id), host, port),
    destroy: (id: string) => ipcRenderer.send(TcpClientIpc.DESTORY(id)),
    onClose: (id, cb) => ipcRenderer.on(TcpClientIpc.ON_CLOSE(id), cb),
    removeAllListeners: (id: string) => {
      ipcRenderer.removeAllListeners(TcpClientIpc.ON_CLOSE(id));
    },
  },
};
contextBridge.exposeInMainWorld("api", api);
