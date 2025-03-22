import type { ReactNode } from '@lynx-js/react'
import './styles.css'

interface ButtonProps {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'link' | 'danger'
	fullWidth?: boolean
	disabled?: boolean
	className?: string
	bindtap?: () => void
}

export function Button({
	children,
	variant = 'primary',
	fullWidth = false,
	disabled = false,
	className = '',
	bindtap
}: ButtonProps) {
	return (
		<view 
			className={`button ${variant} ${fullWidth ? 'full-width' : ''} ${disabled ? 'disabled' : ''} ${className}`} 
			bindtap={disabled ? undefined : bindtap}
		>
			<text className="button-text">{children}</text>
		</view>
	)
} 