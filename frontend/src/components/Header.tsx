import { useState } from '@lynx-js/react'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Header.css'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}
	
	const handleConnectWallet = () => {
		console.log('Connect wallet clicked')
	}
	
	return (
		<view className="header">
			<view className="container">
				<view className="row">
					<view className="header-logo">
						<text className="logo">Veil</text>
					</view>
					
					<view className="header-nav">
						<view className="row gap-lg">
							<text className="nav-item">Home</text>
							<text className="nav-item">My Products</text>
							<text className="nav-item">Rewards</text>
							<text className="nav-item">Wallet</text>
						</view>
					</view>
					
					<view className="header-actions">
						<view className="button" bindtap={handleConnectWallet}>
							<text>Connect Wallet</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	)
} 