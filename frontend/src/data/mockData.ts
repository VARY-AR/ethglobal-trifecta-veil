// Mock data for VEIL application

export const memberships = [
	{
		id: 1,
		title: 'FUJIFILM EARLY ADOPTER',
		description: 'Exclusive Access to Camera Gear Testing and Presale'
	},
	{
		id: 2,
		title: 'BALENCIAGA DEGEN',
		description: 'Exclusive Access to Design Collaboration Platform'
	},
	{
		id: 3,
		title: 'ARPA STUDIO NOSE',
		description: 'Exclusive Access to Worldwide Presale Events'
	}
] as const

export const events = [
	{
		id: 1,
		title: 'ASAP ROCKY GUEST LIST',
		date: '2025-04-01',
		image: null, // Placeholder for event image
		description: 'ASAP STUDIO gives selected customers access to their world-wide series of events in exclusive design locations. Each year, the brand selects 500 lucky ones to access their closest circle of friends, to exchange their ideas...',
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
		location: 'New York'
	},
	{
		id: 2,
		title: 'PRADA RUNWAY ACCESS',
		date: '2025-05-15',
		image: null,
		description: 'Exclusive access to Prada\'s runway show during Milan Fashion Week for loyal customers who meet specific ownership criteria.',
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
		location: 'Milan'
	},
	{
		id: 3,
		title: 'KENDRICK LAMAR PRIVATE SHOW',
		date: '2025-06-10',
		image: null,
		description: 'Experience an intimate concert with Kendrick Lamar exclusively for verified fans and collectors of his limited edition merchandise.',
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
		location: 'Los Angeles'
	}
] as const
