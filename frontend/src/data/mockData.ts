// Mock data for VEIL application

export type RequirementType = 'ownership-count' | 'ownership-unique-collection-count' | 'date'

export interface Requirement {
	type: RequirementType
	description: string
	parameters: {
		contractAddresses?: string[]
		minCount?: number
		maxAgeInDays?: number
	}
}

export interface Bounty {
	id: string
	name: string
	description: string
	category: string
	brandWebsite: string
	imageUri: string
	requirements: Requirement[]
	claimed?: boolean
}

export const bounties: Bounty[] = [
	{
		id: 'private-atelier-tour',
		name: 'Private Atelier Tour',
		description: 'Exclusive behind-the-scenes tour of the Hermès workshop in Paris.',
		category: 'Event',
		brandWebsite: 'https://www.hermes.com/',
		imageUri: 'https://www.yatzer.com/sites/default/files/article_images/3011/Ateliers-Hermes-Pantin-France-yatzer-20.jpg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	},
	{
		id: 'louis-vuitton-city-guide-app-access',
		name: 'Louis Vuitton City Guide App Access',
		description: 'Complimentary access to the Louis Vuitton City Guide app, offering insights into the world\'s most fascinating cities.',
		category: 'Gift Voucher',
		brandWebsite: 'https://www.louisvuitton.com/',
		imageUri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiisvspoBItTQBbzKjifwiKapqCb_lejqo-axhZ7DWlO-RJyBpitR937d7rTWJ3QAvLQo45mKNESNLlKnlgYX_BIKaGr_kC-afCU1cpfZSuB-88s20kXxEaR8XhttEzDAWfQiBIMWKxUQtG/s640/Screen+Shot+2015-11-15+at+12.56.57+PM.png',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	},
	{
		id: 'chanel-high-jewelry-exhibition',
		name: 'Chanel High Jewelry Exhibition',
		description: 'Invitation to a private viewing of Chanel\'s latest high jewelry collection.',
		category: 'Event',
		brandWebsite: 'https://www.chanel.com/',
		imageUri: 'https://optim.tildacdn.com/tild3636-3830-4265-b862-343536363739/-/format/webp/G79A4496by_natashapo.jpg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: true
	},
	{
		id: 'dior-privee-fragrance-workshop',
		name: 'Dior Privée Fragrance Workshop',
		description: 'Hands-on workshop to create a personalized fragrance with Dior\'s master perfumers.',
		category: 'Event',
		brandWebsite: 'https://www.dior.com/',
		imageUri: 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dw8b632434/images/beauty/0-HOME/LCP/RENO-2025/PCD_GAMME_NOIR_3700x2000.jpg?sw=1560',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	},
	{
		id: 'gucci-osteria-dining-experience',
		name: 'Gucci Osteria Dining Experience',
		description: 'Exclusive dining experience at Gucci Osteria, the brand\'s Michelin-starred restaurant.',
		category: 'Event',
		brandWebsite: 'https://www.gucci.com/',
		imageUri: 'https://backend.gucciosteria.com/wp-content/uploads/2022/01/OSTERIA_10.jpg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	},
	{
		id: 'prada-mode-membership',
		name: 'Prada Mode Membership',
		description: 'Access to Prada\'s traveling private club, offering unique cultural experiences.',
		category: 'VIC Membership',
		brandWebsite: 'https://www.prada.com/',
		imageUri: 'https://www.pradagroup.com/content/dam/pradagroup/immagini/sustainability/sustainability-overview/2020/cultura/prada-mode/testata_pradamode.jpg/_jcr_content/renditions/cq5dam.web.1920.1920.jpeg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: true
	},
	{
		id: 'tiffany-diamond-academy',
		name: 'Tiffany Diamond Academy',
		description: 'Educational session on diamonds, including a behind-the-scenes tour of Tiffany\'s workshop.',
		category: 'Event',
		brandWebsite: 'https://www.tiffany.com/',
		imageUri: 'https://images.prestigeonline.com/hk/jewellery/features/behind-the-scenes-at-the-tiffany-co.-diamond-academy/314562-2-eng-US/Behind-the-Scenes-at-the-Tiffany-Co.-Diamond-Academy.jpg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	},
	{
		id: 'rolex-sailing-experience',
		name: 'Rolex Sailing Experience',
		description: 'Invitation to join a sailing event sponsored by Rolex.',
		category: 'Event',
		brandWebsite: 'https://www.rolex.com/',
		imageUri: 'https://static01.nyt.com/images/2021/08/28/multimedia/28sp-maxi-challenges-inyt2/28sp-maxi-challenges-inyt2-mediumSquareAt3X.jpg',
		requirements: [
			{
				type: 'ownership-count',
				description: 'You own min 4 premium products',
				parameters: {
					contractAddresses: [
						'0xC52A84AE6509532AdF027B60Cca11d3fA930F3C7',
						'0xaBA661FA1D46B03298E13862ec5e03111586BcFE',
						'0xeE8aA4b09E598006891eB35BCd86e15632aC3334',
						'0xdA17104992D1382739C1b05FaC909050d713e1E6',
						'0xC68aFB1C3Fd9dC85c7FD2afaa62c4b973E91f6c6',
						'0xDC5D240a3DC17cC3477FFF9B2d2B9da78C6b2E79',
						'0xD148Da449978011457A4510daCA7538061186fb9'
					],
					minCount: 4
				}
			},
			{
				type: 'ownership-unique-collection-count',
				description: 'From at least 2 brands',
				parameters: {
					minCount: 2
				}
			},
			{
				type: 'date',
				description: 'Products purchased in last 12 months',
				parameters: {
					maxAgeInDays: 365
				}
			}
		],
		claimed: false
	}
]

// Mapping bounties to old format for backward compatibility
export const events = [
	{
		id: 1,
		title: 'ASAP ROCKY GUEST LIST',
		date: '2025-04-01',
		image: null,
		description: 'ASAP STUDIO gives selected customers access to their world-wide series of events in exclusive design locations.',
		fullDescription: `ASAP STUDIO gives selected customers access to their world-wide series of events in exclusive design locations. Each year, the brand selects 500 lucky ones to access their closest circle of friends, to exchange their ideas and get direct access to the newest drops. The 2025 tour will travel through 12 cities, including Tokyo, Paris, New York and Berlin. The guest list is curated through a zero-knowledge verification process, ensuring that only loyal customers get access while protecting everyone's privacy.`,
		requirements: [
			'You own min 4 premium products',
			'From at least 2 brands',
			'Products purchased in last 12 months',
			'Products price above $100'
		],
		links: [
			{
				title: 'ARPA STUDIO Website',
				url: 'https://arpa.studio'
			},
			{
				title: 'ARPA STUDIO VIC "Nose" Program Page',
				url: 'https://arpa.studio/vic/nose'
			}
		],
		location: 'New York',
		claimed: true
	},
	{
		id: 2,
		title: 'PRADA RUNWAY ACCESS',
		date: '2025-05-15',
		image: null,
		description: 'Exclusive access to Prada\'s runway show during Milan Fashion Week for loyal customers.',
		fullDescription: `Get exclusive access to Prada's runway show during Milan Fashion Week. This invitation-only event gives you front-row access to Prada's newest collection before anyone else. Meet the designers, network with industry insiders, and even get a chance to purchase limited pre-release items.`,
		requirements: [
			'You own min 3 Prada products',
			'At least 1 purchase in last 6 months',
			'Total spent above $2,500'
		],
		links: [
			{
				title: 'Prada Official Website',
				url: 'https://prada.com'
			}
		],
		location: 'Milan',
		claimed: true
	},
	{
		id: 3,
		title: 'KENDRICK LAMAR PRIVATE SHOW',
		date: '2025-06-10',
		image: null,
		description: 'Experience an intimate concert with Kendrick Lamar exclusively for verified fans.',
		fullDescription: `Join an exclusive group of fans for a private performance by Kendrick Lamar in Los Angeles. This intimate venue will host only 200 attendees who have proven their dedication through ownership of limited edition merchandise and album purchases. The event includes a meet and greet session after the show and exclusive merchandise only available at this event.`,
		requirements: [
			'You own at least 2 limited edition items',
			'Verified album purchase history',
			'Fan club membership'
		],
		links: [
			{
				title: 'Kendrick Lamar Official',
				url: 'https://kendricklamar.com'
			}
		],
		location: 'Los Angeles',
		claimed: true
	}
] as const

export const memberships = [
	{
		id: 1,
		title: 'FUJIFILM EARLY ADOPTER',
		description: 'Exclusive access to camera gear testing and presale',
		claimed: true
	},
	{
		id: 2,
		title: 'BALENCIAGA DEGEN',
		description: 'Exclusive access to design collaboration platform',
		claimed: true
	},
	{
		id: 3,
		title: 'ARPA STUDIO NOSE',
		description: 'Exclusive access to worldwide presale events',
		claimed: false
	}
] as const

export const walletTokens = [
	{
		id: 1,
		name: 'BALENCIAGA HOODIE BLACK XL',
		brand: 'BALENCIAGA',
		acquired: '2023-11-15',
		tokenId: 'BAL-1234-5678-9012',
		verified: true,
		attributes: {
			color: 'Black',
			size: 'XL',
			material: 'Cotton',
			collection: 'Fall 2023'
		}
	},
	{
		id: 2,
		name: 'PRADA NYLON BAG',
		brand: 'PRADA',
		acquired: '2024-01-24',
		tokenId: 'PRA-2345-6789-0123',
		verified: true,
		attributes: {
			color: 'Navy',
			type: 'Shoulder bag',
			material: 'Re-Nylon',
			collection: 'Spring 2024'
		}
	},
	{
		id: 3,
		name: 'FUJIFILM X-T5 CAMERA',
		brand: 'FUJIFILM',
		acquired: '2023-09-20',
		tokenId: 'FUJ-3456-7890-1234',
		verified: true,
		attributes: {
			color: 'Silver',
			model: 'X-T5',
			sensor: 'APS-C',
			resolution: '40MP'
		}
	},
	{
		id: 4,
		name: 'ARPA STUDIO CANDLE SET',
		brand: 'ARPA STUDIO',
		acquired: '2024-02-10',
		tokenId: 'ARP-4567-8901-2345',
		verified: true,
		attributes: {
			scent: 'Cedar & Vanilla',
			size: '180g',
			collection: 'Winter 2024'
		}
	}
] as const

export const transactionHistory = [
	{
		id: 1,
		date: '2024-03-15',
		type: 'Token Acquired',
		detail: 'ARPA STUDIO CANDLE SET',
		status: 'Completed'
	},
	{
		id: 2,
		date: '2024-03-01',
		type: 'ZK Proof Generated',
		detail: 'For ASAP ROCKY event',
		status: 'Completed'
	},
	{
		id: 3,
		date: '2024-02-10',
		type: 'Token Acquired',
		detail: 'ARPA STUDIO CANDLE SET',
		status: 'Completed'
	},
	{
		id: 4,
		date: '2024-01-24',
		type: 'Token Acquired',
		detail: 'PRADA NYLON BAG',
		status: 'Completed'
	},
	{
		id: 5,
		date: '2023-11-15',
		type: 'Token Acquired',
		detail: 'BALENCIAGA HOODIE BLACK XL',
		status: 'Completed'
	},
	{
		id: 6,
		date: '2023-09-20',
		type: 'Token Acquired',
		detail: 'FUJIFILM X-T5 CAMERA',
		status: 'Completed'
	}
] as const
