import type { ReactNode } from '@lynx-js/react'

type ButtonProps = {
	children: ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	className?: string
	disabled?: boolean
}

export function Button({
	children,
	onClick,
	variant = 'primary',
	size = 'md',
	className = '',
	disabled = false,
}: ButtonProps) {
	const variantClass = variant === 'primary' 
		? 'bg-primary text-white' 
		: variant === 'secondary' 
		? 'bg-secondary text-white' 
		: 'bg-transparent border border-primary text-primary'
	
	const sizeClass = size === 'sm' 
		? 'text-sm py-1 px-2' 
		: size === 'lg' 
		? 'text-lg py-3 px-6' 
		: 'py-2 px-4'
	
	const baseClass = 'rounded font-medium transition-colors'
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
	
	return (
		<button 
			onClick={disabled ? undefined : onClick}
			className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
		>
			{children}
		</button>
	)
} 