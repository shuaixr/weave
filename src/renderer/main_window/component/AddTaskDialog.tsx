import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { TaskType } from "../../../share/TaskType";
import CloseIcon from "@mui/icons-material/Close";
const TaskNames: { [N: string]: string } = {
  "Tcp client": TaskType.TCP_CLIENT,
};
export default function AddTaskDialog({
  open,
  onClose,
  onAddTask,
}: {
  open: boolean;
  onClose: () => void;
  onAddTask: (type: string) => void;
}) {
  const addTask = (type: string) => {
    onAddTask(type);
    onClose();
  };
  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={onClose}>
      <AppBar position="static">
        <Toolbar>
          <Typography flexGrow={1} variant="h6">
            Please select a protocols
          </Typography>
          <IconButton color="inherit">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(TaskNames).map((n) => {
            return (
              <Grid key={n} item xs={3}>
                <Button
                  variant="contained"
                  onClick={() => addTask(TaskNames[n])}
                >
                  {n}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
