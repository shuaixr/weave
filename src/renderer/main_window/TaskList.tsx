import React from "react";
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "./store";
import {
  selectedIndexSelector,
  taskListDataSelector,
  TaskListItemData,
  TasksSliceActions,
} from "./store/TasksSlice";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import TaskListItem from "./TaskListItem";
const TaskList = React.forwardRef<HTMLDivElement>(function TaskList(
  props,
  ref
) {
  const tasks = useAppSelector(taskListDataSelector);
  const selectedIndex = useAppSelector(selectedIndexSelector);
  const dispatch = useAppDispatch();
  const setSelectedIndex = useCallback(
    (index: number) => {
      dispatch(TasksSliceActions.setSelectedIndexAction(index));
    },
    [dispatch]
  );
  const itemKey = useCallback(
    (
      index: number,
      data: {
        tasks: TaskListItemData[];
        setSelectedIndex: (index: number) => void;
        selectedIndex: number;
      }
    ) => {
      return data.tasks[index].ID;
    },
    []
  );
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <FixedSizeList
            outerRef={ref}
            itemData={{ tasks, setSelectedIndex, selectedIndex }}
            height={height}
            width={width}
            itemCount={tasks.length}
            itemSize={46}
            itemKey={itemKey}
          >
            {TaskListItem}
          </FixedSizeList>
        );
      }}
    </AutoSizer>
  );
});

export default TaskList;
