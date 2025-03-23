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
	const { events, memberships, isRewardClaimed } = useAppState()
	const username = '@SIMON'

	// Filter to only claimed memberships and events
	const claimedMemberships = memberships.filter(item => isRewardClaimed(item.id, 'membership'))
	const claimedEvents = events.filter(item => isRewardClaimed(item.id, 'event'))

	const handleMembershipPress = (id: number) => {
		navigate(`/reward/${id}`)
	}

	const handleEventPress = (id: number) => {
		navigate(`/reward/${id}`)
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
						subtitle="Claimed Brand Memberships"
					/>

					{claimedMemberships.length > 0 ? (
						<view className="Profile__rewards-grid">{
							claimedMemberships.map((item) => (
								<RewardItem
									key={item.id}
									title={item.title}
									subtitle={item.description}
									claimed={true}
									onPress={() => handleMembershipPress(item.id)}
								/>
							))}
						</view>
					) : (
						<text className="Profile__no-rewards">No memberships claimed yet.</text>
					)}
				</view>

				<view className="Profile__section">
					<SectionTitle
						title="YOUR EVENTS"
						subtitle="Claimed Event Rewards"
					/>

					{claimedEvents.length > 0 ? (
						<view className="Profile__rewards-grid">
							{claimedEvents.map((item) => (
								<RewardItem
									key={item.id}
									title={item.title}
									subtitle={item.date}
									claimed={true}
									onPress={() => handleEventPress(item.id)}
								/>
							))}
						</view>
					) : (
						<text className="Profile__no-rewards">No events claimed yet.</text>
					)}
				</view>
			</view>
		</ScrollView>
	)
}
