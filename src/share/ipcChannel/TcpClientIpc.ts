export const TcpClientIpc = {
  CONNECT: (id: string) => "TCP_CLIENT_CONNECT_" + id,

  SEND_DATA: (id: string) => "TCP_CLIENT_SEND_DATA_" + id,

  DESTORY: (id: string) => "TCP_CLIENT_DESTORY_" + id,
  ON_CLOSE: (id: string) => "TCP_CLIENT_ON_CLOSE_" + id,
};
