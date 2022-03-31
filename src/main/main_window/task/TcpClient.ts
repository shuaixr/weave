import { BrowserWindow, ipcMain } from "electron";
import { Socket } from "net";
import { Task } from ".";
import { TcpClientIpc } from "../../../share/ipcChannel";
import { LogLevel } from "../../../share/LogLevel";

export class TcpClientTask extends Task {
  client: Socket;
  constructor(window: BrowserWindow, id: string) {
    super(window, id);
    this.client = new Socket();
    this.client.on("connect", () => {
      this.window.webContents.send(TcpClientIpc.ON_CONNECT(id));

      this.log(LogLevel.INFO, "Server connected.");
    });
    this.client.on("close", () => {
      this.window.webContents.send(TcpClientIpc.ON_CLOSE(id));

      this.log(LogLevel.INFO, "Server closed.");
    });
    this.client.on("error", (err) => this.log(LogLevel.ERROR, err.message));
    this.client.on("data", (data) => {
      console.log(data);
      this.window.webContents.send(TcpClientIpc.ON_DATA(id), data.toString());
    });
    ipcMain.on(TcpClientIpc.DESTORY(id), () => this.client.destroy());
    ipcMain.handle(TcpClientIpc.SEND_DATA(id), (event, data: string) => {
      return new Promise<string | undefined>((resolve) => {
        this.client.write(data, (err) => {
          if (err) {
            resolve(err.message);
          } else {
            resolve(undefined);
          }
        });
      });
    });
    ipcMain.on(
      TcpClientIpc.CONNECT(id),
      (event, host: string, port: number) => {
        this.client.connect(port, host);

        this.log(LogLevel.INFO, "Connecting to " + host + ":" + port + "...");
      }
    );
  }
  log(level: string, msg: string) {
    this.window.webContents.send(TcpClientIpc.ON_LOG(this.id), level, msg);
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
