import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function WalletSetupPage() {
	const [step, setStep] = useState(1)
	const [walletConnected, setWalletConnected] = useState(false)
	const [identityCreated, setIdentityCreated] = useState(false)
	const [privacySet, setPrivacySet] = useState(false)
	
	const handleConnectWallet = () => {
		console.log('Connecting wallet...')
		setWalletConnected(true)
		setStep(2)
	}
	
	const handleImportWallet = () => {
		console.log('Importing wallet...')
		setWalletConnected(true)
		setStep(2)
	}
	
	const handleCreateIdentity = () => {
		console.log('Creating digital identity...')
		setIdentityCreated(true)
		setStep(3)
	}
	
	const handlePrivacySettings = () => {
		console.log('Setting privacy preferences...')
		setPrivacySet(true)
		setStep(4)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<text className="h1">Set Up Your Digital Identity</text>
				
				{/* Progress indicator */}
				<view className="progress-indicator">
					<view className="row gap-sm">
						<view className={`progress-step ${step >= 1 ? 'active' : ''}`}>
							<text>1. Connect Wallet</text>
						</view>
						<view className={`progress-step ${step >= 2 ? 'active' : ''}`}>
							<text>2. Create Identity</text>
						</view>
						<view className={`progress-step ${step >= 3 ? 'active' : ''}`}>
							<text>3. Privacy Settings</text>
						</view>
						<view className={`progress-step ${step >= 4 ? 'active' : ''}`}>
							<text>4. Complete</text>
						</view>
					</view>
				</view>
				
				{/* Step 1: Connect Wallet */}
				{step === 1 && (
					<view className="section">
						<text className="h2">Connect Your Wallet</text>
						<text className="p">Connect a digital wallet to securely store your product tokens and manage your digital identity.</text>
						
						<view className="card p-md">
							<view className="row gap-md">
								<view className="button" bindtap={handleConnectWallet}>
									<text>Connect Wallet</text>
								</view>
								<view className="button secondary" bindtap={handleImportWallet}>
									<text>Import Existing Wallet</text>
								</view>
							</view>
						</view>
					</view>
				)}
				
				{/* Step 2: Create Digital Identity */}
				{step === 2 && (
					<view className="section">
						<text className="h2">Create Your Digital Identity</text>
						<text className="p">Your digital identity keeps your product ownership private while enabling you to prove attributes when needed.</text>
						
						<view className="card p-md">
							<view className="row">
								<view className="column">
									<view className="form-group">
										<text>Identity Name (Optional)</text>
										<input placeholder="e.g., My Fashion Collection" />
									</view>
									
									<view className="form-group">
										<text>Privacy Level</text>
										<select>
											<option value="high">High Privacy (Default)</option>
											<option value="medium">Medium Privacy</option>
											<option value="low">Low Privacy</option>
										</select>
									</view>
								</view>
							</view>
							
							<view className="button" bindtap={handleCreateIdentity}>
								<text>Create Digital Identity</text>
							</view>
						</view>
					</view>
				)}
				
				{/* Step 3: Privacy Settings */}
				{step === 3 && (
					<view className="section">
						<text className="h2">Privacy Settings</text>
						<text className="p">Control which attributes of your identity are shared with brands.</text>
						
						<view className="card p-md">
							<view className="form-group">
								<text>Share Purchase History</text>
								<select>
									<option value="none">Never</option>
									<option value="limited">Limited (Brand Only)</option>
									<option value="full">Full (With ZK Proof)</option>
								</select>
							</view>
							
							<view className="form-group">
								<text>Share Product Categories</text>
								<select>
									<option value="none">Never</option>
									<option value="aggregated">Aggregated Only</option>
									<option value="full">Full (With ZK Proof)</option>
								</select>
							</view>
							
							<view className="button" bindtap={handlePrivacySettings}>
								<text>Save Privacy Settings</text>
							</view>
						</view>
					</view>
				)}
				
				{/* Step 4: Complete */}
				{step === 4 && (
					<view className="section text-center">
						<view className="success-icon">✓</view>
						<text className="h2">Setup Complete!</text>
						<text className="p">Your digital identity and wallet are ready to use. You can now start adding products to your collection.</text>
						
						<view className="button" bindtap={() => console.log('Go to dashboard')}>
							<text>Go to Product Dashboard</text>
						</view>
					</view>
				)}
			</view>
		</ScrollView>
	)
} 