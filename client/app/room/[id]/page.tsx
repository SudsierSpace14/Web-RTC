'use client'

import React, { useContext, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { RoomContext } from '@context/RoomContext'
import { VideoPlayer } from '@components/VideoPlayer'
import { PeerState } from '@reducers/peerReducer'

const Room = () => {
  const { id } = useParams()
  const { ws, me, stream, peers } = useContext(RoomContext)

  useEffect(() => {
    setTimeout(() => {
      console.log('entrando com usuario: ', me?.id)
      if (me) ws.emit("join-room", { roomId: id, peerId: me.id });
    }, 1000)

  }, [])

  // console.log(peers)
  return (
    <div className='flex'>
      <VideoPlayer stream={stream} />
      {Object.values(peers as PeerState).map((peer, id) => (
        <VideoPlayer stream={peer.stream} key={id} />
      ))}
    </div>
  )
}

export default Room