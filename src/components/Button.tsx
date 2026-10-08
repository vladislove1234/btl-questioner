import type { ButtonHTMLAttributes } from 'react'

/** DESIGN.md primary dark pill. The brand has no outline or ghost buttons. */
export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`h-[70px] rounded-[40px] bg-ink px-12 text-xl font-bold text-bg transition active:scale-[0.98] disabled:opacity-30 ${className}`}
      {...props}
    />
  )
}
