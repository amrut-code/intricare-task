import React from 'react'
import { Users, UserCheck, Settings, BarChart3, ChevronRight } from 'lucide-react'

export const CampaignWizardSteps: React.FC = () => {
  const steps = [
    { label: 'Define Target Audience', icon: Users, completed: true, active: false },
    { label: 'Sender Profiles', icon: UserCheck, completed: true, active: false },
    { label: 'Settings', icon: Settings, completed: true, active: false },
    { label: 'Stats', icon: BarChart3, completed: false, active: true }
  ]

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full">
        {steps.map((step, idx) => {
          const Icon = step.icon
          return (
            <div key={idx} className="flex flex-1 min-w-[150px] items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-all ${
                  step.active
                    ? 'border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/10 dark:text-primary/80'
                    : step.completed
                    ? 'border-primary/20 bg-primary/5 text-primary dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400'
                    : 'border-slate-200 bg-white text-slate-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    step.active
                      ? 'text-primary dark:text-primary/80'
                      : 'text-slate-400 dark:text-zinc-500'
                  }`}
                >
                  Step {idx + 1}
                </span>
                <span
                  className={`text-xs font-bold ${
                    step.active
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-zinc-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <ChevronRight className="hidden h-5 w-5 text-slate-300 dark:text-zinc-700 md:block ml-auto" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
