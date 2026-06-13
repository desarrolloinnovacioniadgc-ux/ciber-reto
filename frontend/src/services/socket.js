import { io } from "socket.io-client";

export const socket = io(
  "https://ciber-reto.onrender.com"
);