import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { TasksSliceActions } from "../../store/TasksSlice";
import { useTcpClientDataSelector } from "../../store/TasksSlice/TcpClientData";
export default function TcpClientView({ id }: { id: string }) {
  const DataSelector = useTcpClientDataSelector(id);
  const address = useAppSelector(DataSelector.address);
  const dispatch = useAppDispatch();
  const onAddressChange = useCallback(
    (address: string) => {
      dispatch(
        TasksSliceActions.TcpClientSetAddressAction({
          id: id,
          address: address,
        })
      );
    },
    [id]
  );
  return (
    <Box flex="1">
      <Box display="flex" flexDirection="row" padding={2}>
        <TextField
          sx={{ flex: "1", paddingRight: 2 }}
          label="Address"
          variant="outlined"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
        />
        <Button variant="outlined">Connect</Button>
      </Box>
      <Box flex="1" padding={2}>
        <Typography variant="h6">Data Flow</Typography>
      </Box>
    </Box>
  );
}
