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
						<img src={homeIcon} className="nav-icon" alt="Home" />
						<text className="nav-text">Home</text>
					</view>
					<view className={`nav-item ${currentRoute === '/wallet' ? 'active' : ''}`} bindtap={() => navigate('/wallet')}>
						<img src={walletIcon} className="nav-icon" alt="Wallet" />
						<text className="nav-text">Wallet</text>
					</view>
					<view className={`nav-item ${currentRoute === '/products' ? 'active' : ''}`} bindtap={() => navigate('/products')}>
						<img src={passportIcon} className="nav-icon" alt="Products" />
						<text className="nav-text">Products</text>
					</view>
					<view className={`nav-item ${currentRoute === '/rewards' ? 'active' : ''}`} bindtap={() => navigate('/rewards')}>
						<img src={exploreIcon} className="nav-icon" alt="Rewards" />
						<text className="nav-text">Rewards</text>
					</view>
					<view className={`nav-item ${currentRoute === '/profile' ? 'active' : ''}`} bindtap={() => navigate('/profile')}>
						<img src={profileIcon} className="nav-icon" alt="Profile" />
						<text className="nav-text">Profile</text>
					</view>
				</view>
			</view>
		</view>
	)
} 