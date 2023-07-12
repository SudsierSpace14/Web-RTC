'use client'

import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import socketIoClient, { Socket } from 'socket.io-client'

import { Peer } from 'peerjs'
import { v4 as uuidV4 } from "uuid";

import { peersReducer } from "@reducers/peerReducer";
import { addPeerAction } from "@reducers/peerActions";

import { IPeer } from "../types/peer";
import { IRoomContext } from "../types/context";

import { getUsers } from "@utils/getUsers";
import { call } from "@utils/call";

const WS = "http://localhost:8080"
const ws = socketIoClient(WS)

export const RoomContext = createContext<IRoomContext>({ ws })

interface Props {
    children: ReactNode
}
const me = new Peer(uuidV4());
export const RoomProvider: React.FC<Props> = ({ children }) => {
    const router = useRouter()

    // const [me, setMe] = useState<Peer>()
    const [counter, setCounter] = useState(0)
    const [callThem, setCall] = useState<Function>(() => { })
    const [peerId, setPeerId] = useState('')
    const [stream, setStream] = useState<MediaStream>();
    const [screenStream, setScreenStream] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peersReducer, {});

    const enterRoom = ({ roomId }: { roomId: string }) => {
        router.push(`/room/${roomId}`)
    }

    let streamHelper = new MediaStream()

    const getUsers2 = ({
        participants,
    }: {
        participants: Record<string, IPeer>[];
    }) => {
        console.log(participants)
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(stream => {
                const members = participants as any[]
                const right = members.filter(member => member.peerId !== me.id)
                right.forEach(member => {
                    console.log('ligando para:', member.peerId)
                    me.call(member.peerId, stream)
                })
                const c = me.call(peerId, stream)
                c.on('stream', (peerStream: MediaStream) => {
                    dispatch(addPeerAction(peerId, peerStream))
                })
            })

        // dispatch(addAllPeersAction(participants));
    };

    useEffect(() => {
        // const meId = uuidV4();

        const peer = new Peer()

        peer.on('open', () => {
            // setMe(peer)
        });
        // if (!me.id) me = peer
        // console.log('criei um novo peer', me.id)

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setStream(stream)
                streamHelper = stream
            })
            .catch(err => console.log(err))

        ws.on('room-created', enterRoom)
        ws.on('get-users', getUsers2)
    }, [])

    // let callThem = () => { }
    useEffect(() => {
        if (!me) {
            console.log('n tem me')
            return;
        }
        if (!stream) {
            console.log('n tem stream')
            setStream(streamHelper);
            return;
        }

        ws.on("user-joined", ({ peerId, rooms }) => {
            // console.log('emitiu', me.id)
            const c = call({
                peerId, rooms, stream, me
            })
            setCounter(1)
            setCall(() => {
                console.log('ligando para eles')
                call({
                    peerId, rooms, stream, me
                })
            })
            c.on('stream', (peerStream: MediaStream) => {
                dispatch(addPeerAction(peerId, peerStream))
            })
        })

        me.on('call', (call) => {
            call.answer(stream)

            call.on('stream', (remoteStream) => {
                dispatch(addPeerAction(call.peer, remoteStream))
            });
        })
    }, [stream])

    return (
        <RoomContext.Provider value={{ ws, me, stream, peers }}>
            {children}
        </RoomContext.Provider>
    )
}