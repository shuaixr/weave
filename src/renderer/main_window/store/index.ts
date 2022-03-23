import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TasksListAction, TasksSlice } from "./TasksSlice";
// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: TasksListAction.addTask,
  effect: (action, api) => {
    window.api.addTask(action.payload.id, action.payload.type);
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
