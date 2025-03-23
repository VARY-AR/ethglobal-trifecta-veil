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
import './Explore.css'

export default () => {
	const navigate = useNavigate()
	const { events, memberships, getRewardStatus, isRewardClaimed } = useAppState()
	
	const goToEventDetail = (eventId: number) => {
		navigate(`/reward/${eventId}`)
	}
	
	const goToMembershipDetail = (membershipId: number) => {
		navigate(`/reward/${membershipId}`)
	}

	// Get badge status for a reward
	const getStatusClasses = (status: BadgeStatus): string => {
		return status === 'claimed' ? 'Explore__reward-card--claimed' : ''
	}

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
