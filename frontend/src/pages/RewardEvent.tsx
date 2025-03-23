import { useState } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { Button } from '$/components/Button.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { RewardTicket } from '$/components/RewardTicket.js'
import { useAppState } from '$/lib/AppStateProvider.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './RewardEvent.css'

export default () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [readMore, setReadMore] = useState(false)
	const [isTicketOpen, setIsTicketOpen] = useState(false)
	const { events, isRewardClaimed } = useAppState()
	
	// Find event by ID
	const event = events.find(e => e.id === Number(id))
	const isClaimed = isRewardClaimed(Number(id), 'event')
	
	if (!event) {
		return (
			<view className="RewardEvent__not-found">
				<Header />
				<view className="container">
					<text className="RewardEvent__error-message">Event not found</text>
					<Button bindtap={() => navigate('/')}>Back to Home</Button>
				</view>
			</view>
		)
	}
	
	const verifyEligibility = () => {
		navigate(`/reward/${id}/verify`)
	}
	
	const viewTicket = () => {
		setIsTicketOpen(true)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="RewardEvent">
				<view className="RewardEvent__hero">
					{event.image ? (
						<image className="RewardEvent__image" src={event.image} />
					) : (
						<view className="RewardEvent__image-placeholder">
							<text className="RewardEvent__title">{event.title}</text>
							<text className="RewardEvent__subtitle">{event.location}</text>
						</view>
					)}
				</view>
				
				<view className="container RewardEvent__content">
					<SectionTitle 
						title="DESCRIPTION"
					/>
					
					<view className="RewardEvent__description">
						<text className="RewardEvent__description-title">{event.title.split(' ')[0]} STUDIO</text>
						<text className="RewardEvent__description-text">
							{readMore ? event.fullDescription : event.description}
						</text>
						<text className="RewardEvent__read-more-link" bindtap={() => setReadMore(!readMore)}>
							{readMore ? 'READ LESS' : 'READ MORE'}
						</text>
					</view>
					
					{event.links && event.links.length > 0 && (
						<view className="RewardEvent__links">
							{event.links.map((link, index) => (
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
						{event.requirements.map((requirement, index) => (
							<view key={index} className="RewardEvent__requirement-item">
								<text className="RewardEvent__requirement-bullet">•</text>
								<text className="RewardEvent__requirement-text">{requirement}</text>
							</view>
						))}
					</view>
					
					<view className="RewardEvent__action-button-container">
						{isClaimed ? (
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
		</ScrollView>
	)
}
