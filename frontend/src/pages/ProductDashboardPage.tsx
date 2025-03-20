import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function ProductDashboardPage() {
	const [scannerActive, setScannerActive] = useState(false)
	const [products, setProducts] = useState([
		{
			id: 'prod-1',
			name: 'Premium Watch X1',
			brand: 'LuxTime',
			category: 'Watches',
			purchaseDate: '2023-04-15',
			image: 'watch-placeholder.jpg',
		},
		{
			id: 'prod-2',
			name: 'Designer Handbag',
			brand: 'FashionLux',
			category: 'Accessories',
			purchaseDate: '2023-06-22',
			image: 'handbag-placeholder.jpg',
		},
		{
			id: 'prod-3',
			name: 'Limited Sneakers',
			brand: 'UrbanKicks',
			category: 'Footwear',
			purchaseDate: '2023-08-10',
			image: 'sneakers-placeholder.jpg',
		}
	])
	
	const toggleScanner = () => {
		setScannerActive(!scannerActive)
	}
	
	const handleImportEcommerce = () => {
		console.log('Import from e-commerce account')
		// Add logic to connect to e-commerce accounts
	}
	
	const handleAddProduct = (productData: any) => {
		console.log('Adding product', productData)
		setProducts([...products, productData])
		setScannerActive(false)
	}
	
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl pad-lg">
					<view className="row">
						<h1>My Product Collection</h1>
						<view style={{ flex: 1 }} />
						<view className="row gap-sm">
							<view className="button" bindtap={toggleScanner}>
								<text>{scannerActive ? 'Close Scanner' : 'Scan QR Code'}</text>
							</view>
							<view className="button secondary" bindtap={handleImportEcommerce}>
								<text>Import from Shop</text>
							</view>
						</view>
					</view>
					
					{scannerActive && (
						<Card>
							<view className="column gap-md">
								<h3>Scan Product QR Code</h3>
								<view className="qr-scanner-placeholder">
									<text className="scanner-text">Camera viewfinder would appear here</text>
								</view>
								<p>Point your camera at the QR code on your product or packaging</p>
								<view className="button" bindtap={() => {
									handleAddProduct({
										id: `prod-${products.length + 1}`,
										name: 'New Scanned Product',
										brand: 'TestBrand',
										category: 'Test Category',
										purchaseDate: new Date().toISOString().split('T')[0],
										image: 'placeholder.jpg',
									})
								}}>
									<text>Mock Successful Scan</text>
								</view>
							</view>
						</Card>
					)}
					
					<view className="column gap-md">
						<view className="row">
							<h2>Your Products ({products.length})</h2>
							<view style={{ flex: 1 }} />
							<view className="product-filter">
								<select>
									<option value="">All Categories</option>
									<option value="Watches">Watches</option>
									<option value="Accessories">Accessories</option>
									<option value="Footwear">Footwear</option>
								</select>
							</view>
						</view>
						
						<view className="product-grid row grid-3 gap-lg">
							{products.map((product) => (
								<Card key={product.id} className="product-card">
									<view className="product-image placeholder" />
									<h3>{product.name}</h3>
									<view className="product-details">
										<text>Brand: {product.brand}</text>
										<text>Category: {product.category}</text>
										<text>Purchased: {product.purchaseDate}</text>
									</view>
									<view className="button" bindtap={() => console.log('View details', product.id)}>
										<text>View Details</text>
									</view>
								</Card>
							))}
						</view>
					</view>
					
					<Card className="import-section">
						<view className="row">
							<view className="column" style={{ flex: 2 }}>
								<h3>Connect Your Shopping Accounts</h3>
								<p>Import your verified purchases automatically by connecting your accounts from supported retailers.</p>
								<view className="row gap-sm">
									<view className="button" bindtap={() => console.log('Connect account')}>
										<text>Connect Account</text>
									</view>
								</view>
							</view>
							<view className="column center" style={{ flex: 1 }}>
								<view className="connected-shops-placeholder" />
							</view>
						</view>
					</Card>
				</view>
			</view>
		</view>
	)
} 