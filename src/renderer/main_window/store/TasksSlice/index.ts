import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { TaskTypeList } from "../../../../share/TaskType";
import { getTaskDataHanderByType } from "./ITaskData";
import { TcpClientDataObject } from "./TcpClientData";

export interface BaseTaskDataObject {
  id: string;
  type: string;
}
export type TaskDataObject = TcpClientDataObject;

export type Tasks = {
  selectedIndex: number;
  ids: string[];
  tasks: { [ID: string]: TaskDataObject };
};
const TasksInitState: Tasks = { selectedIndex: -1, ids: [], tasks: {} };

export const TasksSlice = createSlice({
  name: "Tasks",
  initialState: TasksInitState,
  reducers: {},
  extraReducers: (builder) => {
    //Handle TaskListAction
    builder.addCase(TasksListAction.addTask, (state, action) => {
      state.selectedIndex = 0;
      state.ids.unshift(action.payload.id);
      state.tasks[action.payload.id] = getTaskDataHanderByType(
        action.payload.type
      ).initDataObject(action.payload.id);
    });
    builder.addCase(TasksListAction.setSelectedIndex, (state, action) => {
      state.selectedIndex = action.payload;
    });
    //Handle other task reducers
    TaskTypeList.map(getTaskDataHanderByType).forEach((taskHander) =>
      taskHander.handleReducers(builder)
    );
  },
});
export const TasksListAction = {
  addTask: createAction("TaskList/AddTask", function preare(type: string) {
    return {
      payload: {
        id: String(Date.now()),
        type,
      },
    };
  }),
  setSelectedIndex: createAction<number>("TaskList/SetSelectedIndex"),
};
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
    return state.Tasks.ids;
  },
  selectedID: (state: RootState) => {
    return TasksSliceSelector.taskIDList(state)[
      TasksSliceSelector.selectedIndex(state)
    ];
  },
  taskDataById: (id: string) => (state: RootState) => state.Tasks.tasks[id],
  taskDataObjectList: (state: RootState) => Object.values(state.Tasks.tasks),
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

  taskListItemData: (id: string) =>
    createSelector(
      (state: RootState) => TasksSliceSelector.taskDataById(id)(state),
      (task) => getTaskDataHanderByType(task.type).getListItemData(task)
    ),
};
