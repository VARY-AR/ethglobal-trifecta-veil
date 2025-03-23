import React from 'react'
import './RewardItem.css'

interface RewardItemProps {
	title: string
	subtitle?: string
	loading?: boolean
	onPress?: () => void
}

export function RewardItem({ title, subtitle = 'VIC STATUS', loading = false, onPress }: RewardItemProps) {
	return (
		<view className={`reward-item ${loading ? 'loading' : ''}`} bindtap={onPress}>
			<view className="reward-image">
				{loading && <view className="loading-indicator" />}
			</view>
			<view className="reward-details">
				<text className="reward-title">{title}</text>
				<text className="reward-subtitle">{subtitle}</text>
			</view>
		</view>
	)
} 