import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function RewardsPage() {
	// State for active tab, filter settings, claimed rewards, and notifications
	const [activeTab, setActiveTab] = useState('available')
	const [rewardFilters, setRewardFilters] = useState({
		type: 'all',
		brand: 'all'
	})
	const [claimedRewards, setClaimedRewards] = useState(['reward-3'])
	const [notifications, setNotifications] = useState(3)
	
	// Available rewards data
	const rewards = [
		{
			id: 'reward-1',
			title: 'Early Access Pass',
			description: 'Get early access to the upcoming collection from Nike',
			brand: 'Nike',
			type: 'access',
			requiredProof: 'Early Adopter',
			expiration: '2023-09-30',
			image: '/placeholder-reward1.jpg'
		},
		{
			id: 'reward-2',
			title: 'Limited Edition NFT',
			description: 'Exclusive digital collectible for Louis Vuitton owners',
			brand: 'Louis Vuitton',
			type: 'digital',
			requiredProof: 'Luxury Brand Owner',
			expiration: '2023-10-15',
			image: '/placeholder-reward2.jpg'
		},
		{
			id: 'reward-3',
			title: '30% Off Coupon',
			description: 'Discount on your next purchase at Supreme',
			brand: 'Supreme',
			type: 'discount',
			requiredProof: 'Brand Loyalist',
			expiration: '2023-08-20',
			image: '/placeholder-reward3.jpg'
		},
		{
			id: 'reward-4',
			title: 'VIP Event Ticket',
			description: 'Access to exclusive fashion week event in Paris',
			brand: 'Multiple',
			type: 'event',
			requiredProof: 'Collection Diversity',
			expiration: '2023-11-01',
			image: '/placeholder-reward4.jpg'
		}
	]
	
	// Handle claiming a reward
	const handleClaimReward = (rewardId: string) => {
		console.log(`Claiming reward ${rewardId}`)
		setClaimedRewards([...claimedRewards, rewardId])
	}
	
	// Share reward on social media
	const handleShareOnSocial = () => {
		console.log('Sharing reward on social media')
	}
	
	// Handle filter changes
	const handleTypeChange = (e: any) => {
		setRewardFilters({...rewardFilters, type: e.target.value})
	}
	
	const handleBrandChange = (e: any) => {
		setRewardFilters({...rewardFilters, brand: e.target.value})
	}
	
	// Filter rewards based on user selections
	const filteredAvailableRewards = rewards.filter(reward => {
		// Skip already claimed rewards
		if (claimedRewards.includes(reward.id)) return false
		
		// Apply type filter
		if (rewardFilters.type !== 'all' && reward.type !== rewardFilters.type) return false
		
		// Apply brand filter
		if (rewardFilters.brand !== 'all' && reward.brand !== rewardFilters.brand) return false
		
		return true
	})
	
	// Get claimed rewards
	const userClaimedRewards = rewards.filter(reward => claimedRewards.includes(reward.id))
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<view className="row">
					<text className="h1">Rewards & Experiences</text>
					
					<view className="notifications-icon" bindtap={() => {}}>
						<text>🔔</text>
						{notifications > 0 && (
							<view className="notification-badge">
								<text>{notifications}</text>
							</view>
						)}
					</view>
				</view>
				
				{/* Tabs */}
				<view className="tabs">
					<view className="row">
						<view
							className={`tab ${activeTab === 'available' ? 'active' : ''}`}
							bindtap={() => setActiveTab('available')}
						>
							<text>Available Rewards</text>
						</view>
						<view
							className={`tab ${activeTab === 'redeemed' ? 'active' : ''}`}
							bindtap={() => setActiveTab('redeemed')}
						>
							<text>Redeemed Rewards</text>
						</view>
					</view>
				</view>
				
				{/* Filters (only shown on available tab) */}
				{activeTab === 'available' && (
					<view className="filters card p-md">
						<view className="row gap-md">
							<view className="form-group">
								<text>Reward Type:</text>
								<select value={rewardFilters.type} onChange={handleTypeChange}>
									<option value="all">All Types</option>
									<option value="access">Access Pass</option>
									<option value="digital">Digital Collectible</option>
									<option value="discount">Discount</option>
									<option value="event">Event Ticket</option>
								</select>
							</view>
							
							<view className="form-group">
								<text>Brand:</text>
								<select value={rewardFilters.brand} onChange={handleBrandChange}>
									<option value="all">All Brands</option>
									<option value="Nike">Nike</option>
									<option value="Louis Vuitton">Louis Vuitton</option>
									<option value="Supreme">Supreme</option>
								</select>
							</view>
						</view>
					</view>
				)}
				
				{/* Available Rewards */}
				{activeTab === 'available' && (
					<view className="row-2 gap-md">
						{filteredAvailableRewards.length > 0 ? (
							filteredAvailableRewards.map(reward => (
								<view className="card reward-card" key={reward.id}>
									<view className="reward-image">
										<text>Reward Image</text>
									</view>
									<text className="h3">{reward.title}</text>
									<text className="p">{reward.description}</text>
									<view className="row">
										<text>Required: {reward.requiredProof}</text>
										<text>Expires: {reward.expiration}</text>
									</view>
									<view className="button" bindtap={() => handleClaimReward(reward.id)}>
										<text>Claim with ZK Proof</text>
									</view>
								</view>
							))
						) : (
							<view className="no-rewards card p-md text-center">
								<text>No rewards match your current filters</text>
							</view>
						)}
					</view>
				)}
				
				{/* Redeemed Rewards */}
				{activeTab === 'redeemed' && (
					<view className="row-2 gap-md">
						{userClaimedRewards.length > 0 ? (
							userClaimedRewards.map(reward => (
								<view className="card reward-card" key={reward.id}>
									<view className="reward-image">
										<text>Reward Image</text>
									</view>
									<text className="h3">{reward.title}</text>
									<text className="p">{reward.description}</text>
									<view className="row">
										<text>Brand: {reward.brand}</text>
										<text className="text-success">✓ Claimed</text>
									</view>
									<view className="button secondary" bindtap={handleShareOnSocial}>
										<text>Share on Social</text>
									</view>
								</view>
							))
						) : (
							<view className="no-rewards card p-md text-center">
								<text>You haven't claimed any rewards yet</text>
							</view>
						)}
					</view>
				)}
				
				{/* Notifications preferences */}
				<view className="section">
					<text className="h3">New Rewards Notifications</text>
					<text className="p">Get notified when new rewards matching your collection become available.</text>
					
					<view className="card p-md">
						<view className="form-group">
							<text>Notify me about:</text>
							<select>
								<option value="all">All new rewards</option>
								<option value="eligible">Only rewards I'm eligible for</option>
								<option value="custom">Custom preferences</option>
							</select>
						</view>
						
						<view className="button" bindtap={() => console.log('Save notification preferences')}>
							<text>Save Preferences</text>
						</view>
					</view>
				</view>
			</view>
		</ScrollView>
	)
} 