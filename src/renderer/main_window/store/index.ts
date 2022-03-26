import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { listenerMiddleware, startAppListening } from "./listenerMiddleware";
import { TasksListAction, TasksSlice } from "./TasksSlice";
import { getTaskDataHanderByType } from "./TasksSlice/ITaskData";
startAppListening({
  actionCreator: TasksListAction.addTask,
  effect: (action, api) => {
    window.api.addTask(action.payload.id, action.payload.type);
    getTaskDataHanderByType(action.payload.type).initIpc(
      action.payload.id,
      api
    );
  },
});
export const store = configureStore({
  reducer: { Tasks: TasksSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
