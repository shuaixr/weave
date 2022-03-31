import { LoadingButton } from "@mui/lab";
import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  TcpClientAction,
  TcpClientConnectState,
  TcpClientDataSelector,
  TcpClientDataType,
} from "../../store/TasksSlice/TcpClientData";
import CodeEditor from "../CodeEditor";
import Split from "../Split";
import {
  VirtuosoMUIComponents,
  VirtuosoMUIComponentsNoDivider,
} from "../VirtuosoMUIComponent";
export default function TcpClientView({ id }: { id: string }) {
  const host = useAppSelector(TcpClientDataSelector.host(id));

  const port = useAppSelector(TcpClientDataSelector.port(id));
  const dataList = useAppSelector(TcpClientDataSelector.dataList(id));
  const connState = useAppSelector(TcpClientDataSelector.connectState(id));

  const log = useAppSelector(TcpClientDataSelector.log(id));
  const unsentData = useAppSelector(TcpClientDataSelector.unsentData(id));
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

  const onUnsentDataChange = useCallback(
    (data: string) => {
      dispatch(TcpClientAction.setUnsentData(id, data));
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

  const sendData = useCallback(
    (data) => {
      dispatch(TcpClientAction.sendData({ id, data: data }));
    },
    [id]
  );
  const removeData = useCallback(
    (index) => {
      dispatch(TcpClientAction.removeData(id, index));
    },
    [id]
  );
  const retryData = useCallback(
    (index) => {
      dispatch(TcpClientAction.sendData({ id, data: dataList[index].data }));

      dispatch(TcpClientAction.removeData(id, index));
    },
    [id, dataList]
  );
  return (
    <Box flex="1" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" padding={2}>
        <TextField
          sx={{ flex: "1 1 auto" }}
          size="small"
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
          size="small"
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
      <Divider />
      <Split split="vertical" minSize={50} maxSize={-50} defaultSize="80%">
        <Split split="horizontal" minSize={50} maxSize={-50} defaultSize="80%">
          <Box flex="1" display="flex" flexDirection="column">
            <Typography margin={1} variant="subtitle1">
              Data flow
            </Typography>
            <Virtuoso
              style={{ flex: "1 1 auto" }}
              data={dataList}
              itemContent={(index, data) => {
                return (
                  <Box
                    display="flex"
                    flex="1"
                    padding={1}
                    flexDirection="column"
                    overflow="hidden"
                  >
                    <Box display="flex" alignItems="center">
                      <Typography
                        noWrap={true}
                        flex="0 0 auto"
                        variant="subtitle2"
                      >
                        [{data.at}] [{data.type}]
                      </Typography>
                      {data.type == TcpClientDataType.FAILED && (
                        <Typography
                          color="error"
                          noWrap={true}
                          whiteSpace="pre"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          variant="subtitle2"
                        >
                          {" "}
                          Error: {data.errorMsg}
                        </Typography>
                      )}
                      <Box flex="1 0 0" />
                      {data.type == TcpClientDataType.FAILED && (
                        <IconButton onClick={() => retryData(index)}>
                          <ReplayIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton onClick={() => removeData(index)}>
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box
                      display="flex"
                      flex="1"
                      bgcolor={
                        data.type == TcpClientDataType.RECEIVED
                          ? "background.emphasis.A"
                          : "background.emphasis.B"
                      }
                      flexDirection="column"
                    >
                      <Typography
                        sx={{ overflowWrap: "break-word" }}
                        whiteSpace="break-spaces"
                        variant="body2"
                      >
                        {data.data}
                      </Typography>
                    </Box>
                  </Box>
                );
              }}
              components={VirtuosoMUIComponents}
              followOutput={(isAtBottom: boolean) => {
                if (isAtBottom) {
                  return "auto";
                } else {
                  return false;
                }
              }}
            />
          </Box>
          <Box flex="1" display="flex" padding={1} flexDirection="column">
            <Typography marginBottom={1} variant="subtitle1">
              Log
            </Typography>
            <Virtuoso
              style={{ flex: "1 1 auto" }}
              data={log}
              itemContent={(index, data) => {
                return (
                  <Typography variant="body2">
                    {data.at} [{data.level}]: {data.msg}
                  </Typography>
                );
              }}
              components={VirtuosoMUIComponentsNoDivider}
              followOutput={(isAtBottom: boolean) => {
                if (isAtBottom) {
                  return "auto";
                } else {
                  return false;
                }
              }}
            />
          </Box>
        </Split>
        <Box flex="1" display="flex" flexDirection="column">
          <Typography margin={1} variant="subtitle1">
            Send data
          </Typography>
          <Divider />
          <CodeEditor value={unsentData} onChange={onUnsentDataChange} />
          <Divider />
          <Button
            disabled={
              connState != TcpClientConnectState.Establishment ||
              unsentData.length == 0
            }
            sx={{ margin: 1, alignSelf: "end" }}
            variant="contained"
            onClick={() => sendData(unsentData)}
          >
            Send
          </Button>
        </Box>
      </Split>
    </Box>
  );
}
