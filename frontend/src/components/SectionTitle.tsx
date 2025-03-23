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
		<view className={`SectionTitle ${className}`}>
			<text className="SectionTitle__title">{title}</text>
			{subtitle && (
				<view className="SectionTitle__subtitle-container SectionTitle--row">
					<view className="SectionTitle__subtitle-flair"></view>
					<text className="SectionTitle__subtitle">{subtitle}</text>
					<view className="SectionTitle__subtitle-flair"></view>
				</view>
			)}
		</view>
	)
} 