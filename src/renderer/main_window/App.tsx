import { Box, CssBaseline, Typography, IconButton, Paper } from "@mui/material";
import Split from "./component/Split";
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch } from "./store";
import TaskList from "./component/TaskList";
import TaskView from "./component/TaskView";
import { VirtuosoHandle } from "react-virtuoso";
import { TasksListAction } from "./store/TasksSlice";
import AddTaskDialog from "./component/AddTaskDialog";
function App() {
  const taskListRef = useRef<VirtuosoHandle>();
  const dispatch = useAppDispatch();
  const handleAddTask = useCallback(
    (type: string) => {
      dispatch(TasksListAction.addTask(type));
      if (taskListRef.current === undefined) return;
      taskListRef.current.scrollToIndex({
        index: 0,
        align: "start",
        behavior: "smooth",
      });
    },
    [dispatch]
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <Box height="100%" width="100%" display="flex">
      <CssBaseline />
      <Split split="vertical" minSize={140} defaultSize={280}>
        <Box flex="1 1 auto" display="flex" flexDirection="column">
          <Paper square={true}>
            <Box margin="1em" alignItems="center" display="flex">
              <Typography flex="1 1 auto" variant="h5">
                Tasks
              </Typography>
              <IconButton onClick={openDialog}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
          <TaskList ref={taskListRef} />
        </Box>
        <TaskView />
      </Split>
      <AddTaskDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onAddTask={handleAddTask}
      />
    </Box>
  );
}

export default App;
