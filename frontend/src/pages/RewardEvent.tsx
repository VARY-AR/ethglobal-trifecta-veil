import { useState } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { Button } from '$/components/Button.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { events } from '$/data/mockData.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './RewardEvent.css'

export default () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [readMore, setReadMore] = useState(false)
	
	// Find event by ID
	const event = events.find(e => e.id === Number(id))
	
	if (!event) {
		return (
			<view className="reward-not-found">
				<Header />
				<view className="container">
					<text className="error-message">Event not found</text>
					<Button bindtap={() => navigate('/')}>Back to Home</Button>
				</view>
			</view>
		)
	}
	
	const verifyEligibility = () => {
		navigate(`/reward/${id}/verify`)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="reward-detail-container">
				<view className="reward-hero">
					{event.image ? (
						<image className="reward-image" src={event.image} />
					) : (
						<view className="reward-image-placeholder">
							<text className="reward-title">{event.title}</text>
							<text className="reward-subtitle">{event.location}</text>
						</view>
					)}
				</view>
				
				<view className="container reward-content">
					<SectionTitle 
						title="DESCRIPTION"
					/>
					
					<view className="reward-description">
						<text className="reward-description-title">{event.title.split(' ')[0]} STUDIO</text>
						<text className="reward-description-text">
							{readMore ? event.fullDescription : event.description}
						</text>
						<text className="read-more-link" bindtap={() => setReadMore(!readMore)}>
							{readMore ? 'READ LESS' : 'READ MORE'}
						</text>
					</view>
					
					{event.links && event.links.length > 0 && (
						<view className="reward-links">
							{event.links.map((link, index) => (
								<view key={index} className="reward-link-item">
									<text className="reward-link-text">{link.title}</text>
									<text className="reward-link-arrow">⟶</text>
								</view>
							))}
						</view>
					)}
					
					<SectionTitle 
						title="REQUIREMENTS"
					/>
					
					<view className="requirements-list">
						{event.requirements.map((requirement, index) => (
							<view key={index} className="requirement-item">
								<text className="requirement-bullet">•</text>
								<text className="requirement-text">{requirement}</text>
							</view>
						))}
					</view>
					
					<view className="action-button-container">
						<Button fullWidth bindtap={verifyEligibility}>
							VERIFY ELIGIBILITY
						</Button>
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
