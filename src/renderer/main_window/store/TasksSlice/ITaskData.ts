import { SliceCaseReducers } from "@reduxjs/toolkit";
import { TaskDataObject, TaskListItemData, Tasks } from ".";

export interface ITaskData<
  T extends TaskDataObject,
  CR extends SliceCaseReducers<Tasks> = SliceCaseReducers<Tasks>
> {
  initDataObject(id: string): T;
  getListItemData(data: T): TaskListItemData;
  reducers: CR;
}
export function createTaskData<
  T extends TaskDataObject,
  CR extends SliceCaseReducers<Tasks> = SliceCaseReducers<Tasks>
>(taskdata: ITaskData<T, CR>): ITaskData<T, CR> {
  return taskdata;
}
