import { useNavigate, useLocation } from 'react-router'
import './Navigation.css'

// Import navigation icons
import homeIcon from '../assets/nav-home.png'
import walletIcon from '../assets/nav-wallet.png'
import passportIcon from '../assets/nav-passport.png'
import exploreIcon from '../assets/nav-explore.png'
import profileIcon from '../assets/nav-profile.png'

export function Navigation() {
	const navigate = useNavigate()
	const location = useLocation()
	const currentRoute = location.pathname
	
	return (
		<view className="nav-bar">
			<view className="container">
				<view className="row">
					<view className={`nav-item ${currentRoute === '/' ? 'active' : ''}`} bindtap={() => navigate('/')}>
						<image src={homeIcon} className="nav-icon" />
						<text className="nav-text">Home</text>
					</view>
					<view className={`nav-item ${currentRoute === '/wallet' ? 'active' : ''}`} bindtap={() => navigate('/wallet')}>
						<image src={walletIcon} className="nav-icon" />
						<text className="nav-text">Wallet</text>
					</view>
					<view className={`nav-item ${currentRoute === '/products' ? 'active' : ''}`} bindtap={() => navigate('/products')}>
						<image src={passportIcon} className="nav-icon" />
						<text className="nav-text">Products</text>
					</view>
					<view className={`nav-item ${currentRoute === '/rewards' ? 'active' : ''}`} bindtap={() => navigate('/rewards')}>
						<image src={exploreIcon} className="nav-icon" />
						<text className="nav-text">Rewards</text>
					</view>
					<view className={`nav-item ${currentRoute === '/profile' ? 'active' : ''}`} bindtap={() => navigate('/profile')}>
						<image src={profileIcon} className="nav-icon" />
						<text className="nav-text">Profile</text>
					</view>
				</view>
			</view>
		</view>
	)
}
