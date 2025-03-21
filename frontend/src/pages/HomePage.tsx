import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import { ScrollView } from '$/components/ScrollView.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function HomePage() {
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<view className="column gap-xl">
					<view className="hero text-center">
						<view className="container">
							<text className="h1">Your Digital Identity, Your Control</text>
							<text className="hero-subtitle">
								Prove what you own without revealing private details using zero-knowledge verification.
								Collect rewards and access exclusive experiences.
							</text>
							
							<view className="row gap-md justify-center">
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
						<text className="h2 section-title text-center">How It Works</text>
						<view className="row-3 gap-lg">
							<Card title="1. Create Your Digital Identity">
								<text className="p">Establish a secure digital identity that puts you in control of your personal data.</text>
							</Card>
							
							<Card title="2. Import Your Products">
								<text className="p">Scan QR codes or import digital passports to build your private collection.</text>
							</Card>
							
							<Card title="3. Access Rewards">
								<text className="p">Generate zero-knowledge proofs to verify eligibility without revealing product details.</text>
							</Card>
						</view>
					</view>
					
					<view className="section">
						<text className="h2 section-title text-center">Featured Rewards</text>
						<view className="row-3 gap-lg">
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<text className="h3">Limited Edition NFT</text>
								<text className="p">For owners of luxury watches</text>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
							
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<text className="h3">VIP Event Access</text>
								<text className="p">For early adopters of our product line</text>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
							
							<Card className="reward-card">
								<view className="reward-image placeholder" />
								<text className="h3">Exclusive Discount</text>
								<text className="p">For owners of 3+ products</text>
								<view className="button" bindtap={() => console.log('Claim')}>
									<text>Claim with ZK Proof</text>
								</view>
							</Card>
						</view>
					</view>
				</view>
			</view>
		</ScrollView>
	)
} 