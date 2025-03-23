import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { useNavigate } from 'react-router'
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
	
	const handleRewardPress = (id: string) => {
		navigate(`/reward-verify/${id}`)
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
						{userMemberships.map((item) => (
							<RewardItem 
								key={item.id}
								title={item.title}
								loading={item.loading}
								onPress={() => handleRewardPress(item.id)}
							/>
						))}
					</view>
				</view>
				
				<view className="Profile__section">
					<SectionTitle
						title="YOUR REWARDS"
						subtitle="Event Rewards"
					/>
					
					<view className="Profile__rewards-grid">
						{userEvents.map((item) => (
							<RewardItem 
								key={item.id}
								title={item.title}
								onPress={() => handleRewardPress(item.id)}
							/>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
