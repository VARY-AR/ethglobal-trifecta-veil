import type { ReactNode } from '@lynx-js/react'
import '$/shared/layout.css'

export function Card({
	children,
	title,
	padding = 'md',
	className = '',
}: {
	children: ReactNode
	title?: string
	padding?: 'sm' | 'md' | 'lg'
	className?: string
}) {
	const paddingClass = padding === 'sm' 
		? 'p-sm' 
		: padding === 'lg' 
		? 'p-lg' 
		: 'p-md'
	
	return (
		<view className={`card ${paddingClass} ${className}`}>
			{title && <text className="h3 card-title">{title}</text>}
			{children}
		</view>
	)
} 