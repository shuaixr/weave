import {
  Box,
  CssBaseline,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Container,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useRef } from "react";
import { useAppDispatch } from "./store";
import TaskList from "./TaskList";
import { TasksSliceActions } from "./store/TasksSlice";
import { TaskType } from "../../share/TaskType";
const drawerWidth = 280;
function App() {
  const taskListRef = useRef<HTMLDivElement>();
  const dispatch = useAppDispatch();
  const onAddTaskClick = useCallback(() => {
    dispatch(
      TasksSliceActions.addTaskAction({
        id: String(Date.now()),
        type: TaskType.TCP_CLIENT,
      })
    );
    if (taskListRef.current === undefined) return;
    taskListRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ m: "1em", display: "flex" }}>
          <Typography sx={{ mt: "auto", mb: "auto", mr: "auto" }} variant="h5">
            Tasks
          </Typography>
          <IconButton onClick={onAddTaskClick}>
            <AddIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ height: "100%" }}>
          <TaskList ref={taskListRef} />
        </Box>
      </Drawer>
      <Container></Container>
    </Box>
  );
}

export default App;
