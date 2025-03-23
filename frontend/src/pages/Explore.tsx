import { useNavigate } from 'react-router'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { useAppState } from '$/lib/AppStateProvider.js'
import chevronIcon from '$/assets/chevron-right.png'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Explore.css'

export default () => {
	const navigate = useNavigate()
	const { events, memberships, isRewardClaimed } = useAppState()
	
	const goToEventDetail = (eventId: number) => {
		navigate(`/reward/${eventId}`)
	}
	
	const goToMembershipDetail = (membershipId: number) => {
		navigate(`/reward/${membershipId}`)
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
						{memberships.map((membership) => {
							const isClaimed = isRewardClaimed(membership.id, 'membership')
							return (
								<view 
									key={membership.id}
									className={`Explore__reward-card ${isClaimed ? 'Explore__reward-card--claimed' : ''}`}
									bindtap={() => goToMembershipDetail(membership.id)}
								>
									<view className="Explore__reward-card__layout">
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{membership.title}</text>
											<text className="Explore__reward-card__description">{membership.description}</text>
										</view>
										<view className="Explore__reward-card__right">
											{isClaimed && (
												<view className="Explore__reward-card__claimed-badge">
													<text>CLAIMED</text>
												</view>
											)}
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
						{events.map((event) => {
							const isClaimed = isRewardClaimed(event.id, 'event')
							return (
								<view 
									key={event.id}
									className={`Explore__reward-card ${isClaimed ? 'Explore__reward-card--claimed' : ''}`}
									bindtap={() => goToEventDetail(event.id)}
								>
									<view className="Explore__reward-card__layout">
										<view className="Explore__reward-card__content">
											<text className="Explore__reward-card__title">{event.title}</text>
											<text className="Explore__reward-card__description">{event.date}</text>
										</view>
										<view className="Explore__reward-card__right">
											{isClaimed && (
												<view className="Explore__reward-card__claimed-badge">
													<text>CLAIMED</text>
												</view>
											)}
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
