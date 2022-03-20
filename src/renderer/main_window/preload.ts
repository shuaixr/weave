import { contextBridge } from "electron";
import { BridgeIpcApi } from "./bridgeIpcApi";

contextBridge.exposeInMainWorld("Ipc", BridgeIpcApi);
