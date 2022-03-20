import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TaskDataObject, TaskListItemData, Tasks, TasksSliceSelector } from ".";
import { RootState } from "..";
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
export const TcpClientDataReducers = {
  TcpClientSetAddressAction: (
    state: Draft<Tasks>,
    action: PayloadAction<{ id: string; address: string }>
  ) => {
    (state.taskObject[action.payload.id] as TcpClientDataObject).address =
      action.payload.address;
  },
};
export const useTcpClientDataSelector = (id: string) => {
  return useMemo(() => {
    const getCurrentTcpClientData = (state: RootState) =>
      TasksSliceSelector.taskDataById(id)(state) as TcpClientDataObject;
    return {
      address: (state: RootState) => getCurrentTcpClientData(state).address,
    };
  }, [id]);
};
