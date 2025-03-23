import { useNavigate } from 'react-router'
import { Header } from '$/components/Header.js'
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
		navigate(`/reward/${eventId}`)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="Explore__search-container">
				<view className="Explore__search-input">
					<text className="Explore__search-placeholder">Search...</text>
				</view>
			</view>
			
			<view className="container">
				<view className="Explore__section">
					<SectionTitle
						title="AVAILABLE MEMBERSHIPS"
						subtitle="EXCLUSIVE BRAND ACCESS"
					/>
					
					<view className="Explore__rewards-list">
						{memberships.map((reward, index) => (
							<view 
								key={index}
								className="Explore__reward-card"
								bindtap={() => console.log('Membership tapped')}
							>
								<view className="Explore__reward-card__layout">
									<view className="Explore__reward-card__content">
										<text className="Explore__reward-card__title">{reward.title}</text>
										<text className="Explore__reward-card__description">{reward.description}</text>
									</view>
									<image src={chevronIcon} className="Explore__reward-card__icon" />
								</view>
							</view>
						))}
					</view>
				</view>
				
				<view className="Explore__section">
					<SectionTitle
						title="REWARDS"
						subtitle="Collect Event Rewards"
					/>
					
					<view className="Explore__rewards-list">
						{events.map((reward, index) => (
							<view 
								key={index}
								className="Explore__reward-card"
								bindtap={() => goToEventDetail(reward.id)}
							>
								<view className="Explore__reward-card__layout">
									<view className="Explore__reward-card__content">
										<text className="Explore__reward-card__title">{reward.title}</text>
										<text className="Explore__reward-card__description">{reward.date}</text>
									</view>
									<image src={chevronIcon} className="Explore__reward-card__icon" />
								</view>
							</view>
						))}
					</view>
				</view>
			</view>
		</ScrollView>
	)
}
