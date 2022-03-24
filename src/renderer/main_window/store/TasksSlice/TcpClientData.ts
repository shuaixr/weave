import { createAction, createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import {
  BaseTaskDataObject,
  TaskListItemData,
  TasksAdapter,
  TasksSliceSelector,
} from ".";
import { RootState } from "..";
import { TaskType } from "../../../../share/TaskType";
import { ITaskDataHander } from "./ITaskData";
interface DataListItem {
  data: Uint8Array;
}
export interface TcpClientDataObject extends BaseTaskDataObject {
  host: string;
  port: number;
  dataList: DataListItem[];
}
export const TcpClientDataHander: ITaskDataHander<TcpClientDataObject> = {
  initDataObject: function (id: string): TcpClientDataObject {
    return {
      id: id,
      type: TaskType.TCP_CLIENT,
      host: "",
      port: 80,
      dataList: [],
    };
  },
  getListItemData: function (data: TcpClientDataObject): TaskListItemData {
    return { id: data.id, name: "TCP Client " + data.host + ":" + data.port };
  },
  handleReducers: (builder) => {
    builder.addCase(TcpClientAction.setHost, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { host: action.payload.host },
      });
    });
    builder.addCase(TcpClientAction.setPort, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { port: action.payload.port },
      });
    });
  },
};

export const TcpClientAction = {
  setHost: createAction("TcpClient/SetHost", (id: string, host: string) => {
    return { payload: { id, host } };
  }),
  setPort: createAction("TcpClient/SetPort", (id: string, port: number) => {
    return { payload: { id, port } };
  }),
};
export const useTcpClientDataSelector = (id: string) => {
  return useMemo(() => {
    const getCurrentTcpClientData = createSelector(
      TasksSliceSelector.taskDataById(id),
      (task) => task as TcpClientDataObject
    );
    return {
      host: (state: RootState) => getCurrentTcpClientData(state).host,
      port: (state: RootState) => getCurrentTcpClientData(state).port,
      dataList: (state: RootState) => getCurrentTcpClientData(state).dataList,
    };
  }, [id]);
};
