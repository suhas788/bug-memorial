import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { TimelineEvent } from '@/data/mockBugs';

const eventColors: Record<string, string> = {
  'Discovered': 'bg-severity-critical',
  'Assigned': 'bg-severity-medium',
  'Root Cause Found': 'bg-severity-info',
  'Fix Deployed': 'bg-primary',
  'Verified': 'bg-severity-low',
  'Closed': 'bg-primary',
};

export default function BugTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="relative flex gap-4 pl-4"
          >
            {/* Dot */}
            <div className={`absolute left-4 -translate-x-1/2 mt-1.5 w-3 h-3 rounded-full border-2 border-background ${eventColors[event.event] || 'bg-muted-foreground'}`} />

            <div className="ml-6 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-sm font-semibold text-foreground">{event.event}</h4>
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {format(new Date(event.date), 'MMM d, HH:mm')}
                </time>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">by {event.user}</p>
              {event.detail && (
                <p className="text-sm text-secondary-foreground mt-1 bg-secondary/50 rounded px-2 py-1 inline-block">
                  {event.detail}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
