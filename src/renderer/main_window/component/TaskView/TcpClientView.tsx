import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { useAppDispatch, useAppSelector } from "../../store";
import { TasksSliceActions } from "../../store/TasksSlice";
import { useTcpClientDataSelector } from "../../store/TasksSlice/TcpClientData";
import { VirtuosoMUIComponents } from "../VirtuosoMUIComponent";
export default function TcpClientView({ id }: { id: string }) {
  const DataSelector = useTcpClientDataSelector(id);
  const address = useAppSelector(DataSelector.address);
  const dataList = useAppSelector(DataSelector.dataList);
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
      <Box flex="1" display="flex" padding={2}>
        <Typography variant="h6">Data Flow</Typography>
        <Virtuoso
          style={{ flex: "1 1 auto" }}
          data={dataList}
          itemContent={(index, data) => {
            return <p>{new TextDecoder().decode(data.data)}</p>;
          }}
          components={VirtuosoMUIComponents}
          followOutput={(isAtBottom: boolean) => {
            if (isAtBottom) {
              return "smooth";
            } else {
              return false;
            }
          }}
        />
      </Box>
    </Box>
  );
}
