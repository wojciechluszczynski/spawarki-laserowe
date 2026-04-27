import Link from 'next/link'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary: {
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    hoverBg: 'var(--accent-hover)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--fg)',
    border: '1.5px solid var(--border-strong)',
    hoverBg: 'var(--bg-card)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--muted)',
    border: 'none',
    hoverBg: 'transparent',
  },
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const v = variants[variant]
  const baseClass = `inline-flex items-center gap-2 font-medium rounded-[var(--radius-sm)] transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${className}`

  const style = {
    background: v.background,
    color: v.color,
    border: v.border,
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} hover:opacity-90`}
        style={style}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} hover:opacity-90`}
      style={style}
    >
      {children}
    </button>
  )
}
