import { Task } from ".";

export class TcpClientTask extends Task {
  constructor(id: string) {
    super(id);
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
}
