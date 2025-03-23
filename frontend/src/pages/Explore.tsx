import { useNavigate } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { useAppState } from '$/lib/AppStateProvider.js'
import { Badge } from '$/components/Badge.js'
import type { BadgeStatus } from '$/components/Badge.js'
import chevronIcon from '$/assets/chevron-right.png'
import '$/shared/layout.css'
import '$/shared/global.css'
// import '../shared/styles/Page.css'
import './Explore.css'
import { useState } from 'react'

export default () => {
	const navigate = useNavigate()
	const { events, memberships, bounties, getRewardStatus } = useAppState()
	
	const goToEventDetail = (eventId: number) => {
		navigate(`/reward/${eventId}`)
	}
	
	const goToMembershipDetail = (membershipId: number) => {
		navigate(`/reward/${membershipId}`)
	}

	const goToBountyDetail = (bountyId: string) => {
		navigate(`/reward/${bountyId}`)
	}

	// Get badge status for a reward
	const getStatusClasses = (status: BadgeStatus): string => {
		return status === 'claimed' ? 'Explore__reward-card--claimed' : ''
	}

	// Filter bounties by category
	const membershipBounties = bounties.filter((bounty) => 
		bounty.category === 'VIC Membership' || bounty.category === 'Gift Voucher'
	)
	
	const eventBounties = bounties.filter((bounty) => 
		bounty.category === 'Event'
	)

	return (
		<ScrollView>
			<Header />
			
			<view className="Explore__hero">
				<view className="container">
					<text className="Explore__hero-title">DISCOVER & VERIFY</text>
					<text className="Explore__hero-subtitle">Access exclusive events and brand memberships</text>
				</view>
			</view>
			
			<view className="container">
				<view className="Explore__section">
					<SectionTitle
						title="AVAILABLE MEMBERSHIPS"
						subtitle="EXCLUSIVE BRAND ACCESS"
					/>
					
					<view className="Explore__rewards-list">
						{membershipBounties.map((bounty) => {
							const status = getRewardStatus(bounty.id, 'bounty')
							return (
								<view 
									key={bounty.id}
									className={`Explore__reward-card ${getStatusClasses(status)}`}
									bindtap={() => goToBountyDetail(bounty.id)}
								>
									<view className="Explore__reward-card__badge">
										<Badge status={status} />
									</view>
									<view className="Explore__reward-card__layout">
										{bounty.imageUri && (
											<view className="Explore__reward-card__image-container">
												<image 
													src={bounty.imageUri} 
													className="Explore__reward-card__image" 
												/>
											</view>
										)}
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{bounty.name}</text>
											<text className="Explore__reward-card__description">{bounty.description}</text>
											<view className="Explore__reward-card__category">
												<text className="Explore__reward-card__category-text">{bounty.category}</text>
											</view>
										</view>
										<view className="Explore__reward-card__right">
											<image src={chevronIcon} className="Explore__reward-card__icon" />
										</view>
									</view>
								</view>
							)
						})}
						
						{memberships.map((membership) => {
							const status = getRewardStatus(membership.id, 'membership')
							return (
								<view 
									key={membership.id}
									className={`Explore__reward-card ${getStatusClasses(status)}`}
									bindtap={() => goToMembershipDetail(membership.id)}
								>
									<view className="Explore__reward-card__badge">
										<Badge status={status} />
									</view>
									<view className="Explore__reward-card__layout">
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{membership.title}</text>
											<text className="Explore__reward-card__description">{membership.description}</text>
										</view>
										<view className="Explore__reward-card__right">
											<image src={chevronIcon} className="Explore__reward-card__icon" />
										</view>
									</view>
								</view>
							)
						})}
					</view>
				</view>
				
				<view className="Explore__section">
					<SectionTitle
						title="AVAILABLE EVENTS"
						subtitle="AROUND YOU"
					/>
					
					<view className="Explore__rewards-list">
						{eventBounties.map((bounty) => {
							const status = getRewardStatus(bounty.id, 'bounty')
							return (
								<view 
									key={bounty.id}
									className={`Explore__reward-card ${getStatusClasses(status)}`}
									bindtap={() => goToBountyDetail(bounty.id)}
								>
									<view className="Explore__reward-card__badge">
										<Badge status={status} />
									</view>
									<view className="Explore__reward-card__layout">
										{bounty.imageUri && (
											<view className="Explore__reward-card__image-container">
												<image 
													src={bounty.imageUri} 
													className="Explore__reward-card__image" 
												/>
											</view>
										)}
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{bounty.name}</text>
											<text className="Explore__reward-card__description">{bounty.description}</text>
											<view className="Explore__reward-card__category">
												<text className="Explore__reward-card__category-text">{bounty.category}</text>
											</view>
										</view>
										<view className="Explore__reward-card__right">
											<image src={chevronIcon} className="Explore__reward-card__icon" />
										</view>
									</view>
								</view>
							)
						})}
						
						{events.map((event) => {
							const status = getRewardStatus(event.id, 'event')
							return (
								<view 
									key={event.id}
									className={`Explore__reward-card ${getStatusClasses(status)}`}
									bindtap={() => goToEventDetail(event.id)}
								>
									<view className="Explore__reward-card__badge">
										<Badge status={status} />
									</view>
									<view className="Explore__reward-card__layout">
										{event.image && (
											<view className="Explore__reward-card__image-container">
												<image 
													src={event.image} 
													className="Explore__reward-card__image" 
												/>
											</view>
										)}
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{event.title}</text>
											<text className="Explore__reward-card__description">{event.date}</text>
										</view>
										<view className="Explore__reward-card__right">
											<image src={chevronIcon} className="Explore__reward-card__icon" />
										</view>
									</view>
								</view>
							)
						})}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
