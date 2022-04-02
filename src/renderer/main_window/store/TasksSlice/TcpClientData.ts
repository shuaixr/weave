import {
  createAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { BaseTaskDataObject, TaskListItemData, TasksSliceSelector } from ".";
import { RootState } from "..";
import { TaskType } from "../../../../share/TaskType";
import { ITaskDataHander } from "./ITaskData";
import Date from "../../../../share/Date";
export const TcpClientDataType = {
  RECEIVED: "RECEIVED",
  SENT: "SENT",
  SENDING: "SENDING",
  FAILED: "FAILED",
} as const;
interface TcpClientDataItem {
  at: string;
  type: string;
  data: string;
  errorMsg?: string; // Only used if type is FAILED
}
interface LogItem {
  at: string;
  level: string;
  msg: string;
}
export interface TcpClientDataObject extends BaseTaskDataObject {
  host: string;
  port: number;
  connectState: string;
  unsentData: string;
  sendingData: { [K: string]: TcpClientDataItem };
  dataList: TcpClientDataItem[];
  log: LogItem[];
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
      host: "127.0.0.1",
      port: 80,
      unsentData: "",
      sendingData: {},
      dataList: [],
      log: [],
    };
  },
  getListItemData: function (data: TcpClientDataObject): TaskListItemData {
    return { id: data.id, name: "TCP Client " + data.host + ":" + data.port };
  },
  handleReducers: (builder) => {
    builder.addCase(TcpClientAction.setHost, (state, action) => {
      state.tasks[action.payload.id].host = action.payload.host;
    });
    builder.addCase(TcpClientAction.setPort, (state, action) => {
      state.tasks[action.payload.id].port = action.payload.port;
    });

    builder.addCase(TcpClientAction.setUnsentData, (state, action) => {
      state.tasks[action.payload.id].unsentData = action.payload.data;
    });
    builder.addCase(TcpClientAction.setConnectState, (state, action) => {
      state.tasks[action.payload.id].connectState = action.payload.state;
    });
    builder.addCase(TcpClientAction.pushLog, (state, action) => {
      state.tasks[action.payload.id].log.push({
        at: action.payload.at,
        level: action.payload.level,
        msg: action.payload.msg,
      });
    });
    builder.addCase(TcpClientAction.addReceviedData, (state, action) => {
      state.tasks[action.payload.id].dataList.push({
        at: action.payload.at,
        type: TcpClientDataType.RECEIVED,
        data: action.payload.data,
      });
    });
    builder.addCase(TcpClientAction.sendData.pending, (state, action) => {
      state.tasks[action.meta.arg.id].sendingData[action.meta.requestId] = {
        at: Date.now(),
        type: TcpClientDataType.SENDING,
        data: action.meta.arg.data,
      };
    });

    builder.addCase(TcpClientAction.sendData.fulfilled, (state, action) => {
      delete state.tasks[action.meta.arg.id].sendingData[action.meta.requestId];
      state.tasks[action.meta.arg.id].dataList.push({
        at: action.payload.at,
        type: TcpClientDataType.SENT,
        data: action.payload.data,
      });
    });

    builder.addCase(TcpClientAction.sendData.rejected, (state, action) => {
      state.tasks[action.meta.arg.id].sendingData[action.meta.requestId].type =
        TcpClientDataType.FAILED;
      state.tasks[action.meta.arg.id].sendingData[action.meta.requestId].at =
        Date.now();

      state.tasks[action.meta.arg.id].sendingData[
        action.meta.requestId
      ].errorMsg = action.error.message;
    });
    builder.addCase(TcpClientAction.removeData, (state, action) => {
      const dataListLength = state.tasks[action.payload.id].dataList.length;

      if (action.payload.index < dataListLength) {
        state.tasks[action.payload.id].dataList.splice(action.payload.index, 1);
      } else {
        const sendingDataIndex = action.payload.index - dataListLength;
        const sendingDataKeys = Object.keys(
          state.tasks[action.payload.id].sendingData
        );
        if (sendingDataIndex < sendingDataKeys.length) {
          delete state.tasks[action.payload.id].sendingData[
            sendingDataKeys[sendingDataIndex]
          ];
        }
      }
    });
  },
  addIpc: (id, dispatch) => {
    window.api.TcpClient.onClose(id, () => {
      dispatch(
        TcpClientAction.setConnectState(id, TcpClientConnectState.Unconnected)
      );
    });

    window.api.TcpClient.onConnect(id, () => {
      dispatch(
        TcpClientAction.setConnectState(id, TcpClientConnectState.Establishment)
      );
    });
    window.api.TcpClient.onData(id, (data) => {
      dispatch(TcpClientAction.addReceviedData(id, data));
    });
    window.api.TcpClient.onLog(id, (level, msg) => {
      dispatch(TcpClientAction.pushLog(id, level, msg));
    });
  },
  removeIpc: (id) => window.api.TcpClient.removeAllListeners(id),
};

export const TcpClientAction = {
  setHost: createAction("TcpClient/SetHost", (id: string, host: string) => {
    return { payload: { id, host } };
  }),
  setPort: createAction("TcpClient/SetPort", (id: string, port: number) => {
    return { payload: { id, port } };
  }),

  setUnsentData: createAction(
    "TcpClient/SetUnsentData",
    (id: string, data: string) => {
      return { payload: { id, data } };
    }
  ),
  setConnectState: createAction(
    "TcpClient/SetConnectState",
    (id: string, state: string) => {
      return { payload: { id, state } };
    }
  ),

  pushLog: createAction(
    "TcpClient/PushLog",
    (id: string, level: string, msg: string) => {
      return {
        payload: {
          id,
          at: Date.now(),
          level,
          msg,
        },
      };
    }
  ),
  addReceviedData: createAction(
    "TcpClient/AddReceviedData",
    (id: string, data: string) => {
      return { payload: { id, at: Date.now(), data } };
    }
  ),
  sendData: createAsyncThunk(
    "TcpClient/SendData",
    async ({ id, data }: { id: string; data?: string }) => {
      const errormsg = await window.api.TcpClient.sendData(id, data);
      if (errormsg) {
        throw new Error(errormsg);
      }

      return { id, at: Date.now(), data };
    },
    { idGenerator: () => nanoid() }
  ),

  removeData: createAction(
    "TcpClient/RemoveData",
    (id: string, index: number) => {
      return { payload: { id, index } };
    }
  ),
};
export const TcpClientDataSelector = {
  TcpClientData: (id: string) =>
    createSelector(
      TasksSliceSelector.taskDataById(id),
      (task) => task as TcpClientDataObject
    ),
  host: (id: string) =>
    createSelector(
      TcpClientDataSelector.TcpClientData(id),
      (task) => task.host
    ),
  port: (id: string) =>
    createSelector(
      TcpClientDataSelector.TcpClientData(id),
      (task) => task.port
    ),
  connectState: (id: string) =>
    createSelector(
      TcpClientDataSelector.TcpClientData(id),
      (task) => task.connectState
    ),
  unsentData: (id: string) =>
    createSelector(
      TcpClientDataSelector.TcpClientData(id),
      (task) => task.unsentData
    ),
  log: (id: string) =>
    createSelector(TcpClientDataSelector.TcpClientData(id), (task) => task.log),
  dataList: (id: string) =>
    createSelector(
      (state: RootState) =>
        TcpClientDataSelector.TcpClientData(id)(state).dataList,
      (state: RootState) =>
        Object.values(
          TcpClientDataSelector.TcpClientData(id)(state).sendingData
        ),
      (dl, sd) => [...dl, ...sd]
    ),
};
