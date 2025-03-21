import { useState } from '@lynx-js/react'
import { Header } from '$/components/Header.js'
import { ScrollView } from '$/components/ScrollView.js'
import '$/shared/layout.css'
import '$/shared/global.css'

export function BrandOnboardingPage() {
	// Brand onboarding state
	const [currentStep, setCurrentStep] = useState(1)
	const [brandProfile, setBrandProfile] = useState({
		name: '',
		website: '',
		description: '',
		logo: null,
		categories: {
			luxury: false,
			streetwear: false,
			athletics: false,
			accessories: false,
			other: false
		},
		productCatalogUrl: ''
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
			[field]: value
		})
	}
	
	const handleCategoryToggle = (category: string) => {
		setBrandProfile({
			...brandProfile,
			categories: {
				...brandProfile.categories,
				[category]: !brandProfile.categories[category as keyof typeof brandProfile.categories]
			}
		})
	}
	
	const handleSubmit = () => {
		console.log('Submitting brand profile:', brandProfile)
		// In a real app, we would submit this to a server
	}
	
	return (
		<ScrollView>
			<Header />
			
			<view className="container">
				<view className="row mb-lg">
					<text className="h1">Brand Onboarding</text>
				</view>
				
				{/* Progress bar */}
				<view className="progress-bar">
					<view className="steps">
						<view className={`step ${currentStep >= 1 ? 'active' : ''}`}>
							<view className="step-number"><text>1</text></view>
							<text>Brand Profile</text>
						</view>
						<view className={`step-connector ${currentStep >= 2 ? 'active' : ''}`} />
						<view className={`step ${currentStep >= 2 ? 'active' : ''}`}>
							<view className="step-number"><text>2</text></view>
							<text>Product Catalog</text>
						</view>
						<view className={`step-connector ${currentStep >= 3 ? 'active' : ''}`} />
						<view className={`step ${currentStep >= 3 ? 'active' : ''}`}>
							<view className="step-number"><text>3</text></view>
							<text>Verification Methods</text>
						</view>
						<view className={`step-connector ${currentStep >= 4 ? 'active' : ''}`} />
						<view className={`step ${currentStep >= 4 ? 'active' : ''}`}>
							<view className="step-number"><text>4</text></view>
							<text>Complete</text>
						</view>
					</view>
				</view>
				
				<view className="card p-lg mt-md">
					{/* Step 1: Brand Profile */}
					{currentStep === 1 && (
						<view className="onboarding-step">
							<text className="h2">Brand Profile</text>
							<text className="p">Let's set up your brand's presence on our platform.</text>
							
							<view className="form">
								<view className="form-group">
									<text>Brand Name</text>
									<input
										type="text"
										value={brandProfile.name}
										placeholder="Enter brand name"
										onChange={(e: any) => handleInputChange('name', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Website</text>
									<input
										type="url"
										value={brandProfile.website}
										placeholder="https://yourbrand.com"
										onChange={(e: any) => handleInputChange('website', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Description</text>
									<textarea
										value={brandProfile.description}
										placeholder="Tell us about your brand"
										onChange={(e: any) => handleInputChange('description', e.target.value)}
									/>
								</view>
								
								<view className="form-group">
									<text>Brand Logo</text>
									<view className="logo-upload">
										<text>+ Upload Logo</text>
									</view>
								</view>
								
								<view className="form-group">
									<text>Product Categories</text>
									<view className="categories">
										<view className="category" bindtap={() => handleCategoryToggle('luxury')}>
											<view className={`checkbox ${brandProfile.categories.luxury ? 'checked' : ''}`} />
											<text>Luxury</text>
										</view>
										<view className="category" bindtap={() => handleCategoryToggle('streetwear')}>
											<view className={`checkbox ${brandProfile.categories.streetwear ? 'checked' : ''}`} />
											<text>Streetwear</text>
										</view>
										<view className="category" bindtap={() => handleCategoryToggle('athletics')}>
											<view className={`checkbox ${brandProfile.categories.athletics ? 'checked' : ''}`} />
											<text>Athletics</text>
										</view>
										<view className="category" bindtap={() => handleCategoryToggle('accessories')}>
											<view className={`checkbox ${brandProfile.categories.accessories ? 'checked' : ''}`} />
											<text>Accessories</text>
										</view>
										<view className="category" bindtap={() => handleCategoryToggle('other')}>
											<view className={`checkbox ${brandProfile.categories.other ? 'checked' : ''}`} />
											<text>Other</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					)}
					
					{/* Step 2: Product Catalog Integration */}
					{currentStep === 2 && (
						<view className="onboarding-step">
							<text className="h2">Product Catalog</text>
							<text className="p">Connect your product database so we can verify customer ownership.</text>
							
							<view className="form">
								<view className="form-group">
									<text>Product API Endpoint</text>
									<input
										type="url"
										value={brandProfile.productCatalogUrl}
										placeholder="https://api.yourbrand.com/products"
										onChange={(e: any) => handleInputChange('productCatalogUrl', e.target.value)}
									/>
								</view>
								
								<text className="p">We support the following integration methods:</text>
								<view className="methods">
									<view className="method">
										<text className="h3">REST API Integration</text>
										<text className="p">Connect your existing product catalog API</text>
									</view>
									
									<view className="method">
										<text className="h3">Batch Upload</text>
										<text className="p">Upload your product database as JSON or CSV</text>
									</view>
									
									<view className="method">
										<text className="h3">Manual Entry</text>
										<text className="p">Manually add products to the platform</text>
									</view>
								</view>
								
								<text className="p mt-md">Your product data is securely hashed and only used for zero-knowledge verification. We never store or share your customer data.</text>
							</view>
						</view>
					)}
					
					{/* Step 3: Verification Methods */}
					{currentStep === 3 && (
						<view className="onboarding-step">
							<text className="h2">Verification Methods</text>
							<text className="p">Set up how customers can prove ownership of your products.</text>
							
							<view className="verification-types">
								<view className="verification-type">
									<view className="method-title">
										<text className="h3">QR Code Verification</text>
										<view className="toggle active" />
									</view>
									<text className="p">Allow customers to scan QR codes on your products to claim ownership.</text>
								</view>
								
								<view className="verification-type">
									<view className="method-title">
										<text className="h3">Receipt Upload</text>
										<view className="toggle active" />
									</view>
									<text className="p">Customers can upload purchase receipts to verify ownership.</text>
								</view>
								
								<view className="verification-type">
									<view className="method-title">
										<text className="h3">NFC Tag Scanning</text>
										<view className="toggle" />
									</view>
									<text className="p">Enable NFC tag scanning for seamless verification (premium feature).</text>
								</view>
								
								<view className="verification-type">
									<view className="method-title">
										<text className="h3">Blockchain Integration</text>
										<view className="toggle" />
									</view>
									<text className="p">Connect to blockchain records for digital ownership verification.</text>
								</view>
							</view>
							
							<text className="p mt-md">You can modify these settings later from your brand dashboard.</text>
						</view>
					)}
					
					{/* Step 4: Complete */}
					{currentStep === 4 && (
						<view className="onboarding-step">
							<view className="success-icon">
								<text>✓</text>
							</view>
							<text className="h2">Setup Complete!</text>
							<text className="p">Your brand is now ready to offer exclusive rewards and experiences.</text>
							
							<text className="h3 mt-lg">Next Steps:</text>
							<view className="next-steps">
								<view className="step">
									<text className="step-number">1</text>
									<text className="p">Create your first reward in the brand dashboard</text>
								</view>
								<view className="step">
									<text className="step-number">2</text>
									<text className="p">Set up verification for your product line</text>
								</view>
								<view className="step">
									<text className="step-number">3</text>
									<text className="p">Invite team members to help manage your brand</text>
								</view>
							</view>
							
							<view className="button mt-lg" bindtap={() => {}}>
								<text>Go to Brand Dashboard</text>
							</view>
						</view>
					)}
					
					{/* Navigation buttons */}
					{currentStep < 4 && (
						<view className="row mt-lg">
							{currentStep > 1 && (
								<view className="button secondary" bindtap={handleBack}>
									<text>Back</text>
								</view>
							)}
							<view style={{ flex: 1 }} />
							<view className="button" bindtap={handleNext}>
								<text>Next Step</text>
							</view>
						</view>
					)}
				</view>
			</view>
		</ScrollView>
	)
} 