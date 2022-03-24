import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  TcpClientAction,
  useTcpClientDataSelector,
} from "../../store/TasksSlice/TcpClientData";
import { VirtuosoMUIComponents } from "../VirtuosoMUIComponent";
export default function TcpClientView({ id }: { id: string }) {
  const DataSelector = useTcpClientDataSelector(id);
  const host = useAppSelector(DataSelector.host);

  const port = useAppSelector(DataSelector.port);
  const dataList = useAppSelector(DataSelector.dataList);
  const dispatch = useAppDispatch();
  const onHostChange = useCallback(
    (host: string) => {
      dispatch(TcpClientAction.setHost(id, host));
    },
    [id]
  );
  const onPortChange = useCallback(
    (port: number) => {
      dispatch(TcpClientAction.setPort(id, port));
    },
    [id]
  );
  return (
    <Box flex="1">
      <Box display="flex" flexDirection="row" padding={2}>
        <TextField
          sx={{ flex: "1" }}
          label="Host"
          variant="outlined"
          value={host}
          onChange={(event) => onHostChange(event.target.value)}
        />
        <Typography alignSelf="center" padding={1} flex="0 1 auto">
          :
        </Typography>
        <TextField
          type="number"
          sx={{ flex: "0 1 auto", paddingRight: 2 }}
          label="Port"
          variant="outlined"
          value={port}
          onChange={(event) => onPortChange(Number(event.target.value))}
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
