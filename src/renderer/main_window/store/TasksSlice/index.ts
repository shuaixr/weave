import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface TaskDataObject {
  id: string;
  type: string;
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
      state.taskObject[action.payload.id] = {
        id: action.payload.id,
        type: action.payload.type,
      };
    },
    setSelectedIndexAction: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});
export const TasksSliceActions = TasksSlice.actions;
export interface TaskListItemData {
  id: string;
  name: string;
}

export const getTaskListItemData = (task: TaskDataObject): TaskListItemData => {
  return { id: task.id, name: task.type + task.id };
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
