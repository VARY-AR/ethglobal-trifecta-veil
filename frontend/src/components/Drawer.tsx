import { useState, useEffect, type ReactNode } from '@lynx-js/react'
import './Drawer.css'

interface DrawerProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	height?: string | number
	closeOnOverlayClick?: boolean
	className?: string
}

export function Drawer({
	isOpen,
	onClose,
	children,
	height = '70%',
	closeOnOverlayClick = true,
	className = ''
}: DrawerProps) {
	const [isAnimating, setIsAnimating] = useState(false)
	
	useEffect(() => {
		if (isOpen) {
			setIsAnimating(true)
		} else {
			// Add small delay before removing from DOM
			const timer = setTimeout(() => {
				setIsAnimating(false)
			}, 300)
			
			return () => clearTimeout(timer)
		}
	}, [isOpen])
	
	if (!isOpen && !isAnimating) return null
	
	return (
		<view className={`Drawer ${isOpen ? 'Drawer--open' : 'Drawer--closing'}`}>
			<view 
				className="Drawer__overlay" 
				bindtap={closeOnOverlayClick ? onClose : undefined}
			/>
			<view 
				className={`Drawer__content ${className}`}
				style={{ 
					height: typeof height === 'number' ? `${height}px` : height 
				}}
			>
				{children}
			</view>
		</view>
	)
} 