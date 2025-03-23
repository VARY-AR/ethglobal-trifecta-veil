import { useState, useEffect } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { Button } from '$/components/Button.js'
import { Drawer } from '$/components/Drawer.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { ProgressBar } from '$/components/ProgressBar.js'
import { ScrollView } from '$/components/ScrollView.js'
import { useAppState } from '$/lib/AppStateProvider.js'
// import verifyCheck from '$/assets/verify-check.svg'
import proofImage from '$/assets/proof.png'
import proofGeneratingImage from '$/assets/proof-generating.png'
import admissionRequestingImage from '$/assets/admission-requesting.png'
import admissionGrantedImage from '$/assets/admission-granted.png'
import '$/shared/layout.css'
import '$/shared/global.css'
import './RewardVerify.css'

// Use the actual verification visuals
const VERIFICATION_VISUALS = {
	polyhedron: proofImage,
	sphere: proofGeneratingImage,
	grid: admissionRequestingImage,
	heart: admissionGrantedImage
}

export default () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { events, bounties, updateRewardStatus } = useAppState()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [verificationStage, setVerificationStage] = useState(0)
	const [verificationProgress, setVerificationProgress] = useState(0)
	
	// Find event or bounty by ID
	const event = events.find(e => e.id === Number(id))
	const bounty = bounties.find(b => b.id === id)
	
	const rewardType = event ? 'event' : bounty ? 'bounty' : null
	const reward = event || bounty
	
	// If reward not found, redirect to explore page
	useEffect(() => {
		if (!reward) {
			navigate('/')
		}
	}, [reward, navigate])
	
	// Mock proving steps to simulate verification process
	const PROVING_STEPS = [
		'Generating zero-knowledge proving circuit...',
		'Collecting verification parameters...',
		'Building proof...',
		'Verifying proof validity...',
		'Connecting to the verification server...',
		'Submitting zero-knowledge proof...',
		'Confirming user eligibility...',
		'Verification successful!'
	]
	
	// Update verification stage and progress
	useEffect(() => {
		let timer: any
		
		if (verificationStage === 1) {
			let currentStep = 0
			timer = setInterval(() => {
				if (currentStep < PROVING_STEPS.length - 1) {
					currentStep++
					setVerificationProgress(
						(currentStep / (PROVING_STEPS.length - 1)) * 100
					)
				} else {
					clearInterval(timer)
					setVerificationStage(2)
				}
			}, 500)
		} else if (verificationStage === 2) {
			// Add a delay before moving to admission granted stage
			timer = setTimeout(() => {
				setVerificationStage(3)
			}, 2000)
		}
		
		return () => {
			if (timer) {
				if (verificationStage === 1) clearInterval(timer)
				else clearTimeout(timer)
			}
		}
	}, [verificationStage])
	
	// Handle starting verification
	const startVerification = () => {
		setVerificationStage(1)
	}
	
	// Handle minting reward
	const mintReward = () => {
		// Update the reward status to claimed in app state
		if (rewardType === 'event') {
			updateRewardStatus(Number(id), 'event', 'claimed')
		} else if (rewardType === 'bounty') {
			updateRewardStatus(id as string, 'bounty', 'claimed')
		}
		// Navigate back to the reward page to see the ticket
		navigate(`/reward/${id}`)
	}
	
	// Handle opening proof base drawer
	const openProofBaseDrawer = () => {
		setIsDrawerOpen(true)
	}
	
	// Get reward requirements based on type
	const getRequirements = () => {
		if (rewardType === 'event') {
			return event!.requirements
		} else if (rewardType === 'bounty') {
			return bounty!.requirements.map(req => req.description)
		}
		return []
	}
	
	if (!reward) return null
	
	return (
		<ScrollView>
			<Header />

			<view class="column gap-lg">
				{/* Verification visualization */}
				<view className="RewardVerify__visual">
					{verificationStage === 0 && (
						<image className="RewardVerify__image" src={VERIFICATION_VISUALS.polyhedron} />
					)}
					{verificationStage === 1 && (
						<image className="RewardVerify__image" src={VERIFICATION_VISUALS.sphere} />
					)}
					{verificationStage === 2 && (
						<image className="RewardVerify__image" src={VERIFICATION_VISUALS.grid} />
					)}
					{(verificationStage === 3 || verificationStage === 4) && (
						<image className="RewardVerify__image" src={VERIFICATION_VISUALS.heart} />
					)}
				</view>
				
				{/* Verification steps */}
				<view className="RewardVerify__steps">
					{verificationStage === 0 && (
						<>
							<view className="RewardVerify__section">
								<SectionTitle
									title="YOUR PROOF"
								/>
								<view className="RewardVerify__requirements">
									{getRequirements().map((requirement, index) => (
										<view key={index} className="RewardVerify__requirement-item">
											<view className="RewardVerify__check">
												{/* <image 
													className="RewardVerify__check-icon" 
													src={verifyCheck} 
												/> */}
											</view>
											<text className="RewardVerify__requirement-text">{requirement}</text>
										</view>
									))}
								</view>
								
								<Button 
									fullWidth 
									variant="secondary" 
									className="RewardVerify__button" 
									bindtap={openProofBaseDrawer}
								>
									SEE PROOF BASE
								</Button>
							</view>

							<view className="RewardVerify__section">
								<SectionTitle
									title="YOUR ANONYMITY"
								/>
								
								<view className="RewardVerify__anonymity-info">
									<text className="RewardVerify__anonymity-title">The brand won't know</text>
									<view className="RewardVerify__anonymity-items">
										<text className="RewardVerify__anonymity-item">• your identity</text>
										<text className="RewardVerify__anonymity-item">• the product brands</text>
										<text className="RewardVerify__anonymity-item">• the product individual prices</text>
									</view>
								</view>
								
								<view className="RewardVerify__actions">
									<Button 
										variant="outline" 
										className="RewardVerify__action-button"
										bindtap={() => navigate(`/reward/${id}`)}
									>
										CANCEL
									</Button>
									<Button 
										variant="primary" 
										className="RewardVerify__action-button"
										bindtap={startVerification}
									>
										REQUEST
									</Button>
								</view>
							</view>
						</>
					)}
					
					{verificationStage >= 1 && verificationStage < 4 && (
						<view className="RewardVerify__verification-progress">
							<view className="RewardVerify__verification-status">
								<view className={`RewardVerify__verification-step ${verificationStage >= 1 ? 'RewardVerify__verification-step--active' : ''}`}>
									{/* <image 
										className="RewardVerify__step-icon" 
										src={verifyCheck} 
									/> */}
									<text className="RewardVerify__step-text">Generating ZK Proof</text>
								</view>
								<view className={`RewardVerify__verification-step ${verificationStage >= 2 ? 'RewardVerify__verification-step--active' : ''}`}>
									{/* <image 
										className="RewardVerify__step-icon" 
										src={verifyCheck} 
									/> */}
									<text className="RewardVerify__step-text">Requesting Admission</text>
								</view>
							</view>
							
							{verificationStage === 1 && (
								<ProgressBar progress={verificationProgress} />
							)}
							
							<text className="RewardVerify__verification-message">VEILING IN PROGRESS</text>
						</view>
					)}
					
					{verificationStage === 3 && (
						<view className="RewardVerify__verification-success">
							<text className="RewardVerify__verification-success-title">ADMISSION GRANTED</text>
							<Button 
								fullWidth 
								bindtap={mintReward}
							>
								MINT REWARD
							</Button>
						</view>
					)}

					<view></view>
				</view>
			</view>
			
			{/* Proof Base Drawer */}
			<Drawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				height="80%"
			>
				<view className="RewardVerify__proof-base-drawer">
					<text className="RewardVerify__proof-base-title">CLOSE</text>
					
					<text className="RewardVerify__proof-base-subtitle">YOUR PROOF IS BASED ON</text>
					
					<view className="RewardVerify__proof-passports">
						<view className="RewardVerify__proof-passport-item">
							<view className="RewardVerify__proof-passport-placeholder">
								<image className="RewardVerify__proof-passport-image" src={proofImage} />
							</view>
							<text className="RewardVerify__proof-passport-label">PRODUCT PASSPORT</text>
						</view>
						<view className="RewardVerify__proof-passport-item">
							<view className="RewardVerify__proof-passport-placeholder">
								<image className="RewardVerify__proof-passport-image" src={proofImage} />
							</view>
							<text className="RewardVerify__proof-passport-label">PURCHASE TIME STAMP</text>
						</view>
					</view>
				</view>
			</Drawer>
		</ScrollView>
	)
}
