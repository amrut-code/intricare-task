import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const CampaignOverviewChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'email'>('linkedin')

  const overviewData = [
    { name: 'New Leads', value: 1628, color: '#6366f1', percentage: null },
    { name: 'Invites Sent', value: 988, color: '#3b82f6', percentage: '87%' },
    { name: 'Invites Accepted', value: 507, color: '#14b8a6', percentage: '49%' },
    { name: 'Messages Sent', value: 460, color: '#22c55e', percentage: '91%' },
    { name: 'Replies', value: 202, color: '#10b981', percentage: '44%' }
  ]

  return (
    <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
          Campaign Overview
        </CardTitle>
        {/* Channel Toggle */}
        <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-zinc-800">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'linkedin'
                ? 'bg-white text-primary shadow-sm dark:bg-zinc-900 dark:text-primary/80'
                : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <span>LinkedIn</span>
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-all ${
              activeTab === 'email'
                ? 'bg-white text-primary shadow-sm dark:bg-zinc-900 dark:text-primary/80'
                : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <Mail className="h-3 w-3" />
            <span>Email</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-5 gap-3 h-72 items-end">
          {overviewData.map((data, idx) => {
            const maxHeight = 1628
            const percentHeight = Math.max(15, Math.round((data.value / maxHeight) * 100))

            return (
              <div key={idx} className="flex flex-col items-center h-full justify-end group">
                <div className="mb-2 text-center">
                  <span className="block text-xs font-medium text-slate-400 dark:text-zinc-500">
                    {data.name}
                  </span>
                  <span className="block font-bold text-sm text-slate-900 dark:text-white">
                    {data.value.toLocaleString()}
                    {data.percentage && (
                      <span className="text-[10px] text-green-500 font-semibold ml-1">
                        ({data.percentage})
                      </span>
                    )}
                  </span>
                </div>

                <div
                  style={{ height: `${percentHeight}%`, backgroundColor: data.color }}
                  className="w-full rounded-lg opacity-85 hover:opacity-100 transition-all duration-300 shadow-sm relative group-hover:scale-y-[1.02] origin-bottom"
                >
                  <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
