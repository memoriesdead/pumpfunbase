'use client'

interface MiniChartProps {
  data: number[]
  positive: boolean
}

export default function MiniChart({ data, positive }: MiniChartProps) {
  // Always show a chart, even with fallback data
  const chartData = data && data.length >= 2 ? data : [10, 12, 8, 15, 9, 14, 11, 13]

  // Take a subset of data points for cleaner visualization
  const sampledData = chartData.filter((_, index) => 
    index % Math.max(1, Math.floor(chartData.length / 30)) === 0
  )
  
  const max = Math.max(...sampledData)
  const min = Math.min(...sampledData)
  const range = max - min || 1 // Avoid division by zero

  const points = sampledData.map((value, index) => {
    const x = (index / (sampledData.length - 1)) * 80 // 80px width for padding
    const y = 4 + ((max - value) / range) * 40 // 40px height with 4px padding
    return `${x + 8},${y}` // 8px left padding
  }).join(' ')

  const dataHash = Date.now().toString() // Use timestamp for unique ID
  const gradientId = `gradient-${positive ? 'green' : 'red'}-${dataHash}`

  return (
    <div className="w-24 h-12 flex items-center">
      <svg width="96" height="48" className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={positive ? '#16C784' : '#EA3943'} stopOpacity="0.2"/>
            <stop offset="100%" stopColor={positive ? '#16C784' : '#EA3943'} stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Background area */}
        <polygon
          fill={`url(#${gradientId})`}
          points={`8,44 ${points} 88,44`}
        />
        {/* Line chart */}
        <polyline
          fill="none"
          stroke={positive ? '#16C784' : '#EA3943'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  )
}