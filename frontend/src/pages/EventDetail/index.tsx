import { useState } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { Button } from '$/components/Button/index.js'
import { SectionTitle } from '$/components/SectionTitle/index.js'
import { events } from '$/data/mockData.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './styles.css'

export function EventDetailPage() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [readMore, setReadMore] = useState(false)
	
	// Find event by ID
	const event = events.find(e => e.id === Number(id))
	
	if (!event) {
		return (
			<view className="event-not-found">
				<Header />
				<view className="container">
					<text className="error-message">Event not found</text>
					<Button bindtap={() => navigate('/')}>Back to Home</Button>
				</view>
			</view>
		)
	}
	
	const verifyEligibility = () => {
		navigate(`/event/${id}/verify`)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="event-detail-container">
				<view className="event-hero">
					{event.image ? (
						<image className="event-image" src={event.image} />
					) : (
						<view className="event-image-placeholder">
							<text className="event-title">{event.title}</text>
							<text className="event-subtitle">{event.location}</text>
						</view>
					)}
				</view>
				
				<view className="container event-content">
					<SectionTitle 
						title="DESCRIPTION"
						centered
					/>
					
					<view className="event-description">
						<text className="event-description-title">{event.title.split(' ')[0]} STUDIO</text>
						<text className="event-description-text">
							{readMore ? event.fullDescription : event.description}
						</text>
						<text className="read-more-link" bindtap={() => setReadMore(!readMore)}>
							{readMore ? 'READ LESS' : 'READ MORE'}
						</text>
					</view>
					
					{event.links && event.links.length > 0 && (
						<view className="event-links">
							{event.links.map((link, index) => (
								<view key={index} className="event-link-item">
									<text className="event-link-text">{link.title}</text>
									<text className="event-link-arrow">⟶</text>
								</view>
							))}
						</view>
					)}
					
					<SectionTitle 
						title="REQUIREMENTS"
						centered
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