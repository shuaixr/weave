import {
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";

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
    setSelectedIndexAction: (state, action) =>
      (state.selectedIndex = action.payload),
  },
});

export interface TaskListItemData {
  ID: string;
  Name: string;
}
