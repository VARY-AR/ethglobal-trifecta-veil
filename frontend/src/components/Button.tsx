import type { ReactNode } from '@lynx-js/react'

export function Button({
	children,
	onClick,
	variant = 'primary',
	size = 'md',
	className = '',
	disabled = false,
}: {
	children: ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	className?: string
	disabled?: boolean
}) {
	// Simple class assignment
	let buttonClass = 'button '
	
	if (variant === 'secondary') {
		buttonClass += 'secondary '
	} else if (variant === 'outline') {
		buttonClass += 'outline '
	}
	
	// Add size class
	if (size === 'sm') {
		buttonClass += 'small '
	} else if (size === 'lg') {
		buttonClass += 'large '
	}
	
	// Add custom className if provided
	if (className) {
		buttonClass += className
	}
	
	return (
		<view 
			className={buttonClass}
			bindtap={disabled ? undefined : onClick}
		>
			{children}
		</view>
	)
} 