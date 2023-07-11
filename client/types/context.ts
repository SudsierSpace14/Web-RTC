import Peer from "peerjs";
import { Socket } from "socket.io-client";

export interface IRoomContext {
    ws: Socket,
    me?: Peer,
    stream?: MediaStream,
    peers?: any
}