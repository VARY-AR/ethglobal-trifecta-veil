import { useNavigate, useLocation } from 'react-router'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Header.css'
import { Button } from './Button.js'
import walletIcon from '../assets/nav-wallet.png'

export function Header() {
	const navigate = useNavigate()
	const location = useLocation()
	
	const openWalletManager = () => {
		navigate(`${location.pathname}#wallet`)
	}
	
	return (
		<view className="Header">
			<view className="container">
				<view></view>

				<view className="Header__logo">
					<text className="Header__logo-text">VEIL</text>
				</view>
				
				<view className="Header__actions">
					<Button 
						variant="transparent"
						bindtap={openWalletManager}
						aria-label="Open wallet"
					>
						<image src={walletIcon} className="Header__wallet-icon" />
					</Button>
				</view>
			</view>
		</view>
	)
} 