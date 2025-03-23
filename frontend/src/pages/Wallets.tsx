import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import { ScrollView } from '$/components/ScrollView.js'
import { walletTokens, transactionHistory } from '$/data/mockData.js'
import chevronIcon from '$/assets/chevron-right.webp'
import verifyIcon from '$/assets/verify-check.svg'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Wallets.css'

export default () => {
	const [activeTab, setActiveTab] = useState('tokens')
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container wallets-container">
				<view className="tabs">
					<view 
						className={`tab ${activeTab === 'tokens' ? 'active' : ''}`}
						bindtap={() => setActiveTab('tokens')}
					>
						<text>Your Tokens</text>
					</view>
					<view 
						className={`tab ${activeTab === 'history' ? 'active' : ''}`}
						bindtap={() => setActiveTab('history')}
					>
						<text>Transaction History</text>
					</view>
				</view>
				
				{activeTab === 'tokens' && (
					<view className="wallet-tokens">
						{walletTokens.map(token => (
							<Card key={token.id} className="token-card">
								<view className="token-header">
									<text className="token-name">{token.name}</text>
									{token.verified && (
										<image src={verifyIcon} className="verified-icon" />
									)}
								</view>
								
								<view className="token-details">
									<view className="token-detail">
										<text className="detail-label">Brand</text>
										<text className="detail-value">{token.brand}</text>
									</view>
									
									<view className="token-detail">
										<text className="detail-label">Acquired</text>
										<text className="detail-value">{new Date(token.acquired).toLocaleDateString()}</text>
									</view>
									
									<view className="token-detail">
										<text className="detail-label">Token ID</text>
										<text className="detail-value token-id">{token.tokenId}</text>
									</view>
								</view>
								
								<view className="token-attributes">
									{Object.entries(token.attributes).map(([key, value], index) => (
										<view key={index} className="attribute">
											<text className="attribute-key">{key}</text>
											<text className="attribute-value">{value}</text>
										</view>
									))}
								</view>
							</Card>
						))}
					</view>
				)}
				
				{activeTab === 'history' && (
					<view className="transaction-history">
						{transactionHistory.map(tx => (
							<Card key={tx.id} className="transaction-card">
								<view className="transaction-content">
									<view className="transaction-details">
										<text className="transaction-type">{tx.type}</text>
										<text className="transaction-detail">{tx.detail}</text>
										<text className="transaction-date">{new Date(tx.date).toLocaleDateString()}</text>
									</view>
									<view className="transaction-status">
										<text className={`status ${tx.status.toLowerCase()}`}>{tx.status}</text>
										<image src={chevronIcon} className="chevron-icon" />
									</view>
								</view>
							</Card>
						))}
					</view>
				)}
			</view>
		</ScrollView>
	)
}
