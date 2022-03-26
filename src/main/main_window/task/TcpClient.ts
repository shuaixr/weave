import { timingSafeEqual } from "crypto";
import { BrowserWindow, ipcMain } from "electron";
import { Socket } from "net";
import { Task } from ".";
import { TcpClientIpc } from "../../../share/ipcChannel";

export class TcpClientTask extends Task {
  client: Socket;
  constructor(window: BrowserWindow, id: string) {
    super(window, id);
    this.client = new Socket();
    this.client.on("error", (e) => {
      console.log(e);
    });
    this.client.on("close", () => {
      this.window.webContents.send(TcpClientIpc.ON_CLOSE(id));
    });
    ipcMain.on(TcpClientIpc.DESTORY(id), () => {
      this.client.destroy();
    });
    ipcMain.handle(TcpClientIpc.SEND_DATA(id), (event, data: Uint8Array) => {
      return new Promise<void>((resolve) => {
        this.client.write(data, () => {
          resolve();
        });
      });
    });
    ipcMain.handle(
      TcpClientIpc.CONNECT(id),
      (event, host: string, port: number) => {
        return new Promise<void>((resolve) => {
          this.client.connect(port, host, () => {
            resolve();
          });
        });
      }
    );
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
