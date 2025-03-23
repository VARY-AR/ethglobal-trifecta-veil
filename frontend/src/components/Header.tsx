import { useNavigate, useLocation } from 'react-router'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Header.css'
import './Wallet.css'
import { Button } from './Button.js'
import walletIcon from '../assets/nav-wallet.png'

export function Header() {
	const navigate = useNavigate()
	const location = useLocation()
	
	const openWalletDrawer = () => {
		navigate(`${location.pathname}#wallet`)
	}
	
	return (
		<view className="header">
			<view className="container">
				<view></view>

				<view className="header-logo">
					<text className="logo">VEIL</text>
				</view>
				
				<view className="header-actions">
					<Button 
						className="wallet-button"
						bindtap={openWalletDrawer}
						aria-label="Open wallet"
					>
						<image src={walletIcon} className="wallet-icon" />
					</Button>
				</view>
			</view>
		</view>
	)
} 