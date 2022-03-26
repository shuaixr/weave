import {
  createAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { ipcRenderer } from "electron";
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
  connectState: string;
  dataList: DataListItem[];
}
export const TcpClientConnectState = {
  Unconnected: "Unconnected",
  Establishment: "Establishment",
  Connecting: "Connecting",
} as const;
export const TcpClientDataHander: ITaskDataHander<TcpClientDataObject> = {
  initDataObject: function (id: string): TcpClientDataObject {
    return {
      id: id,
      type: TaskType.TCP_CLIENT,
      connectState: TcpClientConnectState.Unconnected,
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
    builder.addCase(TcpClientAction.setConnectState, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { connectState: action.payload.state },
      });
    });
    builder.addCase(TcpClientAction.connect.pending, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.meta.arg,
        changes: { connectState: TcpClientConnectState.Connecting },
      });
    });

    builder.addCase(TcpClientAction.connect.fulfilled, (state, action) => {
      TasksAdapter.updateOne(state, {
        id: action.meta.arg,
        changes: { connectState: TcpClientConnectState.Establishment },
      });
    });
  },
  initIpc: (id, api) => {
    window.api.TcpClient.onClose(id, () => {
      api.dispatch(
        TcpClientAction.setConnectState(id, TcpClientConnectState.Unconnected)
      );
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
  setConnectState: createAction(
    "TcpClient/SetConnectState",
    (id: string, state: string) => {
      return { payload: { id, state } };
    }
  ),
  connect: createAsyncThunk<void, string, { state: RootState }>(
    "TcpClient/Connect",
    async (id, api) => {
      try {
        const state = api.getState();
        const data = TasksSliceSelector.taskDataById(id)(
          state
        ) as TcpClientDataObject;
        return await window.api.TcpClient.connect(id, data.host, data.port);
      } catch (error) {
        console.log(error);
      }
    }
  ),
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
      connectState: (state: RootState) =>
        getCurrentTcpClientData(state).connectState,
      dataList: (state: RootState) => getCurrentTcpClientData(state).dataList,
    };
  }, [id]);
};
