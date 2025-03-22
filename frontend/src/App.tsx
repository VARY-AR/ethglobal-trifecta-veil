import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router'
import './App.css'
import '$/shared/layout.css'
import '$/shared/global.css'

// Import all pages
import { HomePage } from './pages/HomePage.js'
import { WalletPage } from './pages/WalletPage.js'
import { ProductDashboardPage } from './pages/ProductDashboardPage.js'
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
				<Route path="/wallet" element={<WalletPage />} />
				<Route path="/products" element={<ProductDashboardPage />} />
				<Route path="/rewards" element={<RewardsPage />} />
				<Route path="/profile" element={<BrandOnboardingPage />} />
				<Route path="/event/:id" element={<EventDetailPage />} />
				<Route path="/event/:id/verify" element={<EventVerifyPage />} />
			</Routes>
			<Navigation />
		</MemoryRouter>
	)
}

