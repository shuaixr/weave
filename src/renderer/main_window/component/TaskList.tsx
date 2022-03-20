import React from "react";
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { TasksSliceActions, TasksSliceSelector } from "../store/TasksSlice";
import TaskListItem from "./TaskListItem";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { VirtuosoMUIComponents } from "./VirtuosoMUIComponent";
const TaskList = React.forwardRef<VirtuosoHandle>(function TaskList(
  props,
  ref
) {
  const tasks = useAppSelector(TasksSliceSelector.taskListData);
  const selectedIndex = useAppSelector(TasksSliceSelector.selectedIndex);
  const dispatch = useAppDispatch();
  const setSelectedIndex = useCallback(
    (index: number) => {
      dispatch(TasksSliceActions.setSelectedIndexAction(index));
    },
    [dispatch]
  );

  return (
    <Virtuoso
      ref={ref}
      style={{ flex: "1 1 auto" }}
      data={tasks}
      components={VirtuosoMUIComponents}
      itemContent={(index, data) => {
        const onSelected = () => {
          setSelectedIndex(index);
        };
        return (
          <TaskListItem
            name={data.name}
            selected={selectedIndex == index}
            onSelected={onSelected}
          />
        );
      }}
    />
  );
});
export default TaskList;
