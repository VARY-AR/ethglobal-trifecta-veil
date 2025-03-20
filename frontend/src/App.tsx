import { useState, useEffect } from '@lynx-js/react'
import './App.css'
import '$/shared/layout.css'
import '$/shared/global.css'

// Import all pages
import { HomePage } from './pages/HomePage.js'
import { WalletSetupPage } from './pages/WalletSetupPage.js'
import { ProductDashboardPage } from './pages/ProductDashboardPage.js'
import { ZkVerificationPage } from './pages/ZkVerificationPage.js'
import { RewardsPage } from './pages/RewardsPage.js'
import { BrandOnboardingPage } from './pages/BrandOnboardingPage.js'

// Simple route manager
export function App() {
	const [currentRoute, setCurrentRoute] = useState('home')
	
	// Simple navigation function
	const navigate = (route: string) => {
		setCurrentRoute(route)
	}
	
	// Make navigate globally available
	useEffect(() => {
		// @ts-ignore
		window.navigate = navigate
	}, [])
	
	// Render the appropriate page based on route
	const renderPage = () => {
		switch (currentRoute) {
			case 'home':
				return <HomePage />
			case 'wallet-setup':
				return <WalletSetupPage />
			case 'products':
				return <ProductDashboardPage />
			case 'zk-verification':
				return <ZkVerificationPage />
			case 'rewards':
				return <RewardsPage />
			case 'brand-onboarding':
				return <BrandOnboardingPage />
			default:
				return <HomePage />
		}
	}
	
	return (
		<view className="app">
			{renderPage()}
			
			{/* Simple navigation bar at the bottom for demo purposes */}
			<view className="nav-bar">
				<view className="container">
					<view className="row">
						<view className={`nav-item ${currentRoute === 'home' ? 'active' : ''}`} bindtap={() => navigate('home')}>
							<text>Home</text>
						</view>
						<view className={`nav-item ${currentRoute === 'wallet-setup' ? 'active' : ''}`} bindtap={() => navigate('wallet-setup')}>
							<text>Identity</text>
						</view>
						<view className={`nav-item ${currentRoute === 'products' ? 'active' : ''}`} bindtap={() => navigate('products')}>
							<text>Products</text>
						</view>
						<view className={`nav-item ${currentRoute === 'zk-verification' ? 'active' : ''}`} bindtap={() => navigate('zk-verification')}>
							<text>Verify</text>
						</view>
						<view className={`nav-item ${currentRoute === 'rewards' ? 'active' : ''}`} bindtap={() => navigate('rewards')}>
							<text>Rewards</text>
						</view>
						<view className={`nav-item ${currentRoute === 'brand-onboarding' ? 'active' : ''}`} bindtap={() => navigate('brand-onboarding')}>
							<text>Brands</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	)
}
