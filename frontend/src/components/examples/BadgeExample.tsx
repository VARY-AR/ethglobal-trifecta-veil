import React from 'react'
import { Badge } from '../Badge.js'
import './BadgeExample.css'

export function BadgeExample() {
	return (
		<view className="BadgeExample">
			<view className="BadgeExample__section">
				<text className="BadgeExample__title">Badge States</text>
				<view className="BadgeExample__badges">
					<view className="BadgeExample__badge-item">
						<Badge status="eligible" />
						<text className="BadgeExample__label">Eligible</text>
					</view>
					<view className="BadgeExample__badge-item">
						<Badge status="claimable" />
						<text className="BadgeExample__label">Claimable</text>
					</view>
					<view className="BadgeExample__badge-item">
						<Badge status="claimed" />
						<text className="BadgeExample__label">Claimed</text>
					</view>
				</view>
			</view>

			<view className="BadgeExample__section">
				<text className="BadgeExample__title">Positioning Demonstration</text>
				<text className="BadgeExample__label">
					Using relative container with absolute badge positioning
				</text>
				
				<view className="BadgeExample__position-container">
					<view className="BadgeExample__relative-container">
						<text>Eligible Reward Container</text>
						<view className="BadgeExample__absolute-badge">
							<Badge status="eligible" />
						</view>
					</view>
					
					<view className="BadgeExample__relative-container">
						<text>Claimable Reward Container</text>
						<view className="BadgeExample__absolute-badge">
							<Badge status="claimable" />
						</view>
					</view>
					
					<view className="BadgeExample__relative-container">
						<text>Claimed Reward Container</text>
						<view className="BadgeExample__absolute-badge">
							<Badge status="claimed" />
						</view>
					</view>
				</view>
			</view>

			<view className="BadgeExample__section">
				<text className="BadgeExample__title">Reward Items with Badges</text>
				<view className="BadgeExample__rewards">
					<view className="RewardItem">
						<view className="RewardItem__image">
							<view className="RewardItem__badge-container">
								<Badge status="eligible" />
							</view>
						</view>
						<text className="RewardItem__title">Eligible Reward</text>
						<text className="RewardItem__subtitle">Meet requirements to claim</text>
					</view>

					<view className="RewardItem">
						<view className="RewardItem__image">
							<view className="RewardItem__badge-container">
								<Badge status="claimable" />
							</view>
						</view>
						<text className="RewardItem__title">Claimable Reward</text>
						<text className="RewardItem__subtitle">ZK proof submitted</text>
					</view>

					<view className="RewardItem">
						<view className="RewardItem__image">
							<view className="RewardItem__badge-container">
								<Badge status="claimed" />
							</view>
						</view>
						<text className="RewardItem__title">Claimed Reward</text>
						<text className="RewardItem__subtitle">Reward has been used</text>
					</view>
				</view>
			</view>
		</view>
	)
} 