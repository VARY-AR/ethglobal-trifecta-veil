import { useNavigate } from 'react-router'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import { ScrollView } from '$/components/ScrollView.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { memberships, events } from '$/data/mockData.js'
import chevronIcon from '$/assets/chevron-right.png'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Explore.css'

export default () => {
	const navigate = useNavigate()
	
	const goToEventDetail = (eventId: number) => {
		navigate(`/event/${eventId}`)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="search-container">
				<view className="search-input">
					<text className="search-placeholder">Search...</text>
				</view>
			</view>
			
			<view className="container">
				<view className="section">
					<SectionTitle
						title="AVAILABLE MEMBERSHIPS"
						subtitle="EXCLUSIVE BRAND ACCESS"
					/>
					
					<view className="membership-list">
						{memberships.map(item => (
							<Card key={item.id} className="membership-card">
								<view className="row">
									<view className="card-content">
										<text className="card-title">{item.title}</text>
										<text className="card-description">{item.description}</text>
									</view>
									<image className="card-icon" src={chevronIcon} />
								</view>
							</Card>
						))}
					</view>
				</view>
				
				<view className="section">
					<SectionTitle
						title="AVAILABLE EVENTS"
						subtitle="AROUND YOU"
					/>
					
					<view className="events-list">
						{events.map(item => (
							<Card 
								key={item.id} 
								className="event-card"
								bindtap={() => goToEventDetail(item.id)}
							>
								<view className="row">
									<view className="card-content">
										<text className="card-title">{item.title}</text>
										<text className="card-description">{item.date}</text>
									</view>
									<image className="card-icon" src={chevronIcon} />
								</view>
							</Card>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
