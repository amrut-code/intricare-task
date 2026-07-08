import React from 'react'
import { useParams } from 'react-router-dom'
import { useCampaigns } from '../pages/CampaignsList'
import { Pause, Edit2, Mail, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Progress } from '../components/ui/progress'
import { motion } from 'framer-motion'

// Sub-components imports
import { CampaignWizardSteps } from '../components/dashboard/CampaignWizardSteps'
import { CampaignOverviewChart } from '../components/dashboard/CampaignOverviewChart'
import { CampaignActionsGrid } from '../components/dashboard/CampaignActionsGrid'
import { ReplyAnalysisCard } from '../components/dashboard/ReplyAnalysisCard'
import { ReplyPerformanceList } from '../components/dashboard/ReplyPerformanceList'
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline'

export const CampaignDetail: React.FC = () => {
  const { campaigns, toggleCampaignStatus } = useCampaigns()
  const { id } = useParams<{ id: string }>()

  // Find target campaign
  const campaign = campaigns.find(c => c.id === id) || campaigns[0]

  if (!campaign) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400 dark:text-zinc-500">
        Campaign not found.
      </div>
    )
  }

  const progressPercent = Math.round((campaign.prospectsProcessed / campaign.prospectsTotal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* 4-Step Stepper Component */}
      <CampaignWizardSteps />

      {/* Stepper Details / Campaign Status Panel */}
      <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left Details */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{campaign.name}</h2>
                <div className="flex gap-1.5">
                  {campaign.channels.map(channel => (
                    <span
                      key={channel}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold border ${
                        channel === 'LinkedIn'
                          ? 'bg-blue-50/50 text-primary border-primary/10 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50'
                          : 'bg-primary/5 text-primary border-primary/10 dark:bg-primary/10 dark:text-primary/80 dark:border-primary/25'
                      }`}
                    >
                      {channel === 'LinkedIn' ? null : <Mail className="h-3 w-3" />}
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                <span>Created: 8 Jan, 2026</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-zinc-700" />
                <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  CRM Connected
                </span>
              </div>
            </div>

            {/* Middle Stats - Progress Bar */}
            <div className="flex-1 max-w-md space-y-2 md:mx-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-300">
                <span>Prospects Processed</span>
                <span>
                  {campaign.prospectsProcessed} / {campaign.prospectsTotal} ({progressPercent}%)
                </span>
              </div>
              <Progress value={progressPercent} className="h-2 bg-slate-100 dark:bg-zinc-800" />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleCampaignStatus(campaign.id)}
                className={`gap-1.5 h-9 font-semibold text-xs border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 ${
                  campaign.status === 'Running'
                    ? 'text-green-600 dark:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-950/20'
                    : 'text-slate-600 dark:text-zinc-300 hover:bg-slate-50'
                }`}
              >
                {campaign.status === 'Running' ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span>Running</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5 text-amber-500" />
                    <span>Paused</span>
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon-sm" className="border-slate-200 dark:border-zinc-700 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Overview Card (Component) */}
          <CampaignOverviewChart />

          {/* Campaign Actions Grid (Component) */}
          <CampaignActionsGrid campaign={campaign} />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Reply Analysis Gauge Card (Component) */}
          <ReplyAnalysisCard />

          {/* Reply Performance Card (Component) */}
          <ReplyPerformanceList />

          {/* Recent Activity Timeline (Component) */}
          <ActivityTimeline />
        </div>
      </div>
    </motion.div>
  )
}
