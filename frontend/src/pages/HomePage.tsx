import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function HomePage() {
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl">
					<view className="hero pad-xl">
						<view className="column center text-center">
							<h1>Your Digital Identity, Your Control</h1>
							<p className="hero-subtitle">
								Manage your product ownership with privacy using zero-knowledge proofs
							</p>
							<view className="row gap-md center" style={{ marginTop: '2rem' }}>
								<view className="button" bindtap={() => console.log('Get Started')}>
									<text>Get Started</text>
								</view>
								<view className="button secondary" bindtap={() => console.log('Learn More')}>
									<text>Learn More</text>
								</view>
							</view>
						</view>
					</view>
					
					<view className="section">
						<h2 className="section-title">How It Works</h2>
						<view className="row grid-3 gap-lg">
							<Card title="1. Create Your Digital Identity">
								<p>Establish a secure digital identity that puts you in control of your personal data.</p>
							</Card>
							
							<Card title="2. Import Your Products">
								<p>Scan QR codes or import digital passports to build your private collection.</p>
							</Card>
							
							<Card title="3. Access Rewards">
								<p>Generate zero-knowledge proofs to verify eligibility without revealing product details.</p>
							</Card>
						</view>
					</view>
					
					<view className="section">
						<h2 className="section-title">Featured Rewards</h2>
						<view className="row grid-3 gap-lg">
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<h3>Limited Edition NFT</h3>
								<p>For owners of luxury watches</p>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
							
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<h3>VIP Event Access</h3>
								<p>For early adopters of our product line</p>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
							
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<h3>Exclusive Discount</h3>
								<p>For owners of 3+ products</p>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
						</view>
					</view>
				</view>
			</view>
		</view>
	)
} 