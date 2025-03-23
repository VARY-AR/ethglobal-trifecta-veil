import { useNavigate, useLocation } from 'react-router'
import './WalletManager.css'
import { Drawer } from './Drawer.js'
import { Button } from './Button.js'

// Import custom Privy hooks
import { 
	usePrivyAuth, 
	usePrivyWallets, 
	usePrivyTransactions
} from '../lib/privy.js'
import type { Wallet } from '../lib/privy.js'

export function WalletManager() {
	const navigate = useNavigate()
	const location = useLocation()
	const isOpen = location.hash === '#wallet'
	
	const closeDrawer = () => {
		navigate(location.pathname)
	}
	
	// Use Privy hooks
	const { 
		state: authState,
		createGuestAccount 
	} = usePrivyAuth()
	
	const { 
		state: walletState
	} = usePrivyWallets()
	
	// Combine loading states
	const isLoading = authState.isLoading || walletState.isLoading
	
	// Embedded wallet section
	const embeddedWallet = {
		name: 'VEIL',
		description: 'Embedded Wallet via Privy',
		items: 19
	}
	
	// Handler for wallet connection
	const handleConnectExternalWallet = () => {
		// This would connect to an external wallet using Privy
		console.log('Connecting external wallet')
	}
	
	return (
		<Drawer 
			isOpen={isOpen} 
			onClose={closeDrawer}
			height="90%"
		>
			<view className="WalletManager">
				<view className="WalletManager__header">
					<text className="WalletManager__close-button" bindtap={closeDrawer}>CLOSE</text>
				</view>
				
				<view className="WalletManager__title">
					<text className="h2">YOUR WALLETS</text>
				</view>
				
				<scroll-view
					scroll-orientation="vertical"
				>
					<view className="WalletManager__list">
						{/* Embedded wallet button */}
						<view className="WalletManager__option" bindtap={() => navigate('/wallets')}>
							<view className="WalletManager__icon">
								<text>🔒</text>
							</view>
							<view className="WalletManager__details">
								<text className="WalletManager__wallet-name">{embeddedWallet.name}</text>
								<text className="WalletManager__wallet-description">{embeddedWallet.description}</text>
							</view>
							<view className="WalletManager__items">
								<text>{embeddedWallet.items} items</text>
							</view>
						</view>
						
						{/* Connect external wallet button */}
						<view className="WalletManager__option" bindtap={handleConnectExternalWallet}>
							<view className="WalletManager__icon">
								<text>🔗</text>
							</view>
							<view className="WalletManager__details">
								<text className="WalletManager__wallet-name">CONNECT EXT WALLET</text>
								<text className="WalletManager__wallet-description">via Privy</text>
							</view>
						</view>
						
						{/* Guest account button (if not authenticated) */}
						{!authState.isAuthenticated && (
							<Button 
								variant="primary"
								fullWidth
								bindtap={createGuestAccount}
								disabled={isLoading}
							>
								Get started with a guest account
							</Button>
						)}
					</view>
				</scroll-view>
			</view>
		</Drawer>
	)
} 