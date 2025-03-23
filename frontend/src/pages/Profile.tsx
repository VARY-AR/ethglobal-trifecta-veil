import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { useNavigate } from 'react-router'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Profile.css'
import { memberships, events } from '../data/mockData.js'
import { RewardItem } from '../components/RewardItem.js'
import { SectionTitle } from '../components/SectionTitle.js'

export default () => {
	const navigate = useNavigate()
	const username = '@SIMON'
	
	// Filter to only show claimed memberships and events
	const userMemberships = memberships.filter(m => m.claimed)
	const userEvents = events.filter(e => e.claimed)
	
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
						{userMemberships.slice(0, 2).map(membership => (
							<RewardItem 
								key={membership.id}
								title={membership.title}
							/>
						))}
						
						{/* Loading state example for the third item */}
						<RewardItem 
							title="LOADING"
							loading={true}
						/>
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
								title="EVENT"
								subtitle={event.title}
							/>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
} 