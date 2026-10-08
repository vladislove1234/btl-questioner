import type { ReactNode } from 'react'
import { asset } from '../lib/asset'

/** Page frame for every screen after the Intro: small logo top-left, content centered below. */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col px-[clamp(20px,5vw,70px)] pt-8 pb-10">
      <img src={asset('images/logo.svg')} alt="Будинки та люди" className="h-14 w-auto self-start" />
      <div className="flex flex-1 flex-col justify-center py-8">{children}</div>
    </div>
  )
}

/** Two columns in landscape, stacked in portrait (SPEC §1). */
export function Split({ children }: { children: ReactNode }) {
  return (
    <div className="grid items-center gap-[clamp(32px,5vw,80px)] landscape:grid-cols-2">{children}</div>
  )
}
