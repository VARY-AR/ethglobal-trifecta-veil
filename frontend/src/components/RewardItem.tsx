import React from 'react'
import './RewardItem.css'
import { Badge } from './Badge.js'
import type { BadgeStatus } from './Badge.js'

interface RewardItemProps {
	title: string
	subtitle?: string
	loading?: boolean
	onPress?: () => void
	status?: BadgeStatus
	image?: string | null
}

export function RewardItem({ 
	title, 
	subtitle, 
	loading = false, 
	onPress, 
	status = 'eligible',
	image = null 
}: RewardItemProps) {
	return (
		<view className={`RewardItem ${loading ? 'RewardItem--loading' : ''}`} bindtap={onPress}>
			<view className="RewardItem__image">
				{loading && <view className="RewardItem__loading-indicator" />}
				<view className="RewardItem__badge-container">
					<Badge status={status} />
				</view>
				{image && <image className="RewardItem__img" src={image} />}
			</view>
			<text className="RewardItem__title">{title}</text>
			{subtitle && <text className="RewardItem__subtitle">{subtitle}</text>}
		</view>
	)
} 