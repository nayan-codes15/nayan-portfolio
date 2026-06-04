'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart as ChartIcon } from 'lucide-react'

interface LanguageChartProps {
  data: { name: string; count: number }[]
}

const COLORS = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb923c']

export default function LanguageChart({ data }: LanguageChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length]
    }))
  }, [data])

  if (!chartData.length) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 rounded-2xl border border-[var(--border)] h-full flex flex-col"
    >
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ChartIcon className="w-5 h-5 text-[var(--accent-1)]" />
        Most Used Languages
      </h3>

      <div className="flex-grow min-h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="count"
              animationBegin={200}
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="text-2xl font-bold">{chartData.length}</span>
            <span className="block text-xs text-[var(--text-muted)]">Top Langs</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
