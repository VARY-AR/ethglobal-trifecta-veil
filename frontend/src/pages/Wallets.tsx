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
			
			<view className="Wallets">
				<view className="Wallets__tabs">
					<view 
						className={`Wallets__tab ${activeTab === 'tokens' ? 'Wallets__tab--active' : ''}`}
						bindtap={() => setActiveTab('tokens')}
					>
						<text>Your Tokens</text>
					</view>
					<view 
						className={`Wallets__tab ${activeTab === 'history' ? 'Wallets__tab--active' : ''}`}
						bindtap={() => setActiveTab('history')}
					>
						<text>Transaction History</text>
					</view>
				</view>
				
				{activeTab === 'tokens' && (
					<view className="Wallets__tokens-list">
						{walletTokens.map(token => (
							<Card key={token.id} className="Wallets__token-card">
								<view className="Wallets__token-header">
									<text className="Wallets__token-name">{token.name}</text>
									{token.verified && (
										<image src={verifyIcon} className="Wallets__verified-icon" />
									)}
								</view>
								
								<view className="Wallets__token-details">
									<view className="Wallets__token-detail">
										<text className="Wallets__detail-label">Brand</text>
										<text className="Wallets__detail-value">{token.brand}</text>
									</view>
									
									<view className="Wallets__token-detail">
										<text className="Wallets__detail-label">Acquired</text>
										<text className="Wallets__detail-value">{new Date(token.acquired).toLocaleDateString()}</text>
									</view>
									
									<view className="Wallets__token-detail">
										<text className="Wallets__detail-label">Token ID</text>
										<text className="Wallets__detail-value Wallets__token-id">{token.tokenId}</text>
									</view>
								</view>
								
								<view className="Wallets__token-attributes">
									{Object.entries(token.attributes).map(([key, value], index) => (
										<view key={index} className="Wallets__attribute">
											<text className="Wallets__attribute-key">{key}</text>
											<text className="Wallets__attribute-value">{value}</text>
										</view>
									))}
								</view>
							</Card>
						))}
					</view>
				)}
				
				{activeTab === 'history' && (
					<view className="Wallets__history-list">
						{transactionHistory.map(tx => (
							<Card key={tx.id} className="Wallets__transaction-card">
								<view className="Wallets__transaction-content">
									<view className="Wallets__transaction-details">
										<text className="Wallets__transaction-type">{tx.type}</text>
										<text className="Wallets__transaction-detail">{tx.detail}</text>
										<text className="Wallets__transaction-date">{new Date(tx.date).toLocaleDateString()}</text>
									</view>
									<view className="Wallets__transaction-status">
										<text className={`Wallets__status Wallets__status--${tx.status.toLowerCase()}`}>{tx.status}</text>
										<image src={chevronIcon} className="Wallets__chevron-icon" />
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
