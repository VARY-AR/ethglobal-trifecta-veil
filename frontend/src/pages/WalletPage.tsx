import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import { ScrollView } from '$/components/ScrollView.js'
import { walletTokens, transactionHistory } from '$/data/mockData.js'
import chevronIcon from '$/assets/chevron-right.webp'
import verifyIcon from '$/assets/verify-check.svg'
import '$/shared/layout.css'
import '$/shared/global.css'
import './WalletPage.css'

export function WalletPage() {
	const [activeTab, setActiveTab] = useState('tokens')
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<text className="h1">My Wallet</text>
				
				<view className="wallet-summary">
					<view className="card p-md">
						<view className="wallet-data">
							<view className="wallet-data-item">
								<text className="wallet-data-label">Total Items</text>
								<text className="wallet-data-value">{walletTokens.length}</text>
							</view>
							<view className="wallet-data-item">
								<text className="wallet-data-label">Brands</text>
								<text className="wallet-data-value">4</text>
							</view>
							<view className="wallet-data-item">
								<text className="wallet-data-label">Value (USD)</text>
								<text className="wallet-data-value">$5,280</text>
							</view>
						</view>
					</view>
				</view>
				
				<view className="tab-navigation">
					<view 
						className={`tab-item ${activeTab === 'tokens' ? 'active' : ''}`}
						bindtap={() => setActiveTab('tokens')}
					>
						<text>Product Tokens</text>
					</view>
					<view 
						className={`tab-item ${activeTab === 'history' ? 'active' : ''}`}
						bindtap={() => setActiveTab('history')}
					>
						<text>History</text>
					</view>
				</view>
				
				{activeTab === 'tokens' && (
					<view className="tokens-list">
						{walletTokens.map(token => (
							<Card key={token.id} className="token-card">
								<view className="token-content">
									<view className="token-header">
										<text className="token-name">{token.name}</text>
										{token.verified && (
											<image src={verifyIcon} className="verify-icon" />
										)}
									</view>
									<text className="token-brand">{token.brand}</text>
									<text className="token-detail">Acquired: {token.acquired}</text>
									<text className="token-detail">Token ID: {token.tokenId}</text>
								</view>
								<image className="card-icon" src={chevronIcon} />
							</Card>
						))}
					</view>
				)}
				
				{activeTab === 'history' && (
					<view className="history-list">
						{transactionHistory.map(transaction => (
							<Card key={transaction.id} className="history-card">
								<view className="history-content">
									<text className="history-date">{transaction.date}</text>
									<text className="history-type">{transaction.type}</text>
									<text className="history-detail">{transaction.detail}</text>
								</view>
								<view className={`status-badge ${transaction.status.toLowerCase()}`}>
									<text>{transaction.status}</text>
								</view>
							</Card>
						))}
					</view>
				)}
			</view>
		</ScrollView>
	)
} 