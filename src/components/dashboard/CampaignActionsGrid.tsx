import React from 'react'
import type { Campaign } from '../../pages/CampaignsList'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface CampaignActionsGridProps {
  campaign: Campaign
}

export const CampaignActionsGrid: React.FC<CampaignActionsGridProps> = ({ campaign }) => {
  return (
    <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Campaign Actions</CardTitle>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Execution stats & engagement signals</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-zinc-800">
          <button className="rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm dark:bg-zinc-900 dark:text-primary/80">
            LinkedIn
          </button>
          <button className="rounded-md px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:text-zinc-400">
            Email
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Side: Actions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Remaining Leads:</span>
              <span className="font-bold text-slate-900 dark:text-white">110</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Follow-up message:</span>
              <span className="font-bold text-slate-900 dark:text-white">10</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">InMails Sent:</span>
              <span className="font-bold text-slate-900 dark:text-white">20</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Emails:</span>
              <span className="font-bold text-slate-900 dark:text-white">89</span>
            </div>

            {/* Team Avatars Group */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500">Team:</span>
              <div className="flex -space-x-1.5">
                {campaign.senders.map((sender, idx) => (
                  <Avatar key={idx} className="h-6 w-6 border border-white dark:border-zinc-900">
                    <AvatarImage src={sender.avatarUrl} />
                    <AvatarFallback className="text-[9px] bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {sender.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Profile Statistics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Profile Viewed:</span>
              <span className="font-bold text-slate-900 dark:text-white">45</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Profile Followed:</span>
              <span className="font-bold text-slate-900 dark:text-white">140</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Skills Endorsed:</span>
              <span className="font-bold text-slate-900 dark:text-white">50</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">Comments Added:</span>
              <span className="font-bold text-slate-900 dark:text-white">54</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
