import React from "react";
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { TasksListAction, TasksSliceSelector } from "../store/TasksSlice";
import TaskListItem from "./TaskListItem";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { VirtuosoMUIComponents } from "./VirtuosoMUIComponent";
const TaskList = React.forwardRef<VirtuosoHandle>(function TaskList(
  props,
  ref
) {
  const ids = useAppSelector(TasksSliceSelector.taskIDList);
  const selectedIndex = useAppSelector(TasksSliceSelector.selectedIndex);
  const dispatch = useAppDispatch();
  const setSelectedIndex = useCallback(
    (index: number) => {
      dispatch(TasksListAction.setSelectedIndex(index));
    },
    [dispatch]
  );
  return (
    <Virtuoso
      ref={ref}
      style={{ flex: "1 1 auto" }}
      data={ids}
      components={VirtuosoMUIComponents}
      itemContent={(index, id) => {
        return (
          <TaskListItem
            id={id}
            index={index}
            selected={selectedIndex == index}
            setSelectedIndex={setSelectedIndex}
          />
        );
      }}
    />
  );
});
export default TaskList;
