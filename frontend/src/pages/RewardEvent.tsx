import { useState } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { Button } from '$/components/Button.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { RewardTicket } from '$/components/RewardTicket.js'
import { Badge } from '$/components/Badge.js'
import { useAppState } from '$/lib/AppStateProvider.js'
import type { BadgeStatus } from '$/components/Badge.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './RewardEvent.css'

export default () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [readMore, setReadMore] = useState(false)
	const [isTicketOpen, setIsTicketOpen] = useState(false)
	const { events, bounties, getRewardStatus, updateRewardStatus, isRewardClaimed, isRewardClaimable } = useAppState()
	
	// Find event or bounty by ID
	const event = events.find(e => e.id === Number(id))
	const bounty = bounties.find(b => b.id === id)
	
	const rewardType = event ? 'event' : bounty ? 'bounty' : null
	const rewardStatus = rewardType === 'event' 
		? getRewardStatus(Number(id), 'event') 
		: rewardType === 'bounty' 
			? getRewardStatus(id as string, 'bounty') 
			: null
	
	const reward = event || bounty
	
	if (!reward) {
		return (
			<view className="RewardEvent__not-found">
				<Header />
				<view className="container">
					<text className="RewardEvent__error-message">Reward not found</text>
					<Button bindtap={() => navigate('/')}>Back to Home</Button>
				</view>
			</view>
		)
	}
	
	const verifyEligibility = () => {
		// When verification is started, update status to claimable
		if (rewardType === 'event') {
			updateRewardStatus(Number(id), 'event', 'claimable')
		} else if (rewardType === 'bounty') {
			updateRewardStatus(id as string, 'bounty', 'claimable')
		}
		navigate(`/reward/${id}/verify`)
	}
	
	const viewTicket = () => {
		setIsTicketOpen(true)
	}
	
	// Get requirements based on reward type
	const getRequirements = () => {
		if (rewardType === 'event') {
			return event!.requirements
		} else if (rewardType === 'bounty') {
			return bounty!.requirements.map(req => req.description)
		}
		return []
	}
	
	// Get links based on reward type
	const getLinks = () => {
		if (rewardType === 'event' && event!.links) {
			return event!.links
		} else if (rewardType === 'bounty') {
			return [
				{
					title: bounty!.brandWebsite,
					url: bounty!.brandWebsite
				}
			]
		}
		return []
	}
	
	// Get reward title based on type
	const getTitle = () => {
		if (rewardType === 'event') {
			return event!.title
		} else if (rewardType === 'bounty') {
			return bounty!.name
		}
		return ''
	}
	
	// Get reward description based on type
	const getDescription = () => {
		if (rewardType === 'event') {
			return readMore ? event!.fullDescription : event!.description
		} else if (rewardType === 'bounty') {
			return bounty!.description
		}
		return ''
	}
	
	// Get reward image based on type
	const getImage = () => {
		if (rewardType === 'event') {
			return event!.image
		} else if (rewardType === 'bounty') {
			return bounty!.imageUri
		}
		return null
	}
	
	// Get reward subtitle based on type
	const getSubtitle = () => {
		if (rewardType === 'event') {
			return event!.location
		} else if (rewardType === 'bounty') {
			return bounty!.category
		}
		return ''
	}
	
	// Check if reward is claimed based on type
	const isRewardClaimedForCurrentType = () => {
		if (rewardType === 'event') {
			return isRewardClaimed(Number(id), 'event')
		} else if (rewardType === 'bounty') {
			return isRewardClaimed(id as string, 'bounty')
		}
		return false
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="RewardEvent">
				<view className="RewardEvent__hero">
					{getImage() ? (
						<image className="RewardEvent__image" src={getImage()!} />
					) : (
						<view className="RewardEvent__image-placeholder">
							<text className="RewardEvent__title">{getTitle()}</text>
							<text className="RewardEvent__subtitle">{getSubtitle()}</text>
						</view>
					)}
				</view>
				
				<view className="container RewardEvent__content">
					<SectionTitle 
						title="DESCRIPTION"
					/>
					
					<view className="RewardEvent__description">
						<text className="RewardEvent__description-title">
							{rewardType === 'event' 
								? event!.title.split(' ')[0] + ' STUDIO' 
								: bounty?.name.split(' ')[0]}
						</text>
						<text className="RewardEvent__description-text">
							{getDescription()}
						</text>
						{rewardType === 'event' && (
							<text className="RewardEvent__read-more-link" bindtap={() => setReadMore(!readMore)}>
								{readMore ? 'READ LESS' : 'READ MORE'}
							</text>
						)}
					</view>
					
					{getLinks().length > 0 && (
						<view className="RewardEvent__links">
							{getLinks().map((link, index) => (
								<view key={index} className="RewardEvent__link-item">
									<text className="RewardEvent__link-text">{link.title}</text>
									<text className="RewardEvent__link-arrow">⟶</text>
								</view>
							))}
						</view>
					)}
					
					<SectionTitle 
						title="REQUIREMENTS"
					/>
					
					<view className="RewardEvent__requirements-list">
						{getRequirements().map((requirement, index) => (
							<view key={index} className="RewardEvent__requirement-item">
								<text className="RewardEvent__requirement-bullet">•</text>
								<text className="RewardEvent__requirement-text">{requirement}</text>
							</view>
						))}
					</view>
					
					<view className="RewardEvent__action-button-container">
						{isRewardClaimedForCurrentType() ? (
							<Button fullWidth bindtap={viewTicket}>
								SEE TICKET
							</Button>
						) : (
							<Button fullWidth bindtap={verifyEligibility}>
								VERIFY ELIGIBILITY
							</Button>
						)}
					</view>
				</view>
			</view>
			
			{/* Ticket drawer */}
			{event && (
				<RewardTicket 
					isOpen={isTicketOpen} 
					onClose={() => setIsTicketOpen(false)}
					event={event}
				/>
			)}
			{bounty && (
				<RewardTicket 
					isOpen={isTicketOpen} 
					onClose={() => setIsTicketOpen(false)}
					bounty={bounty}
				/>
			)}
		</ScrollView>
	)
}
