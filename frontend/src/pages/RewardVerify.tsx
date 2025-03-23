import { useState, useEffect } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router'
import { Header } from '$/components/Header.js'
import { Button } from '$/components/Button.js'
import { Drawer } from '$/components/Drawer.js'
import { SectionTitle } from '$/components/SectionTitle.js'
import { ProgressBar } from '$/components/ProgressBar.js'
import { ScrollView } from '$/components/ScrollView.js'
import { events } from '$/data/mockData.js'
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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [verificationStage, setVerificationStage] = useState(0)
	const [verificationProgress, setVerificationProgress] = useState(0)
	
	// Find event by ID
	const event = events.find(e => e.id === Number(id))
	
	// If event not found, redirect to events page
	useEffect(() => {
		if (!event) {
			navigate('/')
		}
	}, [event, navigate])
	
	useEffect(() => {
		if (verificationStage === 1) {
			// Simulate verification process
			const interval = setInterval(() => {
				setVerificationProgress(prev => {
					if (prev >= 100) {
						clearInterval(interval)
						setTimeout(() => {
							setVerificationStage(2)
						}, 500)
						return 100
					}
					return prev + 5
				})
			}, 300)
			
			return () => clearInterval(interval)
		}
	}, [verificationStage])
	
	// When verification is complete, simulate request admission
	useEffect(() => {
		if (verificationStage === 2) {
			setTimeout(() => {
				setVerificationStage(3)
			}, 2000)
		}
	}, [verificationStage])
	
	// For the final success stage
	useEffect(() => {
		if (verificationStage === 3) {
			setTimeout(() => {
				setVerificationStage(4)
			}, 2000)
		}
	}, [verificationStage])
	
	// Handle starting verification
	const startVerification = () => {
		setVerificationStage(1)
	}
	
	// Handle minting reward
	const mintReward = () => {
		navigate('/')
	}
	
	// Handle opening proof base drawer
	const openProofBaseDrawer = () => {
		setIsDrawerOpen(true)
	}
	
	if (!event) return null
	
	return (
		<ScrollView>
			<Header />
			
			<view class="column gap-lg">
				{/* Verification visualization */}
				<view className="verify-visual">
					{verificationStage === 0 && (
						<image className="verify-image" src={VERIFICATION_VISUALS.polyhedron} />
					)}
					{verificationStage === 1 && (
						<image className="verify-image" src={VERIFICATION_VISUALS.sphere} />
					)}
					{verificationStage === 2 && (
						<image className="verify-image" src={VERIFICATION_VISUALS.grid} />
					)}
					{(verificationStage === 3 || verificationStage === 4) && (
						<image className="verify-image" src={VERIFICATION_VISUALS.heart} />
					)}
				</view>
				
				{/* Verification steps */}
				<view className="verify-steps">
					{verificationStage === 0 && (
						<>
							<view className="verify-section">
								<SectionTitle
									title="YOUR PROOF"
								/>
								<view className="verify-requirements">
									{event.requirements.map((requirement, index) => (
										<view key={index} className="verify-requirement-item">
											<view className="verify-check">
												{/* <image 
													className="verify-check-icon" 
													src={verifyCheck} 
												/> */}
											</view>
											<text className="verify-requirement-text">{requirement}</text>
										</view>
									))}
								</view>
								
								<Button 
									fullWidth 
									variant="secondary" 
									className="verify-button" 
									bindtap={openProofBaseDrawer}
								>
									SEE PROOF BASE
								</Button>
							</view>

							<view className="verify-section">
								<SectionTitle
									title="YOUR ANONYMITY"
								/>
								
								<view className="anonymity-info">
									<text className="anonymity-title">The brand won't know</text>
									<view className="anonymity-items">
										<text className="anonymity-item">• your identity</text>
										<text className="anonymity-item">• the product brands</text>
										<text className="anonymity-item">• the product individual prices</text>
									</view>
								</view>
								
								<view className="verify-actions">
									<Button 
										variant="outline" 
										className="verify-action-button"
										bindtap={() => navigate(`/event/${id}`)}
									>
										CANCEL
									</Button>
									<Button 
										variant="primary" 
										className="verify-action-button"
										bindtap={startVerification}
									>
										REQUEST
									</Button>
								</view>
							</view>
						</>
					)}
					
					{verificationStage >= 1 && verificationStage < 4 && (
						<view className="verification-progress">
							<view className="verification-status">
								<view className={`verification-step ${verificationStage >= 1 ? 'active' : ''}`}>
									{/* <image 
										className="verify-step-icon" 
										src={verifyCheck} 
									/> */}
									<text className="verify-step-text">Generating ZK Proof</text>
								</view>
								<view className={`verification-step ${verificationStage >= 2 ? 'active' : ''}`}>
									{/* <image 
										className="verify-step-icon" 
										src={verifyCheck} 
									/> */}
									<text className="verify-step-text">Requesting Admission</text>
								</view>
							</view>
							
							{verificationStage === 1 && (
								<ProgressBar progress={verificationProgress} />
							)}
							
							<text className="verification-message">VEILING IN PROGRESS</text>
						</view>
					)}
					
					{verificationStage === 4 && (
						<view className="verification-success">
							<text className="verification-success-title">ADMISSION GRANTED</text>
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
				<view className="proof-base-drawer">
					<text className="proof-base-title">CLOSE</text>
					
					<text className="proof-base-subtitle">YOUR PROOF IS BASED ON</text>
					
					<view className="proof-passports">
						<view className="proof-passport-item">
							<view className="proof-passport-placeholder">
								<image className="proof-passport-image" src={proofImage} />
							</view>
							<text className="proof-passport-label">PRODUCT PASSPORT</text>
						</view>
						<view className="proof-passport-item">
							<view className="proof-passport-placeholder">
								<image className="proof-passport-image" src={proofGeneratingImage} />
							</view>
							<text className="proof-passport-label">PRODUCT PASSPORT</text>
						</view>
						<view className="proof-passport-item">
							<view className="proof-passport-placeholder">
								<image className="proof-passport-image" src={admissionRequestingImage} />
							</view>
							<text className="proof-passport-label">PRODUCT PASSPORT</text>
						</view>
						<view className="proof-passport-item">
							<view className="proof-passport-placeholder">
								<image className="proof-passport-image" src={admissionGrantedImage} />
							</view>
							<text className="proof-passport-label">PRODUCT PASSPORT</text>
						</view>
					</view>
				</view>
			</Drawer>
		</ScrollView>
	)
}
