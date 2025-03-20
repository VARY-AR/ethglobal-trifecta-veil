import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function ProductDashboardPage() {
	const [activeTab, setActiveTab] = useState('owned')
	const [sortBy, setSortBy] = useState('recent')
	const [showFilters, setShowFilters] = useState(false)

	// Sample product data
	const products = [
		{
			id: 'p1',
			name: 'Limited Edition Sneakers',
			brand: 'Nike',
			category: 'Footwear',
			price: '$220',
			purchaseDate: '2023-05-15',
			image: '/placeholder-product1.jpg',
			verified: true,
			isLimited: true
		},
		{
			id: 'p2',
			name: 'Designer Handbag',
			brand: 'Louis Vuitton',
			category: 'Accessories',
			price: '$1,800',
			purchaseDate: '2023-02-28',
			image: '/placeholder-product2.jpg',
			verified: true,
			isLimited: true
		},
		{
			id: 'p3',
			name: 'Collectible T-Shirt',
			brand: 'Supreme',
			category: 'Apparel',
			price: '$120',
			purchaseDate: '2023-06-10',
			image: '/placeholder-product3.jpg',
			verified: true,
			isLimited: false
		},
		{
			id: 'p4',
			name: 'Vintage Watch',
			brand: 'Rolex',
			category: 'Accessories',
			price: '$8,500',
			purchaseDate: '2022-11-05',
			image: '/placeholder-product4.jpg',
			verified: false,
			isLimited: true
		}
	]

	// Sort products
	const sortedProducts = [...products].sort((a, b) => {
		if (sortBy === 'recent') {
			return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
		} else if (sortBy === 'price-high') {
			return parseFloat(b.price.replace('$', '').replace(',', '')) - parseFloat(a.price.replace('$', '').replace(',', ''))
		} else if (sortBy === 'price-low') {
			return parseFloat(a.price.replace('$', '').replace(',', '')) - parseFloat(b.price.replace('$', '').replace(',', ''))
		}
		return 0
	})

	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="row mb-md">
					<text className="h1">Your Product Collection</text>
					
					<view className="filters-toggle" bindtap={() => setShowFilters(!showFilters)}>
						<text>Filters</text>
						<text>{showFilters ? '▲' : '▼'}</text>
					</view>
				</view>
				
				{/* Filters */}
				{showFilters && (
					<view className="filters-panel card p-md mb-md">
						<view className="row gap-md">
							<view className="form-group">
								<text>Sort by:</text>
								<select value={sortBy} onChange={(e: any) => setSortBy(e.target.value)}>
									<option value="recent">Most Recent</option>
									<option value="price-high">Price (High to Low)</option>
									<option value="price-low">Price (Low to High)</option>
								</select>
							</view>
							
							<view className="form-group">
								<text>Category:</text>
								<select>
									<option value="all">All Categories</option>
									<option value="footwear">Footwear</option>
									<option value="apparel">Apparel</option>
									<option value="accessories">Accessories</option>
								</select>
							</view>
							
							<view className="form-group">
								<text>Brand:</text>
								<select>
									<option value="all">All Brands</option>
									<option value="nike">Nike</option>
									<option value="louis-vuitton">Louis Vuitton</option>
									<option value="supreme">Supreme</option>
									<option value="rolex">Rolex</option>
								</select>
							</view>
						</view>
					</view>
				)}
				
				{/* Product collection tabs */}
				<view className="tabs">
					<view className="row">
						<view
							className={`tab ${activeTab === 'owned' ? 'active' : ''}`}
							bindtap={() => setActiveTab('owned')}
						>
							<text>Owned Products</text>
						</view>
						<view
							className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
							bindtap={() => setActiveTab('wishlist')}
						>
							<text>Wishlist</text>
						</view>
					</view>
				</view>
				
				{/* Product grid */}
				{activeTab === 'owned' && (
					<view className="row-2 gap-md">
						{sortedProducts.map(product => (
							<view className="card product-card" key={product.id}>
								<view className="product-image">
									<text>{product.name}</text>
								</view>
								<view className="card-content">
									<text className="h3">{product.name}</text>
									<text className="brand">{product.brand}</text>
									<text className="p">Category: {product.category}</text>
									<text className="p">Price: {product.price}</text>
									<text className="p">Purchased: {new Date(product.purchaseDate).toLocaleDateString()}</text>
									
									<view className="product-badges">
										{product.verified && (
											<view className="badge verified">
												<text>✓ Verified</text>
											</view>
										)}
										{product.isLimited && (
											<view className="badge limited">
												<text>Limited Edition</text>
											</view>
										)}
									</view>
									
									<view className="row mt-sm">
										<view className="button" bindtap={() => {}}>
											<text>View Passport</text>
										</view>
									</view>
								</view>
							</view>
						))}
					</view>
				)}
				
				{/* Wishlist tab content */}
				{activeTab === 'wishlist' && (
					<view className="card p-md text-center">
						<text className="h3">Your Wishlist</text>
						<text className="p">You haven't added any products to your wishlist yet.</text>
						<text className="p">As you browse collections, you can add items here to keep track of what you want.</text>
						
						<view className="button mt-md" bindtap={() => {}}>
							<text>Browse Marketplace</text>
						</view>
					</view>
				)}
				
				{/* Add product section */}
				<view className="section mt-xl">
					<text className="h2">Add Products to Your Collection</text>
					<text className="p">Register your physical product purchases to create digital ownership records.</text>
					
					<view className="row-3 gap-md mt-md">
						<view className="card p-md text-center">
							<text className="h3">Scan QR Code</text>
							<text className="p">For products with QR verification</text>
							<view className="button mt-sm" bindtap={() => {}}>
								<text>Open Scanner</text>
							</view>
						</view>
						
						<view className="card p-md text-center">
							<text className="h3">Upload Receipt</text>
							<text className="p">Verify purchase with receipt</text>
							<view className="button mt-sm" bindtap={() => {}}>
								<text>Upload Receipt</text>
							</view>
						</view>
						
						<view className="card p-md text-center">
							<text className="h3">Serial Number</text>
							<text className="p">Enter product serial number</text>
							<view className="button mt-sm" bindtap={() => {}}>
								<text>Enter Serial</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	)
} 