import React from 'react'
import './RewardItem.css'

interface RewardItemProps {
	title: string
	subtitle?: string
	loading?: boolean
	onPress?: () => void
	claimed?: boolean
	image?: string | null
}

export function RewardItem({ 
	title, 
	subtitle, 
	loading = false, 
	onPress, 
	claimed = false,
	image = null 
}: RewardItemProps) {
	return (
		<view className={`RewardItem ${loading ? 'RewardItem--loading' : ''} ${claimed ? 'RewardItem--claimed' : ''}`} bindtap={onPress}>
			<view className="RewardItem__image">
				{loading && <view className="RewardItem__loading-indicator" />}
				{claimed && <view className="RewardItem__claimed-badge"><text>CLAIMED</text></view>}
				{image && <image className="RewardItem__img" src={image} />}
			</view>
			<text className="RewardItem__title">{title}</text>
			{subtitle && <text className="RewardItem__subtitle">{subtitle}</text>}
		</view>
	)
} 