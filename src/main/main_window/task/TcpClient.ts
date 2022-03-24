import { Socket } from "net";
import { Task } from ".";

export class TcpClientTask extends Task {
  client: Socket;
  constructor(id: string) {
    super(id);
    this.client = new Socket();
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
