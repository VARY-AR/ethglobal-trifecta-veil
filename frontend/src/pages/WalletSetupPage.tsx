import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function WalletSetupPage() {
	const [currentStep, setCurrentStep] = useState(1)
	const [walletConnected, setWalletConnected] = useState(false)
	const [identity, setIdentity] = useState({
		name: '',
		email: '',
		profileImageSet: false,
	})
	
	const handleConnectWallet = () => {
		console.log('Connecting wallet...')
		// Simulate wallet connection
		setTimeout(() => {
			setWalletConnected(true)
			setCurrentStep(2)
		}, 1000)
	}
	
	const handleCreateIdentity = () => {
		console.log('Creating identity...')
		// Simulate identity creation
		setTimeout(() => {
			setIdentity({
				name: 'John Doe',
				email: 'john@example.com',
				profileImageSet: true,
			})
			setCurrentStep(3)
		}, 1000)
	}
	
	const handleImportWallet = () => {
		console.log('Import existing wallet')
		// Implement wallet import logic
	}
	
	const handlePrivacySettings = () => {
		console.log('Set privacy preferences')
		// In a real app, this would save privacy settings
		setCurrentStep(4)
	}
	
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl pad-lg">
					<h1>Set Up Your Digital Identity</h1>
					
					<view className="progress-indicator">
						<view className="row gap-md">
							<view className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
								<text>1. Connect Wallet</text>
							</view>
							<view className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
								<text>2. Create Identity</text>
							</view>
							<view className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
								<text>3. Privacy Settings</text>
							</view>
							<view className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
								<text>4. Complete</text>
							</view>
						</view>
					</view>
					
					{currentStep === 1 && (
						<Card>
							<view className="column gap-lg">
								<h2>Connect Your Wallet</h2>
								<p>Connect a digital wallet to securely store your product tokens and manage your digital identity.</p>
								
								<view className="row gap-md">
									<view className="button" bindtap={handleConnectWallet}>
										<text>Connect Wallet</text>
									</view>
									<view className="button secondary" bindtap={handleImportWallet}>
										<text>Import Existing Wallet</text>
									</view>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 2 && (
						<Card>
							<view className="column gap-lg">
								<h2>Create Your Digital Identity</h2>
								<p>Your digital identity keeps your product ownership private while enabling you to prove attributes when needed.</p>
								
								<view className="form-group">
									<text>Display Name</text>
									<input type="text" placeholder="Enter your name" />
								</view>
								
								<view className="form-group">
									<text>Email (optional)</text>
									<input type="email" placeholder="Enter your email" />
								</view>
								
								<view className="form-group">
									<text>Profile Image (optional)</text>
									<view className="profile-upload-placeholder" />
								</view>
								
								<view className="button" bindtap={handleCreateIdentity}>
									<text>Create Identity</text>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 3 && (
						<Card>
							<view className="column gap-lg">
								<h2>Privacy Settings</h2>
								<p>Control which attributes of your identity are shared with brands.</p>
								
								<view className="privacy-setting">
									<view className="row gap-sm">
										<input type="checkbox" id="share-name" />
										<text>Share my display name with verified brands</text>
									</view>
								</view>
								
								<view className="privacy-setting">
									<view className="row gap-sm">
										<input type="checkbox" id="share-email" />
										<text>Share my email with verified brands</text>
									</view>
								</view>
								
								<view className="privacy-setting">
									<view className="row gap-sm">
										<input type="checkbox" id="share-products" />
										<text>Share my product categories (not specific items)</text>
									</view>
								</view>
								
								<view className="button" bindtap={handlePrivacySettings}>
									<text>Save Privacy Settings</text>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 4 && (
						<Card>
							<view className="column gap-lg center text-center">
								<h2>Setup Complete!</h2>
								<p>Your digital identity and wallet are ready to use. You can now start adding products to your collection.</p>
								
								<view className="button" bindtap={() => console.log('Go to dashboard')}>
									<text>Go to Dashboard</text>
								</view>
							</view>
						</Card>
					)}
				</view>
			</view>
		</view>
	)
} 