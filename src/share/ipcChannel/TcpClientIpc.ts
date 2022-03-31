export const TcpClientIpc = {
  CONNECT: (id: string) => "TCP_CLIENT_CONNECT_" + id,

  SEND_DATA: (id: string) => "TCP_CLIENT_SEND_DATA_" + id,

  DESTORY: (id: string) => "TCP_CLIENT_DESTORY_" + id,
  ON_CLOSE: (id: string) => "TCP_CLIENT_ON_CLOSE_" + id,
  ON_CONNECT: (id: string) => "TCP_CLIENT_ON_CONNECT_" + id,
  ON_LOG: (id: string) => "TCP_CLIENT_ON_LOG_" + id,

  ON_DATA: (id: string) => "TCP_CLIENT_ON_DATA_" + id,
};
