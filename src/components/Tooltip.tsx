import type { ReactNode } from 'react'
import { MouseOver } from './MouseOver'

type TooltipProps = {
  /** Content that triggers the tooltip on hover */
  children: ReactNode
  /** Content to display in the tooltip */
  content: ReactNode
}

/**
 * Tooltip component that displays content on hover.
 * Works for both inline and block contexts.
 */
export function Tooltip({ children, content }: TooltipProps) {
  return (
    <MouseOver
      hoverContent={
        <div className="hover-panel">
          {content}
        </div>
      }
    >
      {children}
    </MouseOver>
  )
}