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
import { EventDetailPage } from './pages/EventDetail.js'
import { EventVerifyPage } from './pages/EventVerify.js'
import { Navigation } from './components/Navigation.js'

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
				<Route path="/event/:id" element={<EventDetailPage />} />
				<Route path="/event/:id/verify" element={<EventVerifyPage />} />
			</Routes>
			<Navigation />
		</MemoryRouter>
	)
}

