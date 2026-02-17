import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle2, Search, Wrench, FlaskConical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Bug, Severity, Status } from '@/data/mockBugs';

const severityConfig: Record<Severity, { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-severity-critical/20 text-severity-critical border-severity-critical/30' },
  high: { label: 'High', className: 'bg-severity-high/20 text-severity-high border-severity-high/30' },
  medium: { label: 'Medium', className: 'bg-severity-medium/20 text-severity-medium border-severity-medium/30' },
  low: { label: 'Low', className: 'bg-severity-low/20 text-severity-low border-severity-low/30' },
  info: { label: 'Info', className: 'bg-severity-info/20 text-severity-info border-severity-info/30' },
};

const statusIcons: Record<Status, React.ReactNode> = {
  open: <AlertTriangle className="h-3.5 w-3.5" />,
  investigating: <Search className="h-3.5 w-3.5" />,
  fixing: <Wrench className="h-3.5 w-3.5" />,
  testing: <FlaskConical className="h-3.5 w-3.5" />,
  closed: <CheckCircle2 className="h-3.5 w-3.5" />,
};

export default function BugCard({ bug, index = 0 }: { bug: Bug; index?: number }) {
  const sev = severityConfig[bug.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/bugs/${bug.id}`} className="block group">
        <div className="relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-moss hover:bg-card/80">
          {/* Tombstone arch decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-16 h-1 rounded-b-full bg-primary/30 group-hover:bg-primary/60 transition-colors" />

          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-mono mb-1">{bug.id}</p>
              <h3 className="font-display text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {bug.title}
              </h3>
            </div>
            <Badge variant="outline" className={sev.className}>
              {sev.label}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{bug.description}</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {statusIcons[bug.status]}
              <span className="capitalize">{bug.status}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{bug.module}</span>
              {bug.timeToFix && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {bug.timeToFix}h
                </span>
              )}
            </div>
          </div>

          {bug.status === 'closed' && bug.rip && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs italic text-muted-foreground font-display">🪦 {bug.rip}</p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export { severityConfig, statusIcons };
