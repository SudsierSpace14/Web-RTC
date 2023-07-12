'use client'

import React from 'react'
import { SpeakerHigh } from '@phosphor-icons/react'

const users = [
    {
        username: 'SudsierSpace',
        img: "https://styles.redditmedia.com/t5_4282cz/styles/profileIcon_nra9b96d68l61.png?width=256&height=256&crop=256:256,smart&s=ad99402f49ed061e8feb13a55134870e4b1b87f9"
    },
    {
        username: 'Lula',
        img: "https://styles.redditmedia.com/t5_4282cz/styles/profileIcon_nra9b96d68l61.png?width=256&height=256&crop=256:256,smart&s=ad99402f49ed061e8feb13a55134870e4b1b87f9"
    },
    {
        username: 'Bolsonaro',
        img: "https://styles.redditmedia.com/t5_4282cz/styles/profileIcon_nra9b96d68l61.png?width=256&height=256&crop=256:256,smart&s=ad99402f49ed061e8feb13a55134870e4b1b87f9",
    }
]

export const Room = () => {
  return (
    <div className='container text-gray-200 mt-2'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2 pb-4'>
                <SpeakerHigh size={28} />
                <div>
                    <h2 className='text-2xl font-bold'>neymar-jr</h2>
                </div>
            </div>
            <button className='border-none'>
                [+]
            </button>
        </div>
        <div className='ml-6'>
        {users.map(user => (
            <div className='flex items-center gap-2 py-1' key={crypto.randomUUID()}>
                <img src={user.img} alt={user.username} className='w-7 rounded-full' />
                <h3>{user.username}</h3>
            </div>
        ))}
        </div>
    </div>
  )
}
