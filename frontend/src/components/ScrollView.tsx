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
			className={`ScrollView ${className}`}
			style={style}
			scroll-orientation="vertical"
		>
			<view className="ScrollView__content">
				{children}
			</view>
		</scroll-view>
	)
}
