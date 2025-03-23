import type { ReactNode } from '@lynx-js/react'
import './Card.css'

export function Card({
	children,
	title,
	padding = 'md',
	className = '',
	bindtap
}: {
	children: ReactNode
	title?: string
	padding?: 'sm' | 'md' | 'lg'
	className?: string
	bindtap?: () => void
}) {
	const paddingClass = padding === 'sm' 
		? 'Card--p-sm' 
		: padding === 'lg' 
		? 'Card--p-lg' 
		: 'Card--p-md'
	
	return (
		<view className={`Card ${paddingClass} ${className}`} bindtap={bindtap}>
			{title && <text className="h3 Card__title">{title}</text>}
			{children}
		</view>
	)
} 