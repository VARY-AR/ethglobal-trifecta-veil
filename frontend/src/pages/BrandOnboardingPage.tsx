import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { Card } from '$/components/Card.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function BrandOnboardingPage() {
	const [currentStep, setCurrentStep] = useState(1)
	const [brandProfile, setBrandProfile] = useState({
		name: '',
		website: '',
		description: '',
		logo: null,
		categories: [] as string[],
		productCatalogUrl: '',
	})
	
	const handleNext = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1)
		}
	}
	
	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}
	
	const handleInputChange = (field: string, value: string) => {
		setBrandProfile({
			...brandProfile,
			[field]: value,
		})
	}
	
	const handleCategoryToggle = (category: string) => {
		if (brandProfile.categories.includes(category)) {
			setBrandProfile({
				...brandProfile,
				categories: brandProfile.categories.filter(c => c !== category),
			})
		} else {
			setBrandProfile({
				...brandProfile,
				categories: [...brandProfile.categories, category],
			})
		}
	}
	
	const handleSubmit = () => {
		console.log('Submitting brand profile:', brandProfile)
		// In a real app, this would send data to an API
		setCurrentStep(4)
	}
	
	return (
		<view className="page">
			<Header />
			
			<view className="container">
				<view className="column gap-xl pad-lg">
					<h1>Brand Onboarding</h1>
					
					<view className="progress-indicator">
						<view className="row gap-md">
							<view className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
								<text>1. Brand Profile</text>
							</view>
							<view className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
								<text>2. Product Catalog</text>
							</view>
							<view className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
								<text>3. Verification Methods</text>
							</view>
							<view className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
								<text>4. Complete</text>
							</view>
						</view>
					</view>
					
					{currentStep === 1 && (
						<Card>
							<view className="column gap-lg">
								<h2>Create Your Brand Profile</h2>
								<p>Let's set up your brand's presence on our platform to offer exclusive rewards.</p>
								
								<view className="form-group">
									<text>Brand Name</text>
									<input 
										type="text" 
										placeholder="Enter your brand name" 
										value={brandProfile.name}
										onChange={(e: any) => handleInputChange('name', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Website</text>
									<input 
										type="text" 
										placeholder="https://your-brand.com" 
										value={brandProfile.website}
										onChange={(e: any) => handleInputChange('website', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Brand Description</text>
									<textarea 
										placeholder="Tell us about your brand and products" 
										value={brandProfile.description}
										onChange={(e: any) => handleInputChange('description', e.target.value)}
									></textarea>
								</view>
								
								<view className="form-group">
									<text>Brand Logo</text>
									<view className="logo-upload-placeholder" />
									<view className="button secondary">
										<text>Upload Logo</text>
									</view>
								</view>
								
								<view className="form-group">
									<text>Product Categories</text>
									<view className="category-checkboxes column gap-sm">
										<view className="row gap-sm">
											<input 
												type="checkbox" 
												id="cat-apparel" 
												checked={brandProfile.categories.includes('Apparel')}
												onChange={() => handleCategoryToggle('Apparel')}
											/>
											<text>Apparel</text>
										</view>
										<view className="row gap-sm">
											<input 
												type="checkbox" 
												id="cat-accessories" 
												checked={brandProfile.categories.includes('Accessories')}
												onChange={() => handleCategoryToggle('Accessories')}
											/>
											<text>Accessories</text>
										</view>
										<view className="row gap-sm">
											<input 
												type="checkbox" 
												id="cat-footwear" 
												checked={brandProfile.categories.includes('Footwear')}
												onChange={() => handleCategoryToggle('Footwear')}
											/>
											<text>Footwear</text>
										</view>
										<view className="row gap-sm">
											<input 
												type="checkbox" 
												id="cat-jewelry" 
												checked={brandProfile.categories.includes('Jewelry')}
												onChange={() => handleCategoryToggle('Jewelry')}
											/>
											<text>Jewelry</text>
										</view>
									</view>
								</view>
								
								<view className="row gap-md" style={{ justifyContent: 'flex-end' }}>
									<view className="button" bindtap={handleNext}>
										<text>Next Step</text>
									</view>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 2 && (
						<Card>
							<view className="column gap-lg">
								<h2>Integrate Your Product Catalog</h2>
								<p>Connect your product data to enable digital passport creation for your products.</p>
								
								<view className="form-group">
									<text>Product Catalog API</text>
									<input 
										type="text" 
										placeholder="https://your-api.com/products" 
										value={brandProfile.productCatalogUrl}
										onChange={(e: any) => handleInputChange('productCatalogUrl', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Or upload a CSV file</text>
									<view className="file-upload-placeholder" />
									<view className="button secondary">
										<text>Upload CSV</text>
									</view>
								</view>
								
								<view className="form-group">
									<text>Eligible Products for Loyalty Program</text>
									<select>
										<option value="all">All Products</option>
										<option value="selected">Selected Products</option>
										<option value="categories">By Category</option>
									</select>
									<p className="form-help">You can change this later in your dashboard</p>
								</view>
								
								<view className="row gap-md" style={{ justifyContent: 'space-between' }}>
									<view className="button secondary" bindtap={handleBack}>
										<text>Back</text>
									</view>
									<view className="button" bindtap={handleNext}>
										<text>Next Step</text>
									</view>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 3 && (
						<Card>
							<view className="column gap-lg">
								<h2>Set Verification Methods</h2>
								<p>Establish how product authenticity will be verified for your brand.</p>
								
								<view className="verification-methods column gap-md">
									<view className="row gap-sm">
										<input type="checkbox" id="verify-qr" checked={true} />
										<view className="column">
											<text className="method-title">QR Codes</text>
											<text className="method-description">Unique QR codes on physical products</text>
										</view>
									</view>
									
									<view className="row gap-sm">
										<input type="checkbox" id="verify-nfc" checked={false} />
										<view className="column">
											<text className="method-title">NFC Tags</text>
											<text className="method-description">Embedded NFC tags for tap verification</text>
										</view>
									</view>
									
									<view className="row gap-sm">
										<input type="checkbox" id="verify-receipt" checked={true} />
										<view className="column">
											<text className="method-title">E-Receipt Verification</text>
											<text className="method-description">Verify digital receipts from authorized retailers</text>
										</view>
									</view>
									
									<view className="row gap-sm">
										<input type="checkbox" id="verify-serial" checked={true} />
										<view className="column">
											<text className="method-title">Serial Number</text>
											<text className="method-description">Unique serial numbers on products or packaging</text>
										</view>
									</view>
								</view>
								
								<view className="form-group">
									<text>Additional Security Notes</text>
									<textarea placeholder="Any specific verification instructions for your customers"></textarea>
								</view>
								
								<view className="row gap-md" style={{ justifyContent: 'space-between' }}>
									<view className="button secondary" bindtap={handleBack}>
										<text>Back</text>
									</view>
									<view className="button" bindtap={handleSubmit}>
										<text>Complete Setup</text>
									</view>
								</view>
							</view>
						</Card>
					)}
					
					{currentStep === 4 && (
						<Card>
							<view className="column gap-lg center text-center">
								<view className="success-icon">✓</view>
								<h2>Setup Complete!</h2>
								<p>Your brand is now registered on our platform. You can start creating campaigns and offering exclusive rewards.</p>
								
								<view className="next-steps column gap-md">
									<text className="next-step">1. Access your brand dashboard</text>
									<text className="next-step">2. Create your first campaign</text>
									<text className="next-step">3. Design reward experiences</text>
									<text className="next-step">4. Track customer engagement</text>
								</view>
								
								<view className="button" bindtap={() => console.log('Go to dashboard')}>
									<text>Go to Brand Dashboard</text>
								</view>
							</view>
						</Card>
					)}
				</view>
			</view>
		</view>
	)
} 