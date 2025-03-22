import './styles.css'

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
		<view className={`progress-container ${className}`}>
			<view 
				className="progress-bar"
				style={{
					height: `${height}px`,
					backgroundColor: `rgba(255, 255, 255, 0.2)`
				}}
			>
				<view 
					className="progress-value"
					style={{
						width: `${safeProgress}%`,
						backgroundColor: color
					}}
				/>
			</view>
			{showLabel && (
				<text className="progress-label">{safeProgress}%</text>
			)}
		</view>
	)
} 