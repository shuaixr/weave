import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "..";
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
    builder.addCase(TasksListAction.removeTask.fulfilled, (state, action) => {
      delete state.tasks[state.ids[action.payload.index]];
      state.ids.splice(action.payload.index, 1);

      if (state.selectedIndex == state.ids.length) state.selectedIndex--;
    });
    builder.addCase(TasksListAction.addTask.fulfilled, (state, action) => {
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
  removeTask: createAsyncThunk<
    {
      index: number;
      type: string;
    },
    number,
    { state: RootState }
  >("TaskList/RemoveTask", async (index: number, api) => {
    const id = TasksSliceSelector.taskIDList(api.getState())[index];
    const type = TasksSliceSelector.taskDataById(id)(api.getState()).type;
    window.api.removeTask(id);
    getTaskDataHanderByType(type).removeIpc(id);
    return { index, type: type };
  }),
  addTask: createAsyncThunk<
    {
      id: string;
      type: string;
    },
    string,
    { state: RootState; dispatch: AppDispatch }
  >("TaskList/AddTask", async (type: string, api) => {
    const id = String(Date.now());
    await window.api.addTask(id, type);
    getTaskDataHanderByType(type).addIpc(id, api.dispatch);
    return {
      id: id,
      type,
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
  taskDataObjectList: createSelector(
    (state: RootState): string[] => TasksSliceSelector.taskIDList(state),
    (state: RootState) => state.Tasks.tasks,
    (ids, tasks) => ids.map((id) => tasks[id])
  ),
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

  taskListData: createSelector(
    (state: RootState): TaskDataObject[] => {
      return TasksSliceSelector.taskDataObjectList(state);
    },
    (tasks) =>
      tasks.map((v) => getTaskDataHanderByType(v.type).getListItemData(v))
  ),
};
