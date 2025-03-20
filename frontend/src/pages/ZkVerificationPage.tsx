import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

type ProofStatus = 'not-started' | 'generating' | 'ready' | 'verified' | 'failed'

export function ZkVerificationPage() {
	const [selectedVerification, setSelectedVerification] = useState<string | null>(null)
	const [proofStatus, setProofStatus] = useState<ProofStatus>('not-started')
	const [activeStep, setActiveStep] = useState(1)
	
	const verificationOptions = [
		{
			id: 'luxury-owner',
			title: 'Luxury Product Owner',
			description: 'Prove you own at least one luxury product without revealing which one.',
			requiredAttributes: ['Has 1+ luxury item'],
			brandRewards: 3,
		},
		{
			id: 'early-adopter',
			title: 'Early Adopter',
			description: 'Prove you purchased products within the first month of release.',
			requiredAttributes: ['Purchased within 30 days of release'],
			brandRewards: 5,
		},
		{
			id: 'multi-category',
			title: 'Multi-Category Collector',
			description: 'Prove you own products from at least 3 different categories.',
			requiredAttributes: ['Has products in 3+ categories'],
			brandRewards: 7,
		},
		{
			id: 'brand-loyal',
			title: 'Brand Loyalist',
			description: 'Prove you own 3+ products from the same brand.',
			requiredAttributes: ['Has 3+ products from same brand'],
			brandRewards: 4,
		},
	]
	
	const handleSelectVerification = (verificationId: string) => {
		setSelectedVerification(verificationId)
		setActiveStep(2)
	}
	
	const handleGenerateProof = () => {
		setProofStatus('generating')
		// Simulate proof generation with Noir (would be done via a circuit)
		setTimeout(() => {
			setProofStatus('ready')
			setActiveStep(3)
		}, 2000)
	}
	
	const handleVerifyProof = () => {
		// Simulate verification process
		setTimeout(() => {
			setProofStatus('verified')
			setActiveStep(4)
		}, 1500)
	}
	
	const handleNewProof = () => {
		setSelectedVerification(null)
		setProofStatus('not-started')
		setActiveStep(1)
	}
	
	const selectedOption = selectedVerification 
		? verificationOptions.find(opt => opt.id === selectedVerification) 
		: null
	
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl pad-lg">
					<h1>Zero-Knowledge Verification</h1>
					
					<view className="progress-indicator">
						<view className="row gap-md">
							<view className={`progress-step ${activeStep >= 1 ? 'active' : ''}`}>
								<text>1. Select Verification</text>
							</view>
							<view className={`progress-step ${activeStep >= 2 ? 'active' : ''}`}>
								<text>2. Generate Proof</text>
							</view>
							<view className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}>
								<text>3. Verify</text>
							</view>
							<view className={`progress-step ${activeStep >= 4 ? 'active' : ''}`}>
								<text>4. Success</text>
							</view>
						</view>
					</view>
					
					{activeStep === 1 && (
						<view className="column gap-lg">
							<h2>Select Verification Type</h2>
							<p>Choose what you'd like to verify without revealing your specific products.</p>
							
							<view className="verification-options column gap-md">
								{verificationOptions.map((option) => (
									<view key={option.id} bindtap={() => handleSelectVerification(option.id)}>
										<Card className={`verification-option ${selectedVerification === option.id ? 'selected' : ''}`}>
											<view className="row">
												<view className="column" style={{ flex: 1 }}>
													<h3>{option.title}</h3>
													<p>{option.description}</p>
													<view className="required-attributes">
														<text className="attribute-label">Required attributes:</text>
														{option.requiredAttributes.map((attr, i) => (
															<text key={i} className="attribute-item">{attr}</text>
														))}
													</view>
												</view>
												<view className="column center" style={{ flex: 0 }}>
													<view className="reward-indicator">
														<text>{option.brandRewards}</text>
														<text className="reward-label">rewards</text>
													</view>
												</view>
											</view>
										</Card>
									</view>
								))}
							</view>
						</view>
					)}
					
					{activeStep === 2 && selectedOption && (
						<Card>
							<view className="column gap-lg">
								<h2>Generate ZK Proof for {selectedOption.title}</h2>
								<p>
									You're about to generate a zero-knowledge proof that verifies
									you meet the criteria without revealing your specific products.
								</p>
								
								<view className="verification-details column gap-md">
									<view className="detail-item">
										<text className="detail-label">What you're proving:</text>
										<text className="detail-value">{selectedOption.description}</text>
									</view>
									
									<view className="detail-item">
										<text className="detail-label">Information being shared:</text>
										<text className="detail-value">Only that you satisfy the criteria, not which specific products you own</text>
									</view>
									
									<view className="detail-item">
										<text className="detail-label">What remains private:</text>
										<text className="detail-value">Your specific products, purchase dates, and personal details</text>
									</view>
								</view>
								
								<view className="button" bindtap={handleGenerateProof}>
									<text>{proofStatus === 'generating' ? 'Generating...' : 'Generate Proof'}</text>
								</view>
								
								{proofStatus === 'generating' && (
									<view className="proof-generation-indicator">
										<text>Generating zero-knowledge proof...</text>
									</view>
								)}
							</view>
						</Card>
					)}
					
					{activeStep === 3 && selectedOption && (
						<Card>
							<view className="column gap-lg">
								<h2>Proof Ready</h2>
								<p>Your zero-knowledge proof has been generated and is ready to be verified.</p>
								
								<view className="proof-visualization-placeholder">
									<text>Proof visualization would appear here</text>
								</view>
								
								<view className="proof-summary column gap-md">
									<text className="proof-header">Proof Summary:</text>
									<text>- Type: {selectedOption.title}</text>
									<text>- Generated: {new Date().toLocaleString()}</text>
									<text>- Valid until: {new Date(Date.now() + 86400000).toLocaleString()}</text>
								</view>
								
								<view className="button" bindtap={handleVerifyProof}>
									<text>Verify Proof</text>
								</view>
							</view>
						</Card>
					)}
					
					{activeStep === 4 && selectedOption && (
						<Card>
							<view className="column gap-lg center text-center">
								<view className="success-icon">✓</view>
								<h2>Verification Successful!</h2>
								<p>Your zero-knowledge proof has been verified without revealing your specific product information.</p>
								
								<view className="verified-summary">
									<text>You've proven: {selectedOption.title}</text>
									<text>Unlock {selectedOption.brandRewards} brand rewards</text>
								</view>
								
								<view className="row gap-md">
									<view className="button" bindtap={() => console.log('View rewards')}>
										<text>View Available Rewards</text>
									</view>
									<view className="button secondary" bindtap={handleNewProof}>
										<text>Create Another Proof</text>
									</view>
								</view>
							</view>
						</Card>
					)}
				</view>
			</view>
		</view>
	)
} 