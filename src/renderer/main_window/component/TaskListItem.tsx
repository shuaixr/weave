import { ListItemButton, ListItemText } from "@mui/material";
import React, { useCallback } from "react";
import { useAppSelector } from "../store";
import { TasksSliceSelector } from "../store/TasksSlice";

const TaskListItem = React.memo(function TaskListItemMemo({
  id,
  index,
  selected,
  setSelectedIndex,
}: {
  id: string;
  index: number;
  selected: boolean;
  setSelectedIndex: (index: number) => void;
}) {
  const onSelected = useCallback(() => {
    setSelectedIndex(index);
  }, [index]);
  const itemData = useAppSelector(TasksSliceSelector.taskListItemData(id));
  return (
    <ListItemButton selected={selected} onClick={onSelected}>
      <ListItemText primary={itemData.name} />
    </ListItemButton>
  );
});
export default TaskListItem;
