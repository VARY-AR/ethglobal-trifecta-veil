import React from 'react'
import './RewardItem.css'

interface RewardItemProps {
	title: string
	subtitle?: string
	loading?: boolean
	onPress?: () => void
}

export function RewardItem({ title, subtitle, loading = false, onPress }: RewardItemProps) {
	return (
		<view className={`RewardItem ${loading ? 'RewardItem--loading' : ''}`} bindtap={onPress}>
			<view className="RewardItem__image">
				{loading && <view className="RewardItem__loading-indicator" />}
			</view>
			<text className="RewardItem__title">{title}</text>
			{subtitle && <text className="RewardItem__subtitle">{subtitle}</text>}
		</view>
	)
} 