import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { mockBugs } from '@/data/mockBugs';

const SEVERITY_COLORS = {
  critical: 'hsl(0, 75%, 50%)',
  high: 'hsl(25, 85%, 55%)',
  medium: 'hsl(38, 80%, 55%)',
  low: 'hsl(150, 30%, 45%)',
  info: 'hsl(200, 40%, 50%)',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-tombstone">
      <p className="text-xs font-medium text-foreground">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-xs text-muted-foreground">
          {entry.name}: <span className="text-foreground font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export function SeverityDistribution() {
  const data = Object.entries(
    mockBugs.reduce((acc, bug) => {
      acc[bug.severity] = (acc[bug.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
          {data.map((entry) => (
            <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name as keyof typeof SEVERITY_COLORS]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ModuleHotspots() {
  const moduleCount = mockBugs.reduce((acc, bug) => {
    bug.impactedModules.forEach(m => {
      acc[m] = (acc[m] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(moduleCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
        <XAxis type="number" tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} />
        <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} width={120} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill="hsl(150, 30%, 35%)" radius={[0, 4, 4, 0]} name="Bugs" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TimeToFixTrend() {
  const data = mockBugs
    .filter(b => b.timeToFix)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(b => ({
      name: b.id,
      hours: b.timeToFix,
    }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="ttfGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(150, 30%, 35%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(150, 30%, 35%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
        <XAxis dataKey="name" tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
        <YAxis tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="hours" stroke="hsl(150, 30%, 35%)" fill="url(#ttfGradient)" name="Hours to fix" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BugStatusOverview() {
  const statusCount = mockBugs.reduce((acc, bug) => {
    acc[bug.status] = (acc[bug.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCount).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
        <XAxis dataKey="name" tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} />
        <YAxis tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="hsl(38, 80%, 55%)" radius={[4, 4, 0, 0]} name="Count" />
      </BarChart>
    </ResponsiveContainer>
  );
}
