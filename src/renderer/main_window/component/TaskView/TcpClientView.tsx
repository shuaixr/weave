import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  TcpClientAction,
  TcpClientConnectState,
  useTcpClientDataSelector,
} from "../../store/TasksSlice/TcpClientData";
import { VirtuosoMUIComponents } from "../VirtuosoMUIComponent";
export default function TcpClientView({ id }: { id: string }) {
  const DataSelector = useTcpClientDataSelector(id);
  const host = useAppSelector(DataSelector.host);

  const port = useAppSelector(DataSelector.port);
  const dataList = useAppSelector(DataSelector.dataList);
  const connState = useAppSelector(DataSelector.connectState);
  const isNotUnconnect = connState != TcpClientConnectState.Unconnected;
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

  const connect = useCallback(() => {
    window.api.TcpClient.connect(id, host, port);
    dispatch(
      TcpClientAction.setConnectState(id, TcpClientConnectState.Connecting)
    );
  }, [id, host, port]);

  const distory = useCallback(() => {
    window.api.TcpClient.destroy(id);
  }, [id]);
  return (
    <Box flex="1">
      <Box display="flex" flexDirection="row" padding={2}>
        <TextField
          sx={{ flex: "1" }}
          label="Host"
          variant="outlined"
          value={host}
          disabled={isNotUnconnect}
          onChange={(event) => onHostChange(event.target.value)}
        />
        <Typography alignSelf="center" padding={1}>
          :
        </Typography>
        <TextField
          type="number"
          sx={{ paddingRight: 2 }}
          label="Port"
          variant="outlined"
          value={port}
          disabled={isNotUnconnect}
          onChange={(event) => onPortChange(Number(event.target.value))}
        />
        <LoadingButton
          variant="contained"
          color={
            connState != TcpClientConnectState.Establishment
              ? "primary"
              : "error"
          }
          loading={connState == TcpClientConnectState.Connecting}
          onClick={
            connState != TcpClientConnectState.Establishment ? connect : distory
          }
        >
          {connState != TcpClientConnectState.Establishment
            ? "Connect"
            : "Distroy"}
        </LoadingButton>
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
