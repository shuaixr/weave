export declare interface Api {
  addTask: (id: string, type: string) => Promise<unknown>;
  TcpClient: {
    connect: (id: string, host: string, port: number) => void;
    destroy: (id: string) => void;
    sendData: (id: string, data: string) => Promise<string | undefined>; // Send data return error message
    onClose: (id: string, cb: () => void) => void;
    onData: (id: string, cb: (data: string) => void) => void;
    onConnect: (id: string, cb: () => void) => void;

    onLog: (id: string, cb: (level: string, msg: string) => void) => void;
    removeAllListeners: (id: string) => void;
  };
}
declare global {
  interface Window {
    api: Api;
  }
}
