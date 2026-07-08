import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Clock, ArrowUpRight } from 'lucide-react'

export const ActivityTimeline: React.FC = () => {
  const navigate = useNavigate()

  const timelineEvents = [
    { time: '09:14 AM', text: 'Campaign started', user: 'Aman S.', type: 'start', color: 'bg-blue-500' },
    { time: '10:30 AM', text: 'Reply received', user: 'Suresh K.', type: 'reply', color: 'bg-primary' },
    { time: '11:15 AM', text: 'Follow-up message sent', user: 'System', type: 'followup', color: 'bg-pink-500' },
    { time: '11:39 AM', text: 'Connection accepted', user: 'Suresh K. (Prospect)', type: 'accept', color: 'bg-teal-500' },
    { time: '11:48 AM', text: 'Campaign paused', user: 'Aman S.', type: 'pause', color: 'bg-amber-500' }
  ]

  return (
    <Card className="border-slate-200 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="pb-2 border-b border-slate-100 dark:border-zinc-800">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
          Recent Campaign Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-100 dark:border-zinc-800 pl-4.5 space-y-5 ml-1">
          {timelineEvents.map((event, idx) => (
            <div key={idx} className="relative group">
              {/* Circle Node */}
              <span className={`absolute -left-[25px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 ${event.color}`} />

              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {event.time}
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 mt-0.5">
                  {event.text}
                </p>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500">
                  {event.type === 'followup' ? 'via ' : 'by '}
                  <span className="text-primary dark:text-primary/80 font-semibold">{event.user}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Open Activity Log Link */}
        <div className="mt-5 text-center border-t border-slate-100 pt-3 dark:border-zinc-800">
          <button
            onClick={() => navigate('/campaigns')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary dark:text-primary/80 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Open Activity Log</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
