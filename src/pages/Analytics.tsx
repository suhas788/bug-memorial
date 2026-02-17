import { motion } from 'framer-motion';
import { SeverityDistribution, ModuleHotspots, TimeToFixTrend, BugStatusOverview } from '@/components/AnalyticsCharts';
import { mockBugs } from '@/data/mockBugs';

export default function Analytics() {
  const totalBugs = mockBugs.length;
  const closedBugs = mockBugs.filter(b => b.status === 'closed').length;
  const avgFix = Math.round(mockBugs.filter(b => b.timeToFix).reduce((a, b) => a + (b.timeToFix || 0), 0) / mockBugs.filter(b => b.timeToFix).length);
  const criticalCount = mockBugs.filter(b => b.severity === 'critical').length;

  const metrics = [
    { label: 'Total Bugs', value: totalBugs },
    { label: 'Resolved', value: closedBugs },
    { label: 'Resolution Rate', value: `${Math.round((closedBugs / totalBugs) * 100)}%` },
    { label: 'Avg Fix Time', value: `${avgFix}h` },
    { label: 'Critical Bugs', value: criticalCount },
    { label: 'Lessons Captured', value: mockBugs.filter(b => b.lessonsLearned).length },
  ];

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground mb-8">Insights from the graveyard. Learn from the dead.</p>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4">
          <ChartCard title="Severity Distribution">
            <SeverityDistribution />
          </ChartCard>
          <ChartCard title="Bug Status Overview">
            <BugStatusOverview />
          </ChartCard>
          <ChartCard title="Module Hotspots">
            <ModuleHotspots />
          </ChartCard>
          <ChartCard title="Time to Fix Trend">
            <TimeToFixTrend />
          </ChartCard>
        </div>
      </motion.div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}
