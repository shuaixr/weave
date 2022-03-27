export declare interface Api {
  addTask: (id: string, type: string) => Promise<unknown>;
  TcpClient: {
    connect: (id: string, host: string, port: number) => void;
    destroy: (id: string) => void;
    onClose: (id: string, cb: () => void) => void;
    onConnect: (id: string, cb: () => void) => void;
    removeAllListeners: (id: string) => void;
  };
}
declare global {
  interface Window {
    api: Api;
  }
}
