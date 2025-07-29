'use client'

import { useEffect, useRef, useState, useMemo, useId } from 'react'
import * as echarts from 'echarts'
import { Crypto } from '@/types/crypto'

interface MobulaChartProps {
  crypto: Crypto
  timeframe: string
  height?: number | string
  width?: number | string
}

export default function MobulaChart({ crypto, timeframe, height = 400, width = '100%' }: MobulaChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const chartId = useId()

  // Generate realistic price data based on timeframe
  const chartData = useMemo(() => {
    const getDataPoints = (tf: string) => {
      switch (tf) {
        case '1D': return 144 // Every 10 minutes for 1 day
        case '7D': return 168 // Hourly for 7 days
        case '1M': return 720 // Every 1 hour for 30 days
        case '3M': return 1080 // Every 2 hours for 3 months
        case '1Y': return 365 // Daily for 1 year
        case 'ALL': return 1000 // Weekly for ~20 years
        default: return 144
      }
    }

    const points = getDataPoints(timeframe)
    const data: [number, number][] = []
    const now = Date.now()
    
    // Calculate interval based on timeframe
    const getInterval = (tf: string) => {
      switch (tf) {
        case '1D': return 600000 // 10 minutes
        case '7D': return 3600000 // 1 hour
        case '1M': return 3600000 // 1 hour
        case '3M': return 7200000 // 2 hours
        case '1Y': return 86400000 // 1 day
        case 'ALL': return 604800000 // 1 week
        default: return 600000
      }
    }

    const interval = getInterval(timeframe)
    
    for (let i = points - 1; i >= 0; i--) {
      const timestamp = now - (i * interval)
      
      // Create realistic price movement with trend (deterministic for SSR compatibility)
      const progress = (points - 1 - i) / (points - 1)
      const trendComponent = (crypto.change24h / 100) * progress
      const waveComponent = Math.sin(progress * Math.PI * 4) * 0.005
      
      // Use deterministic pseudo-random based on crypto symbol and index
      const seed = crypto.symbol.charCodeAt(0) + crypto.symbol.charCodeAt(1 % crypto.symbol.length) + i
      const pseudoRandom = (Math.sin(seed) + 1) / 2 // Normalized to 0-1
      const randomComponent = (pseudoRandom - 0.5) * 0.02
      
      const volatilityComponent = Math.sin(progress * Math.PI * 20) * 0.001
      
      const priceMultiplier = 1 + trendComponent + waveComponent + randomComponent + volatilityComponent
      const price = crypto.price * priceMultiplier
      
      data.push([timestamp, Math.round(price * 100) / 100])
    }
    
    return data
  }, [timeframe, crypto.price, crypto.change24h])

  // Initialize and update chart
  useEffect(() => {
    if (!chartRef.current) return

    // Initialize chart if not exists
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, {
        renderer: 'canvas',
        useDirtyRect: false,
      })
    }

    const chart = chartInstance.current

    // Determine chart color based on overall trend
    const startPrice = chartData[0]?.[1] || crypto.price
    const endPrice = chartData[chartData.length - 1]?.[1] || crypto.price
    const isPositiveTrend = endPrice >= startPrice
    const lineColor = isPositiveTrend ? '#16C784' : '#EA3943'
    const areaColor = isPositiveTrend 
      ? ['rgba(22, 199, 132, 0.2)', 'rgba(22, 199, 132, 0.02)']
      : ['rgba(234, 57, 67, 0.2)', 'rgba(234, 57, 67, 0.02)']

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      
      grid: {
        left: '2%',
        right: '2%',
        top: '5%',
        bottom: '15%',
        containLabel: true,
      },
      
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#616E85',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          formatter: (value: number) => {
            const date = new Date(value)
            if (timeframe === '1D') {
              return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            } else if (timeframe === '7D' || timeframe === '1M') {
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            } else {
              return date.toLocaleDateString('en-US', { year: '2-digit', month: 'short' })
            }
          },
        },
        splitLine: {
          show: false,
        },
      },
      
      yAxis: {
        type: 'value',
        scale: true,
        position: 'right',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#616E85',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          formatter: (value: number) => {
            if (value >= 1000000) {
              return `$${(value / 1000000).toFixed(1)}M`
            } else if (value >= 1000) {
              return `$${(value / 1000).toFixed(1)}K`
            }
            return `$${value.toLocaleString()}`
          },
        },
        splitLine: {
          lineStyle: {
            color: '#EFF2F5',
            width: 1,
            type: 'solid',
          },
        },
      },
      
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#FFFFFF',
        borderColor: '#EFF2F5',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textStyle: {
          color: '#0D1421',
          fontSize: 12,
          fontFamily: 'Inter, sans-serif',
        },
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);',
        formatter: (params: any) => {
          const data = params[0]
          const price = data.value[1]
          const time = new Date(data.value[0])
          
          let timeStr = ''
          if (timeframe === '1D') {
            timeStr = time.toLocaleString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              month: 'short',
              day: 'numeric'
            })
          } else {
            timeStr = time.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'short', 
              day: 'numeric' 
            })
          }
          
          return `
            <div style="font-weight: 500; margin-bottom: 4px;">${timeStr}</div>
            <div style="font-weight: 600; font-size: 14px;">$${price.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}</div>
          `
        },
      },
      
      series: [
        {
          type: 'line',
          data: chartData,
          smooth: 0.3,
          symbol: 'none',
          lineStyle: {
            color: lineColor,
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: areaColor[0] },
              { offset: 1, color: areaColor[1] },
            ]),
          },
          emphasis: {
            focus: 'series',
            lineStyle: {
              width: 3,
            },
          },
        },
      ],
      
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
          filterMode: 'none',
        },
      ],
    }

    chart.setOption(option, true)

    // Handle resize
    const handleResize = () => {
      chart.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [chartData, timeframe, crypto.price])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [])

  return (
    <div 
      id={chartId}
      ref={chartRef} 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: '300px'
      }}
      className="w-full"
    />
  )
}