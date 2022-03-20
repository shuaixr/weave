import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { TaskType } from "../../../../share/TaskType";
import { getTaskDataHanderByType } from "./ITaskData";
import { TcpClientDataObject, TcpClientDataReducers } from "./TcpClientData";

export interface BaseTaskDataObject {
  id: string;
  type: TaskType;
}
export type TaskDataObject = TcpClientDataObject;

export const TasksAdapter = createEntityAdapter<TaskDataObject>({
  selectId: (task) => task.id,
  sortComparer: (taska, taskb) => taska.id.localeCompare(taskb.id),
});

const TasksInitState = TasksAdapter.getInitialState({ selectedIndex: -1 });
export type Tasks = typeof TasksInitState;
export const TasksSlice = createSlice({
  name: "Tasks",
  initialState: TasksInitState,
  reducers: {
    addTaskAction: (state, action) => {
      state.selectedIndex = 0;
      TasksAdapter.addOne(
        state,
        getTaskDataHanderByType(action.payload.type).initDataObject(
          action.payload.id
        )
      );
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

const TasksAdapterSelectors = TasksAdapter.getSelectors();
export const TasksSliceSelector = {
  selectedIndex: (state: RootState) => state.Tasks.selectedIndex,

  taskIDList: (state: RootState) => {
    return TasksAdapterSelectors.selectIds(state.Tasks);
  },
  selectedID: (state: RootState) => {
    return TasksSliceSelector.taskIDList(state)[
      TasksSliceSelector.selectedIndex(state)
    ];
  },
  taskDataById: (id: string) => (state: RootState) =>
    TasksAdapterSelectors.selectById(state.Tasks, id),
  taskDataObjectList: (state: RootState) =>
    TasksAdapterSelectors.selectAll(state.Tasks),
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
