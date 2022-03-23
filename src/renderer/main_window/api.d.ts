export declare interface Api {
  addTask: (id: string, type: string) => Promise<unknown>;
}
declare global {
  interface Window {
    api: Api;
  }
}
