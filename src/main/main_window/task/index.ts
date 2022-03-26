import { BrowserWindow } from "electron";

export abstract class Task {
  window: BrowserWindow;
  id: string;
  constructor(window: BrowserWindow, id: string) {
    this.window = window;
    this.id = id;
  }
  abstract remove(): void;
}
