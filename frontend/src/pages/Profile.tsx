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
	
	// Fixed data to match the screenshot
	const userMemberships: Membership[] = [
		{ id: '1', title: 'VIC STATUS' },
		{ id: '2', title: 'VIC STATUS' },
		{ id: '3', title: 'VIC STATUS' },
		{ id: '4', title: 'VIC STATUS', loading: true }
	]
	
	const userEvents: Event[] = [
		{ id: '1', title: 'STORMZY GUEST LIST' },
		{ id: '2', title: 'BALENCIAGA EVENT' },
		{ id: '3', title: 'ARTSY SHOW' },
		{ id: '4', title: 'LOADING...' }
	]
	
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
						subtitle="Brand Memberships"
					/>
					
					<view className="Profile__rewards-grid">
						{memberships.map((item) => (
							<RewardItem 
								key={item.id}
								title={item.title}
								subtitle={item.description}
								claimed={isRewardClaimed(item.id, 'membership')}
								onPress={() => handleMembershipPress(item.id)}
							/>
						))}
					</view>
				</view>
				
				<view className="Profile__section">
					<SectionTitle
						title="YOUR EVENTS"
						subtitle="Event Rewards"
					/>
					
					<view className="Profile__rewards-grid">
						{events.map((item) => (
							<RewardItem 
								key={item.id}
								title={item.title}
								subtitle={item.date}
								claimed={isRewardClaimed(item.id, 'event')}
								onPress={() => handleEventPress(item.id)}
							/>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
