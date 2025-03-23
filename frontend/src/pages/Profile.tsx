import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { useNavigate } from 'react-router'
import { useAppState } from '$/lib/AppStateProvider.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Profile.css'
import { RewardItem } from '../components/RewardItem.js'
import { SectionTitle } from '../components/SectionTitle.js'
import type { BadgeStatus } from '../components/Badge.js'

export default () => {
	const navigate = useNavigate()
	const { bounties, getRewardStatus, isRewardClaimed, isRewardClaimable } = useAppState()
	const username = '@SIMON'

	// Derive memberships and events from bounties by filtering on category
	const membershipBounties = bounties.filter(item => 
		item.category === 'VIC Membership' && 
		(isRewardClaimed(item.id, 'bounty') || isRewardClaimable(item.id, 'bounty'))
	)
	
	const eventBounties = bounties.filter(item => 
		item.category === 'Event' && 
		(isRewardClaimed(item.id, 'bounty') || isRewardClaimable(item.id, 'bounty'))
	)

	const handleRewardPress = (id: string) => {
		navigate(`/reward/${id}`)
	}

	// Function to get the badge status for a reward
	const getRewardBadgeStatus = (id: string, type: 'bounty'): BadgeStatus => {
		return getRewardStatus(id, type)
	}

	return (
		<ScrollView>
			<Header />

			<view className="Profile">
				<view className="Profile__header">
					<view className="Profile__avatar"></view>
					<text className="Profile__username">{username}</text>
				</view>

				<view className="Profile__section">
					<SectionTitle
						title="YOUR MEMBERSHIPS"
						subtitle="Claimed & Claimable Brand Memberships"
					/>

					{membershipBounties.length > 0 ? (
						<view className="Profile__rewards-grid">{
							membershipBounties.map((item) => (
								<RewardItem
									key={item.id}
									title={item.name}
									subtitle={item.description}
									image={item.imageUri}
									status={getRewardBadgeStatus(item.id, 'bounty')}
									onPress={() => handleRewardPress(item.id)}
								/>
							))}
						</view>
					) : (
						<text className="Profile__no-rewards">No memberships available yet.</text>
					)}
				</view>

				<view className="Profile__section">
					<SectionTitle
						title="YOUR EVENTS"
						subtitle="Claimed & Claimable Event Rewards"
					/>

					{eventBounties.length > 0 ? (
						<view className="Profile__rewards-grid">
							{eventBounties.map((item) => (
								<RewardItem
									key={item.id}
									title={item.name}
									subtitle={item.description}
									image={item.imageUri}
									status={getRewardBadgeStatus(item.id, 'bounty')}
									onPress={() => handleRewardPress(item.id)}
								/>
							))}
						</view>
					) : (
						<text className="Profile__no-rewards">No events available yet.</text>
					)}
				</view>
			</view>
		</ScrollView>
	)
}
