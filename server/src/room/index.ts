import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, IUser[]> = {};
const chats: Record<string, IMessage[]> = {};
interface IUser {
    peerId: string;
    userName: string;
}
interface IRoomParams {
    roomId: string;
    peerId: string;
}

interface IJoinRoomParams extends IRoomParams {
    userName: string;
}
interface IMessage {
    content: string;
    author?: string;
    timestamp: number;
}

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidV4();
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
        console.log("user created the room");
    };

    const joinRoom = ({ roomId, peerId }: IRoomParams) => {
        if (!rooms[roomId]) rooms[roomId] = [];

        console.log("user joined the room", peerId)

        rooms[roomId].push({ peerId, userName: '' })
        socket.join(roomId)

        socket.to(roomId).emit("user-joined", { peerId, rooms: rooms[roomId] })

        socket.emit("get-users", {
            roomId,
            participants: rooms[roomId]
        })

        // console.log(rooms[roomId])
        socket.on("disconnect", () => {
            console.log(peerId, "left the room");
            leaveRoom({ roomId, peerId });
        });
    }

    const leaveRoom = ({ peerId, roomId }: IRoomParams) => {
        console.log('removing users: ', peerId)
        rooms[roomId] = rooms[roomId]?.filter((user) => user.peerId !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };

    socket.on('create-room', createRoom)
    socket.on('join-room', joinRoom)
}