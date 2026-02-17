import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, CheckCircle2, AlertTriangle, BookOpen, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBugs } from '@/data/mockBugs';
import BugTimeline from '@/components/BugTimeline';
import { severityConfig } from '@/components/BugCard';

export default function BugDetail() {
  const { id } = useParams();
  const bug = mockBugs.find(b => b.id === id);

  if (!bug) {
    return (
      <div className="container py-20 text-center">
        <p className="font-display text-xl text-muted-foreground">This bug was never born... or was it?</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/bugs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Graveyard</Link>
        </Button>
      </div>
    );
  }

  const sev = severityConfig[bug.severity];

  return (
    <div className="container py-8 max-w-4xl">
      <Button asChild variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
        <Link to="/bugs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Graveyard</Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-muted-foreground">{bug.id}</span>
            <Badge variant="outline" className={sev.className}>{sev.label}</Badge>
            <Badge variant="outline" className={`capitalize ${bug.status === 'closed' ? 'border-primary/30 text-primary' : 'border-accent/30 text-accent'}`}>
              {bug.status === 'closed' ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <AlertTriangle className="mr-1 h-3 w-3" />}
              {bug.status}
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{bug.title}</h1>

          {bug.rip && (
            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-4">
              <p className="font-display italic text-foreground">🪦 "{bug.rip}"</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {bug.assignee}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {format(new Date(bug.createdAt), 'MMM d, yyyy')}</span>
            {bug.timeToFix && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {bug.timeToFix}h to fix</span>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Description">
              <p className="text-secondary-foreground">{bug.description}</p>
            </Section>

            <Section title="Root Cause">
              <p className="text-secondary-foreground">{bug.rootCause}</p>
            </Section>

            {bug.fix && (
              <Section title="Fix Applied">
                <p className="text-secondary-foreground">{bug.fix}</p>
              </Section>
            )}

            {bug.lessonsLearned && (
              <Section title="Lessons Learned" icon={<BookOpen className="h-4 w-4 text-primary" />}>
                <p className="text-secondary-foreground">{bug.lessonsLearned}</p>
              </Section>
            )}

            {bug.prevention.length > 0 && (
              <Section title="Prevention Checklist" icon={<ShieldCheck className="h-4 w-4 text-primary" />}>
                <ul className="space-y-2">
                  {bug.prevention.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-secondary-foreground">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">Timeline</h3>
              <BugTimeline events={bug.timeline} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Impacted Modules</h3>
              <div className="flex flex-wrap gap-2">
                {bug.impactedModules.map(m => (
                  <span key={m} className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground">{m}</span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Reporter</dt>
                  <dd className="text-foreground">{bug.reporter}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Assignee</dt>
                  <dd className="text-foreground">{bug.assignee}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Module</dt>
                  <dd className="text-foreground">{bug.module}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}
