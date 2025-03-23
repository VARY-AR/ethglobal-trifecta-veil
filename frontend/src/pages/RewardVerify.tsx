import { useState, useEffect } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { Button } from '$/components/Button.js'
import { Drawer } from '$/components/Drawer.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { ProgressBar } from '$/components/ProgressBar.js'
import { ScrollView } from '$/components/ScrollView.js'
import { events } from '$/data/mockData.js'
import proofImage from '$/assets/proof.png'
import '$/shared/layout.css'
import '$/shared/global.css'
import './RewardVerify.css'

export default () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const eventId = Number(id || 1)
	
	// Verification states
	const [verificationStep, setVerificationStep] = useState(0)
	const [isVerifying, setIsVerifying] = useState(false)
	const [isEligible, setIsEligible] = useState(true)
	const [verificationComplete, setVerificationComplete] = useState(false)
	const [showProofbaseDrawer, setShowProofbaseDrawer] = useState(false)
	
	// Find event by ID
	const event = events.find(e => e.id === eventId)
	
	if (!event) {
		return (
			<view className="event-not-found">
				<Header />
				<view className="container">
					<text className="error-message">Event not found</text>
					<Button bindtap={() => navigate('/')}>Back to Home</Button>
				</view>
			</view>
		)
	}
	
	// Handle verification steps
	useEffect(() => {
		if (isVerifying) {
			const stepInterval = setInterval(() => {
				if (verificationStep < 100) {
					setVerificationStep(prevStep => {
						const increment = Math.floor(Math.random() * 10) + 5
						const newStep = prevStep + increment
						return Math.min(newStep, 100)
					})
				} else {
					clearInterval(stepInterval)
					setIsVerifying(false)
					setVerificationComplete(true)
				}
			}, 500)
			
			return () => clearInterval(stepInterval)
		}
	}, [isVerifying, verificationStep])
	
	const startVerification = () => {
		setIsVerifying(true)
		setVerificationStep(0)
	}
	
	const mintReward = () => {
		navigate('/profile')
	}
	
	const openProofBaseDrawer = () => {
		setShowProofbaseDrawer(true)
	}
	
	return (
		<ScrollView>
			<Header backButton />
			
			<view className="event-verify-container">
				<view className="event-verify-header">
					<view className="event-verify-image">
						<text className="event-verify-title">{event.title}</text>
					</view>
				</view>
				
				<view className="container event-verify-content">
					<SectionTitle 
						title="VERIFY ELIGIBILITY"
					/>
					
					{!isVerifying && !verificationComplete && (
						<view className="verify-intro">
							<text className="verify-intro-text">
								To verify your eligibility for this event, we'll check your ownership records against the requirements.
							</text>
							
							<view className="requirements-section">
								<text className="requirements-title">REQUIREMENTS</text>
								<view className="requirements-list">
									{event.requirements.map((requirement, index) => (
										<view key={index} className="requirement-item">
											<text className="requirement-bullet">•</text>
											<text className="requirement-text">{requirement}</text>
										</view>
									))}
								</view>
							</view>
							
							<text className="privacy-note">
								Your data will remain private. We use zero-knowledge proofs to verify eligibility without revealing your specific product ownership details.
							</text>
							
							<view className="verify-button-container">
								<Button
									title="Start Verification"
									onPress={startVerification}
									primary
									fullWidth
								/>
							</view>
						</view>
					)}
					
					{isVerifying && (
						<view className="verify-progress">
							<text className="verify-progress-title">Verifying...</text>
							<ProgressBar progress={verificationStep} />
							<text className="verify-progress-text">
								{verificationStep < 30
									? 'Generating zero-knowledge proof...'
									: verificationStep < 60
									? 'Checking product ownership records...'
									: verificationStep < 90
									? 'Validating requirements...'
									: 'Finalizing verification...'}
							</text>
						</view>
					)}
					
					{verificationComplete && (
						<view className="verify-result">
							{isEligible ? (
								<view className="eligible-result">
									<view className="result-icon-successful">
										<text className="result-icon-text">✓</text>
									</view>
									<text className="result-title">You're Eligible!</text>
									<text className="result-description">
										Congratulations! You meet all the requirements for this event.
									</text>
									
									<view className="proof-section">
										<text className="proof-title">PROOF OF ELIGIBILITY</text>
										<view className="proof-card" bindtap={openProofBaseDrawer}>
											<image src={proofImage} className="proof-image" />
											<view className="proof-details">
												<text className="proof-id">Proof #{Math.floor(Math.random() * 10000)}</text>
												<text className="proof-date">Generated on {new Date().toLocaleDateString()}</text>
											</view>
										</view>
									</view>
									
									<view className="proof-note">
										<text className="proof-note-text">
											This zero-knowledge proof confirms your eligibility without revealing your specific ownership details.
										</text>
									</view>
									
									<Button
										title="Return to Profile"
										onPress={mintReward}
										primary
										fullWidth
									/>
								</view>
							) : (
								<view className="ineligible-result">
									<view className="result-icon-failed">
										<text className="result-icon-text">✗</text>
									</view>
									<text className="result-title">Not Eligible</text>
									<text className="result-description">
										Unfortunately, you don't meet all the requirements for this event.
									</text>
									
									<view className="missing-requirements">
										<text className="missing-title">MISSING REQUIREMENTS</text>
										<view className="missing-list">
											<view className="missing-item">
												<text className="missing-bullet">•</text>
												<text className="missing-text">You don't own enough products from the required brands</text>
											</view>
										</view>
									</view>
									
									<Button
										title="Back to Event"
										onPress={() => navigate(`/reward/${eventId}`)}
										fullWidth
									/>
								</view>
							)}
						</view>
					)}
				</view>
			</view>
			
			{/* ProofBase drawer */}
			<Drawer
				isOpen={showProofbaseDrawer}
				onClose={() => setShowProofbaseDrawer(false)}
				title="Zero-Knowledge Proof"
			>
				<view className="proof-drawer-content">
					<text className="proof-drawer-title">Privacy-Preserving Proof</text>
					<text className="proof-drawer-description">
						This cryptographic proof confirms your eligibility without revealing specific details about which products you own.
					</text>
					<text className="proof-drawer-code">
						zk-SNARKs verification hash:
						0x7f9e8d7c6b5a493827361554e3a2f1d0c9b8a7d6e5f4c3b2a1918273645
					</text>
				</view>
			</Drawer>
		</ScrollView>
	)
} 