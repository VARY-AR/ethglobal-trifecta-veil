import './ProgressBar.css'

interface ProgressBarProps {
	progress: number // 0-100
	color?: string
	height?: number
	showLabel?: boolean
	className?: string
}

export function ProgressBar({
	progress,
	color = '#FFFFFF',
	height = 4,
	showLabel = false,
	className = ''
}: ProgressBarProps) {
	// Ensure progress is between 0-100
	const safeProgress = Math.min(Math.max(0, progress), 100)
	
	return (
		<view className={`ProgressBar ${className}`}>
			<view 
				className="ProgressBar__bar"
				style={{
					height: `${height}px`,
					backgroundColor: `rgba(255, 255, 255, 0.2)`
				}}
			>
				<view 
					className="ProgressBar__value"
					style={{
						width: `${safeProgress}%`,
						backgroundColor: color
					}}
				/>
			</view>
			{showLabel && (
				<text className="ProgressBar__label">{safeProgress}%</text>
			)}
		</view>
	)
} 