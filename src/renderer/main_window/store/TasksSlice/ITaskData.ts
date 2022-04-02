import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TaskDataObject, TaskListItemData, Tasks } from ".";
import { AppDispatch } from "..";
import { TaskType } from "../../../../share/TaskType";
import { TcpClientDataHander } from "./TcpClientData";

export interface ITaskDataHander<T extends TaskDataObject> {
  initDataObject(id: string): T;
  getListItemData(data: T): TaskListItemData;
  handleReducers(builder: ActionReducerMapBuilder<Tasks>): void;
  addIpc(id: string, api: AppDispatch): void;
  removeIpc(id: string): void;
}

export function getTaskDataHanderByType(
  type: string
): ITaskDataHander<TaskDataObject> {
  switch (type) {
    case TaskType.TCP_CLIENT:
      return TcpClientDataHander;

    default:
      throw new Error("Unmatched task type: " + type);
  }
}
