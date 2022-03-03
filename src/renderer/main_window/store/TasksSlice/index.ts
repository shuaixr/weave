import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "..";

export interface TaskDataObject {
  ID: string;
  Type: string;
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
      state.selectedIndex = action.payload.id;
      state.taskObject[action.payload.id] = {
        ID: action.payload.id,
        Type: action.payload.type,
      };
    },
    setSelectedIndexAction: (state, action) =>
      (state.selectedIndex = action.payload),
  },
});
export const TasksSliceActions = TasksSlice.actions;
export interface TaskListItemData {
  ID: string;
  Name: string;
}

export const selectedIndexSelector = (state: RootState) =>
  state.Tasks.selectedIndex;

export const taskDataObjectListSelector = (state: RootState) => {
  return Object.values(state.Tasks.taskObject).reverse();
};
export const getTaskListItemData = (task: TaskDataObject): TaskListItemData => {
  return { ID: task.ID, Name: task.Type + task.ID };
};

export const taskListDataSelector = (state: RootState) => {
  return taskDataObjectListSelector(state).map(getTaskListItemData);
};
