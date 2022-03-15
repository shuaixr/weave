import { TaskDataObject, TaskListItemData } from ".";
import { TaskType } from "../../../../share/TaskType";
import { ITaskDataHander } from "./ITaskData";
export interface TcpClientDataObject extends TaskDataObject {
  address: string;
}
export const TcpClientDataHander: ITaskDataHander<TcpClientDataObject> = {
  initDataObject: function (id: string): TcpClientDataObject {
    return { id: id, type: TaskType.TCP_CLIENT, address: "" };
  },
  getListItemData: function (data: TcpClientDataObject): TaskListItemData {
    return { id: data.id, name: "TCP Client " + data.address + data.id };
  },
};
