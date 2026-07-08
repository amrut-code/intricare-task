import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const ReplyPerformanceList: React.FC = () => {
  const replyPerformance = [
    { label: 'Follow-up', value: 80, color: 'bg-primary dark:bg-blue-500' },
    { label: 'InMail', value: 32, color: 'bg-green-600 dark:bg-green-500' },
    { label: 'Email', value: 11, color: 'bg-red-500 dark:bg-red-400' },
    { label: 'Connection Message', value: 79, color: 'bg-primary dark:bg-primary' }
  ]

  return (
    <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Reply Performance</CardTitle>
        <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Top reply channel</p>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {replyPerformance.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-zinc-300">{item.label}</span>
              <span className="text-slate-900 dark:text-white">{item.value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
              <div
                style={{ width: `${item.value}%` }}
                className={`h-full rounded-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
