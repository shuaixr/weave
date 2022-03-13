import { TaskDataObject, TaskListItemData } from ".";
import { TaskType } from "../../../../share/TaskType";
import { TcpClientDataHander } from "./TcpClientData";

export interface ITaskDataHander<T extends TaskDataObject> {
  initDataObject(id: string): T;
  getListItemData(data: T): TaskListItemData;
}

export function getTaskDataHanderByType(
  type: TaskType
): ITaskDataHander<TaskDataObject> {
  switch (type) {
    case TaskType.TCP_CLIENT:
      return TcpClientDataHander;

    default:
      throw new Error("Unmatched task type: " + type);
  }
}
