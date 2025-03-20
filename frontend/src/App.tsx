import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router'
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

// Navigation component
function Navigation() {
	const navigate = useNavigate()
	const location = useLocation()
	const currentRoute = location.pathname
	
	return (
		<view className="nav-bar">
			<view className="container">
				<view className="row">
					<view className={`nav-item ${currentRoute === '/' ? 'active' : ''}`} bindtap={() => navigate('/')}>
						<text>Home</text>
					</view>
					<view className={`nav-item ${currentRoute === '/wallet-setup' ? 'active' : ''}`} bindtap={() => navigate('/wallet-setup')}>
						<text>Identity</text>
					</view>
					<view className={`nav-item ${currentRoute === '/products' ? 'active' : ''}`} bindtap={() => navigate('/products')}>
						<text>Products</text>
					</view>
					<view className={`nav-item ${currentRoute === '/zk-verification' ? 'active' : ''}`} bindtap={() => navigate('/zk-verification')}>
						<text>Verify</text>
					</view>
					<view className={`nav-item ${currentRoute === '/rewards' ? 'active' : ''}`} bindtap={() => navigate('/rewards')}>
						<text>Rewards</text>
					</view>
					<view className={`nav-item ${currentRoute === '/brand-onboarding' ? 'active' : ''}`} bindtap={() => navigate('/brand-onboarding')}>
						<text>Brands</text>
					</view>
				</view>
			</view>
		</view>
	)
}
// App entry point
export function App() {
	return (
		<MemoryRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/wallet-setup" element={<WalletSetupPage />} />
				<Route path="/products" element={<ProductDashboardPage />} />
				<Route path="/zk-verification" element={<ZkVerificationPage />} />
				<Route path="/rewards" element={<RewardsPage />} />
				<Route path="/brand-onboarding" element={<BrandOnboardingPage />} />
			</Routes>
			<Navigation />
		</MemoryRouter>
	)
}

