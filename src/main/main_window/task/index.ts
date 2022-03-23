export abstract class Task {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  abstract remove(): void;
}
