import {
  createAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "..";
import { TaskTypeList } from "../../../../share/TaskType";
import { getTaskDataHanderByType } from "./ITaskData";
import { TcpClientAction, TcpClientDataObject } from "./TcpClientData";

export interface BaseTaskDataObject {
  id: string;
  type: string;
}
export type TaskDataObject = TcpClientDataObject;

export const TasksAdapter = createEntityAdapter<TaskDataObject>({
  selectId: (task) => task.id,
  sortComparer: (taska, taskb) => taskb.id.localeCompare(taska.id),
});

const TasksInitState = TasksAdapter.getInitialState({ selectedIndex: -1 });
export type Tasks = typeof TasksInitState;
export const TasksSlice = createSlice({
  name: "Tasks",
  initialState: TasksInitState,
  reducers: {},
  extraReducers: (builder) => {
    //Handle TaskListAction
    builder.addCase(TasksListAction.addTask, (state, action) => {
      state.selectedIndex = 0;
      TasksAdapter.addOne(
        state,
        getTaskDataHanderByType(action.payload.type).initDataObject(
          action.payload.id
        )
      );
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

const TasksAdapterSelectors = TasksAdapter.getSelectors();
export const TasksSliceSelector = {
  selectedIndex: (state: RootState) => state.Tasks.selectedIndex,

  taskIDList: (state: RootState) => {
    return TasksAdapterSelectors.selectIds(state.Tasks);
  },
  selectedID: (state: RootState) => {
    return TasksSliceSelector.taskIDList(state)[
      TasksSliceSelector.selectedIndex(state)
    ] as string;
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
