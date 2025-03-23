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

// Define types for our data
interface Membership {
	id: string
	title: string
	loading?: boolean
}

interface Event {
	id: string
	title: string
}

export default () => {
	const navigate = useNavigate()
	const { events, memberships, getRewardStatus, isRewardClaimed, isRewardClaimable } = useAppState()
	const username = '@SIMON'

	// Filter to get claimed and claimable memberships and events
	const claimedMemberships = memberships.filter(item => 
		isRewardClaimed(item.id, 'membership') || isRewardClaimable(item.id, 'membership')
	)
	const claimedEvents = events.filter(item => 
		isRewardClaimed(item.id, 'event') || isRewardClaimable(item.id, 'event')
	)

	const handleMembershipPress = (id: number) => {
		navigate(`/reward/${id}`)
	}

	const handleEventPress = (id: number) => {
		navigate(`/reward/${id}`)
	}

	// Function to get the badge status for a reward
	const getRewardBadgeStatus = (id: number, type: 'event' | 'membership'): BadgeStatus => {
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

					{claimedMemberships.length > 0 ? (
						<view className="Profile__rewards-grid">{
							claimedMemberships.map((item) => (
								<RewardItem
									key={item.id}
									title={item.title}
									subtitle={item.description}
									status={getRewardBadgeStatus(item.id, 'membership')}
									onPress={() => handleMembershipPress(item.id)}
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

					{claimedEvents.length > 0 ? (
						<view className="Profile__rewards-grid">
							{claimedEvents.map((item) => (
								<RewardItem
									key={item.id}
									title={item.title}
									subtitle={item.date}
									status={getRewardBadgeStatus(item.id, 'event')}
									onPress={() => handleEventPress(item.id)}
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
