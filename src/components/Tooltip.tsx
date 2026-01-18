import type { ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

type TooltipProps = {
  /** Content that triggers the tooltip on hover */
  children: ReactNode
  /** Content to display in the tooltip */
  content: ReactNode | string
  /** Optional tooltip ID (auto-generated if not provided) */
  id?: string
  /** Optional tooltip placement */
  place?: 'top' | 'bottom' | 'left' | 'right'
}

let tooltipIdCounter = 0

/**
 * Tooltip component that displays content on hover.
 * Works for both inline and block contexts.
 * Tooltips are rendered in a portal to escape overflow:hidden containers.
 */
export function Tooltip({ children, content, id, place = 'right' }: TooltipProps) {
  const tooltipId = id || `tooltip-${++tooltipIdCounter}`
  
  return (
    <>
      <span data-tooltip-id={tooltipId}>
        {children}
      </span>
      <ReactTooltip 
        id={tooltipId}
        place={place}
        className="custom-tooltip"
        wrapper="span"
        positionStrategy="fixed"
      >
        {typeof content === 'string' ? content : <>{content}</>}
      </ReactTooltip>
    </>
  )
}