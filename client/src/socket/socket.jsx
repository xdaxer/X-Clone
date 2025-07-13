import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

export const registerSocket = (token) => {
  if (token) {
    socket.emit("GETsocketID", { token });
  }
};

export default socket;
