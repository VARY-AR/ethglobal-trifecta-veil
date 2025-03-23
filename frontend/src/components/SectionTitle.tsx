import type { ReactNode } from '@lynx-js/react'
import './SectionTitle.css'

interface SectionTitleProps {
	title: ReactNode
	subtitle?: ReactNode
	className?: string
}

export function SectionTitle({
	title,
	subtitle,
	className = ''
}: SectionTitleProps) {
	return (
		<view className={`section-header ${className}`}>
			<text className="section-title">{title}</text>
			{subtitle && (
				<view className="section-subtitle-container row">
					<view className="section-subtitle-flair"></view>
					<text className="section-subtitle">{subtitle}</text>
					<view className="section-subtitle-flair"></view>
				</view>
			)}
		</view>
	)
} 