import { useState } from '@lynx-js/react'
import type { ReactNode } from '@lynx-js/react'
import './Badge.css'

export type BadgeStatus = 'eligible' | 'claimable' | 'claimed'

interface BadgeProps {
	status: BadgeStatus
	children?: ReactNode
	className?: string
	onClick?: () => void
	showTooltip?: boolean
}

export function Badge({
	status = 'eligible',
	children,
	className = '',
	onClick,
	showTooltip = true
}: BadgeProps) {
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)

	const getStatusLabel = () => {
		switch (status) {
			case 'eligible':
				return 'ELIGIBLE'
			case 'claimable':
				return 'CLAIMABLE'
			case 'claimed':
				return 'CLAIMED'
			default:
				return ''
		}
	}

	const getTooltipMessage = () => {
		switch (status) {
			case 'eligible':
				return 'You meet the requirements for this reward'
			case 'claimable':
				return 'Your ZK proof has been submitted, claim your reward!'
			case 'claimed':
				return 'You have already claimed this reward'
			default:
				return ''
		}
	}

	const handleTouch = () => {
		if (showTooltip) setIsTooltipVisible(true)
		setTimeout(() => {
			setIsTooltipVisible(false)
		}, 3000)
	}

	return (
		<view className="Badge__wrapper">
			<view
				className={`Badge Badge--${status} ${className}`}
				bindtap={() => {
					handleTouch()
					if (onClick) onClick()
				}}
			>
				<text className="Badge__text">{children || getStatusLabel()}</text>
			</view>
			{isTooltipVisible && (
				<view className="Badge__tooltip">
					<text className="Badge__tooltip-text">{getTooltipMessage()}</text>
				</view>
			)}
		</view>
	)
}