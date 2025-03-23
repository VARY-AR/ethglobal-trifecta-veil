import { useState } from '@lynx-js/react'
import { Drawer } from './Drawer.js'
import { WalletManager } from './WalletManager.js'
import '$/shared/layout.css'
import '$/shared/global.css'
import './Header.css'
import { Button } from './Button.jsx'

export function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	
	const openDrawer = () => setIsDrawerOpen(true)
	const closeDrawer = () => setIsDrawerOpen(false)
	
	return (
		<view className="header">
			<view className="container">
				<view className="header-logo">
					<text className="logo">VEIL</text>
				</view>
				
				<view className="header-actions">
					<Button 
						className="kebab-menu"
						bindtap={openDrawer}
						aria-label="Open wallet manager"
					>
						<view className="kebab-dot"></view>
						<view className="kebab-dot"></view>
						<view className="kebab-dot"></view>
					</Button>
				</view>
			</view>

			<Drawer 
				isOpen={isDrawerOpen} 
				onClose={closeDrawer}
				height="90%"
			>
				<WalletManager />
			</Drawer>
		</view>
	)
} 