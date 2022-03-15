import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";

const TaskListItem = React.memo(function TaskListItemMemo({
  selected,
  name,
  onSelected,
}: {
  selected: boolean;
  name: string;

  onSelected: () => void;
}) {
  return (
    <ListItemButton selected={selected} onClick={onSelected}>
      <ListItemText primary={name} />
    </ListItemButton>
  );
});
export default TaskListItem;
