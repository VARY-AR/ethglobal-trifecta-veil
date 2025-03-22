import { useNavigate, useLocation } from 'react-router'
import './Navigation.css'

export function Navigation() {
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