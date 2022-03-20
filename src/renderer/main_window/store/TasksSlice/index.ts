import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TaskType } from "../../../../share/TaskType";
import { getTaskDataHanderByType } from "./ITaskData";
import { TcpClientDataReducers } from "./TcpClientData";

export interface TaskDataObject {
  id: string;
  type: TaskType;
}
export interface Tasks {
  selectedIndex: number;
  taskObject: { [id: string]: TaskDataObject };
}

const TasksInitState: Tasks = {
  selectedIndex: -1,
  taskObject: {},
};

export const TasksSlice = createSlice({
  name: "Tasks",
  initialState: TasksInitState,
  reducers: {
    addTaskAction: (state, action) => {
      state.selectedIndex = 0;
      state.taskObject[action.payload.id] = getTaskDataHanderByType(
        action.payload.type
      ).initDataObject(action.payload.id);
    },
    setSelectedIndexAction: (state, action) => {
      state.selectedIndex = action.payload;
    },
    ...TcpClientDataReducers,
  },
});
export const TasksSliceActions = TasksSlice.actions;
export interface TaskListItemData {
  id: string;
  name: string;
}

export const getTaskListItemData = (task: TaskDataObject): TaskListItemData => {
  return getTaskDataHanderByType(task.type).getListItemData(task);
};

export const TasksSliceSelector = {
  selectedIndex: (state: RootState) => state.Tasks.selectedIndex,

  taskIDList: (state: RootState) => {
    return Object.keys(state.Tasks.taskObject).reverse();
  },
  selectedID: (state: RootState) => {
    return TasksSliceSelector.taskIDList(state)[
      TasksSliceSelector.selectedIndex(state)
    ];
  },
  taskDataById: (id: string) => (state: RootState) =>
    state.Tasks.taskObject[id],
  taskDataObjectList: (state: RootState) => {
    return Object.values(state.Tasks.taskObject).reverse();
  },
  selectedTaskDataObject: (state: RootState) =>
    TasksSliceSelector.taskDataObjectList(state)[
      TasksSliceSelector.selectedIndex(state)
    ],
  selectedType: (state: RootState) => {
    const selectedTaskDataObject =
      TasksSliceSelector.selectedTaskDataObject(state);
    if (selectedTaskDataObject == undefined) {
      return undefined;
    }
    return selectedTaskDataObject.type;
  },

  taskListData: (state: RootState) => {
    return TasksSliceSelector.taskDataObjectList(state).map(
      getTaskListItemData
    );
  },
};
