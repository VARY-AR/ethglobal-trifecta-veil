import './RewardTicket.css'
import { Drawer } from './Drawer.js'
import { Button } from './Button.js'
import type { Bounty } from '../data/mockData.js'
import qrCode from '$/assets/qr.png'

interface RewardTicketProps {
	isOpen: boolean
	onClose: () => void
	event?: {
		id: number
		title: string
		date: string
		location?: string
	}
	bounty?: Bounty
}

export function RewardTicket({ isOpen, onClose, event, bounty }: RewardTicketProps) {
	const getTitle = () => {
		if (event) return event.title
		if (bounty) return bounty.name
		return ''
	}
	
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<view className="RewardTicket">
				<text className="RewardTicket__close" bindtap={onClose}>CLOSE</text>
				
				<view className="RewardTicket__content">
					<text className="RewardTicket__title">{getTitle()}</text>
					<text className="RewardTicket__subtitle">VIP ALL AREA PASS</text>
					
					<view className="RewardTicket__image-container">
						{bounty && bounty.imageUri ? (
							<image src={bounty.imageUri} className="RewardTicket__image" />
						) : (
							<view className="RewardTicket__placeholder-image"></view>
						)}
					</view>
					
					<view className="RewardTicket__qr-container">
						{/* QR code image */}
						<image src={qrCode} className="RewardTicket__qr-code" />
					</view>
				</view>
			</view>
		</Drawer>
	)
} 