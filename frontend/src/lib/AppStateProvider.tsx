import { createContext, useState, useContext } from '@lynx-js/react'
import type { ReactNode } from '@lynx-js/react'
import { events, memberships, bounties } from '../data/mockData.js'
import type { BadgeStatus } from '../components/Badge.js'
import type { Bounty } from '../data/mockData.js'

// Define types for our state
type RewardType = 'event' | 'membership' | 'bounty'

interface RewardState {
	id: number | string
	type: RewardType
	status: BadgeStatus
}

interface AppState {
	rewards: RewardState[]
	events: typeof events
	memberships: typeof memberships
	bounties: typeof bounties
}

interface AppStateContextType extends AppState {
	updateRewardStatus: (id: number | string, type: RewardType, status: BadgeStatus) => void
	getRewardStatus: (id: number | string, type: RewardType) => BadgeStatus
	isRewardEligible: (id: number | string, type: RewardType) => boolean
	isRewardClaimable: (id: number | string, type: RewardType) => boolean
	isRewardClaimed: (id: number | string, type: RewardType) => boolean
}

// Create context with default values
const AppStateContext = createContext<AppStateContextType | null>(null)

// Custom hook to use the app state
export const useAppState = () => {
	const context = useContext(AppStateContext)
	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider')
	}
	return context
}

interface AppStateProviderProps {
	children: ReactNode
}

export function AppStateProvider({ children }: AppStateProviderProps) {
	// Initialize state with mock data
	const [state, setState] = useState<AppState>({
		rewards: [
			{ id: 1, type: 'event', status: 'claimed' }, // ASAP ROCKY event is claimed
			{ id: 2, type: 'event', status: 'claimable' }, // PRADA RUNWAY is claimable (ZK proof submitted)
			{ id: 3, type: 'event', status: 'eligible' }, // KENDRICK LAMAR is eligible
			{ id: 1, type: 'membership', status: 'claimed' }, // FUJIFILM membership is claimed
			{ id: 2, type: 'membership', status: 'claimable' }, // BALENCIAGA membership is claimable
			{ id: 3, type: 'membership', status: 'eligible' }, // ARPA STUDIO membership is eligible
			{ id: 'private-atelier-tour', type: 'bounty', status: 'eligible' },
			{ id: 'louis-vuitton-city-guide-app-access', type: 'bounty', status: 'eligible' },
			{ id: 'chanel-high-jewelry-exhibition', type: 'bounty', status: 'claimed' },
			{ id: 'dior-privee-fragrance-workshop', type: 'bounty', status: 'eligible' },
			{ id: 'gucci-osteria-dining-experience', type: 'bounty', status: 'eligible' },
			{ id: 'prada-mode-membership', type: 'bounty', status: 'claimed' },
			{ id: 'tiffany-diamond-academy', type: 'bounty', status: 'eligible' },
			{ id: 'rolex-sailing-experience', type: 'bounty', status: 'eligible' }
		],
		events,
		memberships,
		bounties
	})

	// Function to update a reward's status
	const updateRewardStatus = (id: number | string, type: RewardType, status: BadgeStatus) => {
		setState(prevState => {
			const rewardIndex = prevState.rewards.findIndex(
				reward => reward.id === id && reward.type === type
			)

			// If reward exists, update its status
			if (rewardIndex !== -1) {
				const updatedRewards = [...prevState.rewards]
				updatedRewards[rewardIndex] = { ...updatedRewards[rewardIndex], status }
				return { ...prevState, rewards: updatedRewards }
			}
			
			// If reward doesn't exist, add it
			return {
				...prevState,
				rewards: [...prevState.rewards, { id, type, status }]
			}
		})
	}

	// Function to get a reward's status
	const getRewardStatus = (id: number | string, type: RewardType): BadgeStatus => {
		const reward = state.rewards.find(
			reward => reward.id === id && reward.type === type
		)
		return reward?.status || 'eligible'
	}

	// Function to check if a reward is eligible
	const isRewardEligible = (id: number | string, type: RewardType): boolean => {
		return getRewardStatus(id, type) === 'eligible'
	}

	// Function to check if a reward is claimable
	const isRewardClaimable = (id: number | string, type: RewardType): boolean => {
		return getRewardStatus(id, type) === 'claimable'
	}

	// Function to check if a reward is claimed
	const isRewardClaimed = (id: number | string, type: RewardType): boolean => {
		return getRewardStatus(id, type) === 'claimed'
	}

	// Context value
	const value: AppStateContextType = {
		...state,
		updateRewardStatus,
		getRewardStatus,
		isRewardEligible,
		isRewardClaimable,
		isRewardClaimed
	}

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	)
} 