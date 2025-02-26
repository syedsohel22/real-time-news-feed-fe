import { io } from "socket.io-client";

const socket = io("ws://real-time-news-feed-be.onrender.com/");

export default socket;
