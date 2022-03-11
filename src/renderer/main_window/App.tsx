import {
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import Split from "./component/Split";
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useRef } from "react";
import { useAppDispatch } from "./store";
import TaskList from "./component/TaskList";
import { TasksSliceActions } from "./store/TasksSlice";
import { TaskType } from "../../share/TaskType";
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
    <Box height="100%" width="100%">
      <CssBaseline />
      <Split split="vertical" minSize={140}>
        <Box display="flex" flexDirection="column">
          <Box margin="1em" alignItems="center" display="flex">
            <Typography flex="1 1 auto" variant="h5">
              Tasks
            </Typography>
            <IconButton onClick={onAddTaskClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box flex="1 1 auto">
            <TaskList ref={taskListRef} />
          </Box>
        </Box>
        <Container fixed></Container>
      </Split>
    </Box>
  );
}

export default App;
