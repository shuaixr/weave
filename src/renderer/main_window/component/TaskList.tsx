import React from "react";
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { TasksSliceActions, TasksSliceSelector } from "../store/TasksSlice";
import TaskListItem from "./TaskListItem";
import { ItemProps, ListProps, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
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
      components={MUIComponents}
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
const MUIComponents = {
  List: React.forwardRef<HTMLDivElement, ListProps>(function VList(
    // eslint-disable-next-line react/prop-types
    { style, children },
    listRef
  ) {
    return (
      <List style={style} component="div" ref={listRef}>
        {children}
      </List>
    );
  }),

  Item: ({ ...props }: ItemProps) => {
    return (
      <ListItem
        component="div"
        sx={{
          "& + &": {
            borderTop: "1px solid #0000001f",
          },
        }}
        {...props}
        style={{ padding: 0 }}
      />
    );
  },
};
export default TaskList;
