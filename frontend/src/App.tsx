import { MemoryRouter, Routes, Route, useNavigate, useLocation } from 'react-router'
import './App.css'
import '$/shared/layout.css'
import '$/shared/global.css'
import { PrivyProvider } from './lib/PrivyProvider.jsx'
import { WalletManager } from './components/WalletManager.js'

// Import all pages
import Explore from './pages/Explore.jsx'
import Wallets from './pages/Wallets.jsx'
import Products from './pages/Products.jsx'
import Profile from './pages/Profile.jsx'
import Event from './pages/RewardEvent.jsx'
import Verify from './pages/RewardVerify.jsx'
import { Navigation } from './components/Navigation.jsx'

// App entry point
export function App() {
	return (
		<PrivyProvider>
			<MemoryRouter
				initialEntries={['/profile']}
			>
				<Routes>
					<Route path="/" element={<Profile />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/wallets" element={<Wallets />} />
					<Route path="/products" element={<Products />} />
					<Route path="/reward/:id" element={<Event />} />
					<Route path="/reward/:id/verify" element={<Verify />} />
				</Routes>
				<Navigation />
				<WalletManager />
			</MemoryRouter>
		</PrivyProvider>
	)
}
