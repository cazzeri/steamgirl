import type { ReactNode } from 'react'

type MouseOverProps = {
  /** Content that should react to hover */
  children: ReactNode
  /** Content to show when hovered */
  hoverContent: ReactNode
}

export function MouseOver({ children, hoverContent }: MouseOverProps) {
  return (
    <span className="mouse-over-target">
      {children}
      <span className="mouse-over-overlay">{hoverContent}</span>
    </span>
  )
}


