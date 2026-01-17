import { type ReactNode } from 'react'

interface CenteredContentProps {
  children: ReactNode
}

export function CenteredContent({ children }: CenteredContentProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      {children}
    </div>
  )
}
