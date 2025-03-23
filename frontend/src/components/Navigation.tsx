import { useNavigate, useLocation } from 'react-router'
import './Navigation.css'

// Import navigation icons
import homeIcon from '../assets/nav-home.png'
import exploreIcon from '../assets/nav-explore.png'
import passportIcon from '../assets/nav-passport.png'
import profileIcon from '../assets/nav-profile.png'

export function Navigation() {
	const navigate = useNavigate()
	const location = useLocation()
	const currentRoute = location.pathname

	const navItems = [
		{ path: '/profile', label: 'Profile', icon: profileIcon },
		{ path: '/explore', label: 'Explore', icon: exploreIcon },
		{ path: '/products', label: 'Products', icon: passportIcon },
	]
	
	return (
		<view className="nav-bar">
			{navItems.map(item => (
				<view 
					key={item.path}
					className={`nav-item ${currentRoute === item.path ? 'active' : ''}`} 
					bindtap={() => navigate(item.path)}
				>
					<image src={item.icon} className="nav-icon" />
					<text className="nav-text">{item.label}</text>
				</view>
			))}
		</view>
	)
}
