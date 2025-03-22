import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import { ScrollView } from '$/components/ScrollView.js'
import { memberships, events } from '$/data/mockData.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './HomePage.css'

export function HomePage() {
	return (
		<ScrollView>
			<Header />
			
			<view className="search-container">
				<view className="search-input">
					<text className="search-placeholder">Lorem Ipsum</text>
				</view>
			</view>
			
			<view className="container">
				<view className="section">
					<view className="section-header">
						<text className="section-title">AVAILABLE MEMBERSHIPS</text>
						<text className="section-subtitle">EXCLUSIVE BRAND ACCESS</text>
					</view>
					
					<view className="membership-list">
						{
							memberships
								.map(item => (
									<Card key={item.id} className="membership-card">
										<view className="card-content">
											<text className="card-title">{item.title}</text>
											<text className="card-description">{item.description}</text>
										</view>
										<text className="card-icon">{item.icon}</text>
									</Card>
								))
						}
					</view>
				</view>
				
				<view className="section">
					<view className="section-header">
						<text className="section-title">AVAILABLE EVENTS</text>
						<text className="section-subtitle">AROUND YOU</text>
					</view>
					
					<view className="events-list">
						{
							events
								.map(item => (
									<Card key={item.id} className="event-card">
										<view className="card-content">
											<text className="card-title">{item.title}</text>
											<text className="card-description">{item.date}</text>
										</view>
										<text className="card-icon">{item.icon}</text>
									</Card>
								))
						}
					</view>
				</view>
			</view>
		</ScrollView>
	)
} 