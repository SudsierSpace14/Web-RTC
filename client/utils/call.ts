import Peer from "peerjs"

interface Props {
    peerId: string,
    rooms: any[],
    stream: MediaStream,
    me: Peer
}

export const call = ({ peerId, rooms, stream, me }: Props) => {
    const members = rooms as any[]
    const right = members.filter(member => member.peerId !== me.id)
    right.forEach(member => {
        console.log('ligando para:', member.peerId)
        me.call(member.peerId, stream)
    })
    const call = me.call(peerId, stream)
    return call
}