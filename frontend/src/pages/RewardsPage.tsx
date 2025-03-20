import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function RewardsPage() {
	const [activeTab, setActiveTab] = useState('available')
	const [rewardFilters, setRewardFilters] = useState({
		type: 'all',
		brand: 'all',
	})
	
	const rewards = [
		{
			id: 'reward-1',
			title: 'Limited Edition NFT',
			description: 'An exclusive digital artwork NFT for luxury watch collectors.',
			brand: 'LuxTime',
			type: 'Digital',
			requiredProof: 'Luxury Product Owner',
			expiresAt: '2023-12-31',
			image: 'nft-placeholder.jpg',
		},
		{
			id: 'reward-2',
			title: 'VIP Fashion Show Access',
			description: 'Front row seats at our upcoming seasonal fashion show.',
			brand: 'FashionLux',
			type: 'Experience',
			requiredProof: 'Early Adopter',
			expiresAt: '2023-11-15',
			image: 'fashion-show-placeholder.jpg',
		},
		{
			id: 'reward-3',
			title: '25% Off Next Purchase',
			description: 'A substantial discount on your next purchase of any full-price item.',
			brand: 'UrbanKicks',
			type: 'Discount',
			requiredProof: 'Brand Loyalist',
			expiresAt: '2023-12-01',
			image: 'discount-placeholder.jpg',
		},
		{
			id: 'reward-4',
			title: 'Exclusive Style Consultation',
			description: 'One-hour private consultation with our lead designer.',
			brand: 'FashionLux',
			type: 'Experience',
			requiredProof: 'Multi-Category Collector',
			expiresAt: '2023-11-30',
			image: 'consultation-placeholder.jpg',
		},
	]
	
	const [claimedRewards, setClaimedRewards] = useState<string[]>([])
	const [notifications, setNotifications] = useState([
		{
			id: 'notif-1',
			title: 'New reward available',
			message: 'A new VIP Fashion Show Access reward is available.',
			date: '2023-10-15',
			read: false,
		},
		{
			id: 'notif-2',
			title: 'Proof expiring soon',
			message: 'Your "Luxury Product Owner" proof expires in 3 days.',
			date: '2023-10-12',
			read: true,
		},
	])
	
	const handleClaimReward = (rewardId: string) => {
		console.log('Claiming reward', rewardId)
		setClaimedRewards([...claimedRewards, rewardId])
	}
	
	const handleShareOnSocial = () => {
		console.log('Sharing reward on social media')
		// In a real app, this would open a sharing dialog
	}
	
	const handleFilterChange = (filterType: 'type' | 'brand', value: string) => {
		setRewardFilters({
			...rewardFilters,
			[filterType]: value,
		})
	}
	
	const filteredRewards = rewards.filter(reward => {
		if (rewardFilters.type !== 'all' && reward.type !== rewardFilters.type) return false
		if (rewardFilters.brand !== 'all' && reward.brand !== rewardFilters.brand) return false
		return true
	})
	
	const availableRewards = filteredRewards.filter(reward => !claimedRewards.includes(reward.id))
	const redeemedRewards = filteredRewards.filter(reward => claimedRewards.includes(reward.id))
	
	const handleTypeChange = (e: any) => {
		handleFilterChange('type', e.target.value)
	}
	
	const handleBrandChange = (e: any) => {
		handleFilterChange('brand', e.target.value)
	}
	
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl pad-lg">
					<view className="row">
						<h1>Rewards & Experiences</h1>
						<view style={{ flex: 1 }} />
						<view className="notifications-icon" bindtap={() => {}}> 
							<text className="notification-badge">{notifications.filter(n => !n.read).length}</text>
						</view>
					</view>
					
					<view className="tabs">
						<view className="row gap-md">
							<view 
								className={`tab ${activeTab === 'available' ? 'active' : ''}`}
								bindtap={() => setActiveTab('available')}
							>
								<text>Available</text>
							</view>
							<view 
								className={`tab ${activeTab === 'redeemed' ? 'active' : ''}`}
								bindtap={() => setActiveTab('redeemed')}
							>
								<text>Redeemed</text>
							</view>
						</view>
					</view>
					
					<view className="filters row gap-md">
						<view className="filter-group">
							<text>Reward Type:</text>
							<select value={rewardFilters.type} onChange={handleTypeChange}>
								<option value="all">All Types</option>
								<option value="Digital">Digital</option>
								<option value="Experience">Experience</option>
								<option value="Discount">Discount</option>
							</select>
						</view>
						
						<view className="filter-group">
							<text>Brand:</text>
							<select value={rewardFilters.brand} onChange={handleBrandChange}>
								<option value="all">All Brands</option>
								<option value="LuxTime">LuxTime</option>
								<option value="FashionLux">FashionLux</option>
								<option value="UrbanKicks">UrbanKicks</option>
							</select>
						</view>
					</view>
					
					{activeTab === 'available' && (
						<view className="rewards-grid row grid-3 gap-lg">
							{availableRewards.length > 0 ? availableRewards.map(reward => (
								<Card key={reward.id} className="reward-card">
									<view className="reward-image placeholder" />
									<view className="reward-brand">
										<text>{reward.brand}</text>
									</view>
									<h3>{reward.title}</h3>
									<p>{reward.description}</p>
									<view className="reward-details">
										<text>Requires: {reward.requiredProof}</text>
										<text>Expires: {reward.expiresAt}</text>
									</view>
									<view className="button" bindtap={() => handleClaimReward(reward.id)}>
										<text>Claim with ZK Proof</text>
									</view>
								</Card>
							)) : (
								<view className="empty-state">
									<text>No rewards match your current filters.</text>
								</view>
							)}
						</view>
					)}
					
					{activeTab === 'redeemed' && (
						<view className="rewards-grid row grid-3 gap-lg">
							{redeemedRewards.length > 0 ? redeemedRewards.map(reward => (
								<Card key={reward.id} className="reward-card claimed">
									<view className="reward-image placeholder" />
									<view className="reward-status">
										<text>Claimed</text>
									</view>
									<h3>{reward.title}</h3>
									<p>{reward.description}</p>
									<view className="reward-details">
										<text>Brand: {reward.brand}</text>
										<text>Claimed on: {new Date().toLocaleDateString()}</text>
									</view>
									<view className="button secondary" bindtap={handleShareOnSocial}>
										<text>Share on Social Media</text>
									</view>
								</Card>
							)) : (
								<view className="empty-state">
									<text>You haven't claimed any rewards yet.</text>
								</view>
							)}
						</view>
					)}
					
					<Card>
						<view className="column gap-md">
							<h3>New Rewards Notifications</h3>
							<p>Get notified when new rewards matching your collection become available.</p>
							
							<view className="notification-settings">
								<view className="row gap-sm">
									<input type="checkbox" id="notify-luxury" checked={true} />
									<text>Luxury product rewards</text>
								</view>
								
								<view className="row gap-sm">
									<input type="checkbox" id="notify-limited" checked={true} />
									<text>Limited edition items</text>
								</view>
								
								<view className="row gap-sm">
									<input type="checkbox" id="notify-events" checked={true} />
									<text>Exclusive events and experiences</text>
								</view>
							</view>
							
							<view className="button" bindtap={() => console.log('Save notification preferences')}>
								<text>Save Preferences</text>
							</view>
						</view>
					</Card>
				</view>
			</view>
		</view>
	)
} 