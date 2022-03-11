import { ListItemButton, ListItemText } from "@mui/material";
import React, { CSSProperties, useMemo, useCallback } from "react";
import { areEqual } from "react-window";
import { TaskListItemData } from "../store/TasksSlice";

const TaskListItemMemo = React.memo(function TaskListItemMemo({
  style,
  selected,
  name,
  onSelected,
}: {
  style: CSSProperties;
  selected: boolean;
  name: string;
  onSelected: () => void;
}) {
  return (
    <ListItemButton
      sx={{
        transition: "all 200ms ease-in,background 0ms,border-top 0ms",
        backgroundColor: "#ffffff",
        "& + &": {
          borderTop: "1px solid #0000001f",
        },
      }}
      style={style}
      selected={selected}
      onClick={onSelected}
    >
      <ListItemText primary={name} />
    </ListItemButton>
  );
},
areEqual);
const TaskListItem = React.memo(function TaskListItem({
  index,
  data,
  style,
}: {
  index: number;
  style: CSSProperties;
  data: {
    tasks: TaskListItemData[];
    setSelectedIndex: (index: number) => void;
    selectedIndex: number;
  };
}) {
  const { setSelectedIndex, tasks, selectedIndex } = data;
  const { Name } = useMemo(() => {
    return tasks[index];
  }, [tasks, index]);
  const selected = selectedIndex === index;
  const onSelected = useCallback(() => {
    setSelectedIndex(index);
  }, [setSelectedIndex, index]);

  return (
    <TaskListItemMemo
      style={style}
      selected={selected}
      name={Name}
      onSelected={onSelected}
    />
  );
}, areEqual);
export default TaskListItem;
