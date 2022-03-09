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
import TaskList from "./TaskList";
import { TasksSliceActions } from "./store/TasksSlice";
import { TaskType } from "../../share/TaskType";
import { height } from "@mui/system";
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
    <Box height="100%" width="100%">
      <CssBaseline />
      <Split
        sx={{ height: "100%" }}
        minSize={140}
        sizes={[25, 75]}
        gutterSize={4}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexFlow: "column",
          }}
        >
          <Box sx={{ flex: "0 1 auto", m: "1em", display: "flex" }}>
            <Typography
              sx={{ mt: "auto", mb: "auto", mr: "auto" }}
              variant="h5"
            >
              Tasks
            </Typography>
            <IconButton onClick={onAddTaskClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              flex: "1 1 auto",
            }}
          >
            <TaskList ref={taskListRef} />
          </Box>
        </Box>
        <Container sx={{ width: "100%" }}></Container>
      </Split>
    </Box>
  );
}

export default App;
