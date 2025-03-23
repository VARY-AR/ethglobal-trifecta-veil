import React from 'react'
import { RewardItem } from '../RewardItem.js'
import { SectionTitle } from '../SectionTitle.js'
import type { BadgeStatus } from '../Badge.js'
import './BadgeUsage.css'

// Mock data for rewards with different states
const rewards = [
	{
		id: '1',
		title: 'Premium NFT Access',
		subtitle: 'Exclusive digital art collection',
		status: 'eligible' as BadgeStatus,
		image: null
	},
	{
		id: '2',
		title: 'VIP Event Ticket',
		subtitle: 'ZK proof submitted',
		status: 'claimable' as BadgeStatus,
		image: null
	},
	{
		id: '3',
		title: 'Brand Partnership',
		subtitle: 'Used on March 22, 2023',
		status: 'claimed' as BadgeStatus,
		image: null
	}
]

export function BadgeUsage() {
	const handleRewardPress = (id: string) => {
		console.log(`Reward ${id} pressed`)
	}

	return (
		<view className="BadgeUsage">
			<SectionTitle 
				title="My Rewards" 
				subtitle="Manage your rewards" 
			/>
			
			<view className="BadgeUsage__rewards">
				{rewards.map(reward => (
					<RewardItem
						key={reward.id}
						title={reward.title}
						subtitle={reward.subtitle}
						status={reward.status}
						image={reward.image}
						onPress={() => handleRewardPress(reward.id)}
					/>
				))}
			</view>
		</view>
	)
} 