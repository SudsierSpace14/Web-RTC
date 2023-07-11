"use client"

import { RoomContext } from "@context/RoomContext"
// import { ws } from "@utils/ws";
import { useContext } from "react"

export const Join = () => {
    const { ws } = useContext(RoomContext)
    const createRoom = () => {
        ws.emit("create-room")
    }
    return (
        <div className="flex flex-col gap-4">
            <input type="text" placeholder="Put your name here" className="p-4 rounded-md" />
            <button onClick={createRoom} className="bg-green-400/50">Start meeting</button>
        </div>
    )
}