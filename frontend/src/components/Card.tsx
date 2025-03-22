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
		? 'p-sm' 
		: padding === 'lg' 
		? 'p-lg' 
		: 'p-md'
	
	return (
		<view className={`card ${paddingClass} ${className}`} bindtap={bindtap}>
			{title && <text className="h3 card-title">{title}</text>}
			{children}
		</view>
	)
} 