import type { ReactNode } from '@lynx-js/react'
import './SectionTitle.css'

interface SectionTitleProps {
	title: ReactNode
	subtitle?: ReactNode
	centered?: boolean
	className?: string
}

export function SectionTitle({
	title,
	subtitle,
	centered = true,
	className = ''
}: SectionTitleProps) {
	return (
		<view className={`section-title-container ${centered ? 'centered' : ''} ${className}`}>
			<view className="section-title-divider" />
			<text className="section-title-text">{title}</text>
			<view className="section-title-divider" />
			{subtitle && (
				<text className="section-subtitle-text">{subtitle}</text>
			)}
		</view>
	)
} 