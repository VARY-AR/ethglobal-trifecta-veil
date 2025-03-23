import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import '$/shared/layout.css'
import '$/shared/global.css'

// Possible states for the proof generation process
type ProofStatus = 'not-started' | 'generating' | 'ready' | 'verified'

export function ZkVerificationPage() {
	const [selectedVerification, setSelectedVerification] = useState<string | null>(null)
	const [proofStatus, setProofStatus] = useState<ProofStatus>('not-started')
	const [activeStep, setActiveStep] = useState(1)
	
	// Available verification options
	const verificationOptions = [
		{
			id: 'luxury-owner',
			title: 'Luxury Brand Owner',
			description: 'Prove you own products from luxury brands without revealing specific items',
			requiredAttributes: ['Own at least 2 items from luxury brands'],
			brandRewards: 'Access to exclusive events & limited editions'
		},
		{
			id: 'early-adopter',
			title: 'Early Adopter',
			description: 'Verify you purchased products within 30 days of release',
			requiredAttributes: ['Own at least 3 items purchased within 30 days of release'],
			brandRewards: 'Early access to new collections'
		},
		{
			id: 'collection-diversity',
			title: 'Collection Diversity',
			description: 'Prove you own products across multiple categories',
			requiredAttributes: ['Own items from at least 3 different product categories'],
			brandRewards: 'Personalized recommendations & discounts'
		}
	]
	
	// Find selected verification option
	const selectedOption = verificationOptions.find(option => option.id === selectedVerification) || verificationOptions[0]
	
	// Handle selecting a verification type
	const handleSelectVerification = (id: string) => {
		setSelectedVerification(id)
		setActiveStep(2)
	}
	
	// Generate a ZK proof
	const handleGenerateProof = () => {
		console.log('Generating proof for:', selectedOption.title)
		setProofStatus('generating')
		
		// Simulate proof generation
		setTimeout(() => {
			setProofStatus('ready')
			setActiveStep(3)
		}, 2000)
	}
	
	// Verify a proof
	const handleVerifyProof = () => {
		console.log('Verifying proof for:', selectedOption.title)
		
		// Simulate verification
		setTimeout(() => {
			setProofStatus('verified')
			setActiveStep(4)
		}, 1500)
	}
	
	// Reset proof generation
	const handleNewProof = () => {
		setSelectedVerification(null)
		setProofStatus('not-started')
		setActiveStep(1)
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<text className="h1">Zero-Knowledge Verification</text>
				
				{/* Progress indicator */}
				<view className="progress-indicator">
					<view className="steps-grid">
						<view className={`progress-step ${activeStep >= 1 ? 'active' : ''}`}>
							<text>1. Select Type</text>
						</view>
						<view className={`progress-step ${activeStep >= 2 ? 'active' : ''}`}>
							<text>2. Generate Proof</text>
						</view>
						<view className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}>
							<text>3. Verify</text>
						</view>
						<view className={`progress-step ${activeStep >= 4 ? 'active' : ''}`}>
							<text>4. Complete</text>
						</view>
					</view>
				</view>
				
				{/* Step 1: Select verification type */}
				{activeStep === 1 && (
					<view className="section">
						<text className="h2">Select Verification Type</text>
						<text className="p">Choose what you'd like to verify without revealing your specific products.</text>
						
						<view className="row-1">
							{verificationOptions.map(option => (
								<view key={option.id} bindtap={() => handleSelectVerification(option.id)}>
									<view className={`card verification-option ${selectedVerification === option.id ? 'selected' : ''}`}>
										<text className="h3">{option.title}</text>
										<text className="p">{option.description}</text>
										
										<view className="row">
											<view className="column">
												<text className="text-success">✓ Requirements:</text>
												<text>{option.requiredAttributes}</text>
											</view>
											
											<view className="column">
												<text>Rewards:</text>
												<view className="reward-indicator">
													<text className="reward-label">{option.brandRewards}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
							))}
						</view>
					</view>
				)}
				
				{/* Step 2: Generate proof */}
				{activeStep === 2 && (
					<view className="section">
						<text className="h2">Generate ZK Proof for {selectedOption.title}</text>
						<text className="p">
							This will create a zero-knowledge proof that verifies your ownership
							attributes without revealing your specific products.
						</text>
						
						<view className="card">
							<view className="form-group">
								<text>Required Attributes:</text>
								<text>{selectedOption.requiredAttributes}</text>
							</view>
							
							<view className="form-group">
								<text>Potential Rewards:</text>
								<text>{selectedOption.brandRewards}</text>
							</view>
							
							{proofStatus === 'generating' ? (
								<text>Generating proof...</text>
							) : (
								<view className="button" bindtap={handleGenerateProof}>
									<text>Generate Proof</text>
								</view>
							)}
						</view>
					</view>
				)}
				
				{/* Step 3: Proof ready */}
				{activeStep === 3 && (
					<view className="section">
						<text className="h2">Proof Ready</text>
						<text className="p">Your zero-knowledge proof has been generated and is ready to be verified.</text>
						
						<view className="card">
							<view className="form-group">
								<text>Proof Type:</text>
								<text>{selectedOption.title}</text>
							</view>
							
							<view className="form-group">
								<text>Verification For:</text>
								<text>Collection Attributes</text>
							</view>
							
							<view className="proof-visualization-placeholder">
								<text>ZK Proof Visualization</text>
							</view>
							
							<view className="button" bindtap={handleVerifyProof}>
								<text>Verify Proof</text>
							</view>
						</view>
					</view>
				)}
				
				{/* Step 4: Verification complete */}
				{activeStep === 4 && (
					<view className="section text-center">
						<view className="success-icon">✓</view>
						<text className="h2">Verification Successful!</text>
						<text className="p">Your zero-knowledge proof has been verified without revealing your specific product information.</text>
						
						<view className="card">
							<text className="h3">You've Unlocked:</text>
							<text>{selectedOption.brandRewards}</text>
							
							<view className="row gap-md justify-center">
								<view className="button" bindtap={() => console.log('View rewards')}>
									<text>View Rewards</text>
								</view>
								<view className="button secondary" bindtap={handleNewProof}>
									<text>Create New Proof</text>
								</view>
							</view>
						</view>
					</view>
				)}
			</view>
		</ScrollView>
	)
} 