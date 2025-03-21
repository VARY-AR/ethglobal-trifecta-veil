import type { ReactNode } from 'react'
import './ScrollView.css'

interface ScrollViewProps {
	children: ReactNode
	className?: string
}

export function ScrollView({ children, className = '' }: ScrollViewProps) {
	return (
		<scroll-view
			className={`scroll-container ${className}`}
			scroll-orientation="vertical"
		>
			{children}
		</scroll-view>
	)
} 