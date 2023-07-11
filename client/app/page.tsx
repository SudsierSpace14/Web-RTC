'use clientSide'

import { JetBrains_Mono } from 'next/font/google'
import { Join } from '@components/Join'

export default function Home() {
  return (
    <main className="app min-h-screen p-6 flex justify-center items-center">
      <Join />
    </main>
  )
}
