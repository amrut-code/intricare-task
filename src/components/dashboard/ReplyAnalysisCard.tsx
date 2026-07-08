import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { useThemeStore } from '../../store/useThemeStore'

export const ReplyAnalysisCard: React.FC = () => {
  const { theme } = useThemeStore()

  const replyAnalysisData = [
    {
      name: 'Discussions',
      value: 80,
      fill: '#4f46e5'
    }
  ]

  return (
    <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Reply Analysis</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col items-center">
        {/* Semi-circular radial gauge representation */}
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden">
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart
              cx="50%"
              cy="80%"
              innerRadius="65%"
              outerRadius="100%"
              barSize={12}
              data={replyAnalysisData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                background={{ fill: theme === 'dark' ? '#1f2937' : '#f1f5f9' }}
                dataKey="value"
                cornerRadius={6}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute bottom-[20%] flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white">80%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Discussions
            </span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="mt-4 grid grid-cols-3 gap-2 w-full text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 justify-center">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">Positive</span>
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-0.5">12%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 justify-center">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">Neutral</span>
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-0.5">14%</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 justify-center">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">Negative</span>
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-0.5">8%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
