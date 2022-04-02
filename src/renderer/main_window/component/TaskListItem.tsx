import {
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback } from "react";
import { TaskListItemData } from "../store/TasksSlice";

const TaskListItem = React.memo(function TaskListItemMemo({
  data,
  index,
  selected,
  setSelectedIndex,
  removeTask,
}: {
  data: TaskListItemData;
  index: number;
  selected: boolean;
  setSelectedIndex: (index: number) => void;
  removeTask: (index: number) => void;
}) {
  const onSelected = useCallback(() => {
    setSelectedIndex(index);
  }, [index]);

  const remove = useCallback(() => {
    removeTask(index);
  }, [index]);
  return (
    <>
      <ListItemButton selected={selected} onClick={onSelected}>
        <ListItemText primary={data.name} />
      </ListItemButton>
      <ListItemSecondaryAction>
        <IconButton onClick={remove}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
});
export default TaskListItem;
