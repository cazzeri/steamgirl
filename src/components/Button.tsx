type ButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className="button-base button-primary"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  )
}


