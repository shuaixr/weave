import { contextBridge, ipcRenderer } from "electron";
import { TaskListIpc, TcpClientIpc } from "../../share/ipcChannel";
TaskListIpc;
import { Api } from "./api";
export const api: Api = {
  addTask: (id, type) => ipcRenderer.invoke(TaskListIpc.ADD_TASK, id, type),
  TcpClient: {
    connect: (id, host, port) =>
      ipcRenderer.send(TcpClientIpc.CONNECT(id), host, port),
    destroy: (id) => ipcRenderer.send(TcpClientIpc.DESTORY(id)),
    onConnect: (id, cb) => ipcRenderer.on(TcpClientIpc.ON_CONNECT(id), cb),
    onClose: (id, cb) => ipcRenderer.on(TcpClientIpc.ON_CLOSE(id), cb),
    removeAllListeners: (id: string) => {
      ipcRenderer.removeAllListeners(TcpClientIpc.ON_CLOSE(id));

      ipcRenderer.removeAllListeners(TcpClientIpc.ON_CONNECT(id));
    },
  },
};
contextBridge.exposeInMainWorld("api", api);
