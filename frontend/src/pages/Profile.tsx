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
		{ id: '4', title: 'LOADING', loading: true }
	]
	
	const userEvents: Event[] = [
		{ id: '1', title: 'EVENT' },
		{ id: '2', title: 'EVENT' },
		{ id: '3', title: 'EVENT' }
	]
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container profile-container">
				{/* User profile header */}
				<view className="profile-header">
					<view className="profile-avatar" />
					<text className="profile-username">{username}</text>
				</view>
				
				{/* Memberships section */}
				<view className="profile-section">
					<SectionTitle 
						title="YOUR MEMBERSHIPS"
						subtitle="ACTIVE"
					/>
					
					<view className="rewards-grid">
						{userMemberships.map((membership) => (
							<RewardItem 
								key={membership.id}
								title={membership.title}
								loading={membership.loading}
							/>
						))}
					</view>
				</view>
				
				{/* Events section */}
				<view className="profile-section">
					<SectionTitle 
						title="YOUR EVENTS"
						subtitle="UPCOMING"
					/>
					
					<view className="rewards-grid">
						{userEvents.map(event => (
							<RewardItem 
								key={event.id}
								title={event.title}
							/>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
