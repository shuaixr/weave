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
import TaskView from "./component/TaskView";
import { VirtuosoHandle } from "react-virtuoso";
function App() {
  const taskListRef = useRef<VirtuosoHandle>();
  const dispatch = useAppDispatch();
  const onAddTaskClick = useCallback(() => {
    dispatch(
      TasksSliceActions.addTaskAction({
        id: String(Date.now()),
        type: TaskType.TCP_CLIENT,
      })
    );
    if (taskListRef.current === undefined) return;
    taskListRef.current.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "smooth",
    });
  }, [dispatch]);
  return (
    <Box height="100%" width="100%">
      <CssBaseline />
      <Split split="vertical" minSize={140} defaultSize={280}>
        <Box flex="1 1 auto" display="flex" flexDirection="column">
          <Box margin="1em" alignItems="center" display="flex">
            <Typography flex="1 1 auto" variant="h5">
              Tasks
            </Typography>
            <IconButton onClick={onAddTaskClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Divider />
          <TaskList ref={taskListRef} />
        </Box>
        <Container fixed>
          <TaskView />
        </Container>
      </Split>
    </Box>
  );
}

export default App;
