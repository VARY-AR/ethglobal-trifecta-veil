import type { ReactNode } from '@lynx-js/react'
import '$/shared/layout.css'

type CardProps = {
	children: ReactNode
	title?: string
	padding?: 'sm' | 'md' | 'lg'
	className?: string
}

export function Card({
	children,
	title,
	padding = 'md',
	className = '',
}: CardProps) {
	const paddingClass = padding === 'sm' 
		? 'pad-sm' 
		: padding === 'lg' 
		? 'pad-lg' 
		: 'pad-md'
	
	return (
		<view className={`card ${paddingClass} ${className}`}>
			{title && <h3 className="card-title">{title}</h3>}
			{children}
		</view>
	)
} 