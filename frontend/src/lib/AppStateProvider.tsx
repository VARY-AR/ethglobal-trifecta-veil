import { createContext, useState, useContext } from '@lynx-js/react'
import type { ReactNode } from '@lynx-js/react'
import { events, memberships } from '../data/mockData.js'

// Define types for our state
type RewardType = 'event' | 'membership'

interface AppState {
	claimedRewards: {
		id: number
		type: RewardType
	}[]
	events: typeof events
	memberships: typeof memberships
}

interface AppStateContextType extends AppState {
	claimReward: (id: number, type: RewardType) => void
	isRewardClaimed: (id: number, type: RewardType) => boolean
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
		claimedRewards: [
			{ id: 1, type: 'event' } // Default: ASAP ROCKY event is claimed
		],
		events,
		memberships
	})

	// Function to claim a reward
	const claimReward = (id: number, type: RewardType) => {
		setState(prevState => ({
			...prevState,
			claimedRewards: [
				...prevState.claimedRewards,
				{ id, type }
			]
		}))
	}

	// Function to check if a reward is claimed
	const isRewardClaimed = (id: number, type: RewardType): boolean => {
		return state.claimedRewards.some(reward => 
			reward.id === id && reward.type === type
		)
	}

	// Context value
	const value: AppStateContextType = {
		...state,
		claimReward,
		isRewardClaimed
	}

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	)
} 