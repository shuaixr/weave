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
  address: string;
  dataList: DataListItem[];
}
export const TcpClientDataHander: ITaskDataHander<TcpClientDataObject> = {
  initDataObject: function (id: string): TcpClientDataObject {
    return { id: id, type: TaskType.TCP_CLIENT, address: "", dataList: [] };
  },
  getListItemData: function (data: TcpClientDataObject): TaskListItemData {
    return { id: data.id, name: "TCP Client " + data.address + data.id };
  },
  handleReducers: (builder) => {
    builder.addCase(TcpClientAction.setAddress, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { address: action.payload.address },
      });
    });
  },
};

export const TcpClientAction = {
  setAddress: createAction(
    "TcpClient/SetAddress",
    (id: string, address: string) => {
      return { payload: { id, address } };
    }
  ),
};
/*
export const TcpClientAction = {
  TcpClientSetAddressAction: (
    state: Draft<Tasks>,
    action: PayloadAction<{ id: string; address: string }>
  ) => {
    TasksAdapter.updateOne(state, {
      id: action.payload.id,
      changes: { address: action.payload.address },
    });
  },
};*/
export const useTcpClientDataSelector = (id: string) => {
  return useMemo(() => {
    const getCurrentTcpClientData = createSelector(
      TasksSliceSelector.taskDataById(id),
      (task) => task as TcpClientDataObject
    );
    return {
      address: (state: RootState) => getCurrentTcpClientData(state).address,
      dataList: (state: RootState) => getCurrentTcpClientData(state).dataList,
    };
  }, [id]);
};
