import type { ReactNode } from '@lynx-js/react'
import './Button.css'

interface ButtonProps {
	children: ReactNode
	variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'link' | 'danger' | 'transparent'
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
			className={`Button Button--${variant} ${fullWidth ? 'Button--full-width' : ''} ${disabled ? 'Button--disabled' : ''} ${className}`} 
			bindtap={disabled ? undefined : bindtap}
		>
			<text className="Button__text">{children}</text>
		</view>
	)
} 