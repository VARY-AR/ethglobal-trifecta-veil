import './RewardTicket.css'
import { Drawer } from './Drawer.js'
import { Button } from './Button.js'

interface RewardTicketProps {
	isOpen: boolean
	onClose: () => void
	event: {
		id: number
		title: string
		date: string
		location?: string
	}
}

export function RewardTicket({ isOpen, onClose, event }: RewardTicketProps) {
	return (
		<Drawer isOpen={isOpen} onClose={onClose}>
			<view className="RewardTicket">
				<text className="RewardTicket__close" bindtap={onClose}>CLOSE</text>
				
				<view className="RewardTicket__content">
					<text className="RewardTicket__title">{event.title}</text>
					<text className="RewardTicket__subtitle">VIP ALL AREA PASS</text>
					
					<view className="RewardTicket__image-container">
						{/* Replace with actual image of the event/artist */}
						<view className="RewardTicket__placeholder-image"></view>
					</view>
					
					<view className="RewardTicket__qr-container">
						{/* Placeholder for QR code - in a real app this would be generated */}
						<view className="RewardTicket__qr-code">
							<text>QR Code</text>
						</view>
					</view>
				</view>
			</view>
		</Drawer>
	)
} 