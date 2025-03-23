import type { ReactNode } from 'react'
import './ScrollView.css'
import type { CSSProperties } from '@lynx-js/types'

export function ScrollView({
	children,
	className = '',
	style,
}: {
	children: ReactNode
	className?: string
	style?: CSSProperties
}) {
	return (
		<scroll-view
			className={`scroll-container ${className}`}
			style={style}
			scroll-orientation="vertical"
		>
			{children}
		</scroll-view>
	)
}
