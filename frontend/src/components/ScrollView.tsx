import type { ReactNode } from 'react'
import './ScrollView.css'

export function ScrollView({
	children,
	className = '',
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<scroll-view
			className={`scroll-container ${className}`}
			scroll-orientation="vertical"
		>
			{children}
		</scroll-view>
	)
}
