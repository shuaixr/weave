import { BridgeApiType } from "./bridgeIpcApi";

declare global {
  interface Window {
    ipc: BridgeApiType;
  }
}
