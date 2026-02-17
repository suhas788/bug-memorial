import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skull, ArrowRight, Bug, Clock, Shield, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBugs } from '@/data/mockBugs';
import BugCard from '@/components/BugCard';
import { SeverityDistribution, TimeToFixTrend } from '@/components/AnalyticsCharts';
import heroImage from '@/assets/hero-graveyard.jpg';

const stats = [
  { label: 'Bugs Buried', value: mockBugs.filter(b => b.status === 'closed').length, icon: Skull },
  { label: 'Still Haunting', value: mockBugs.filter(b => b.status !== 'closed').length, icon: Bug },
  { label: 'Avg Fix Time', value: `${Math.round(mockBugs.filter(b => b.timeToFix).reduce((a, b) => a + (b.timeToFix || 0), 0) / mockBugs.filter(b => b.timeToFix).length)}h`, icon: Clock },
  { label: 'Lessons Learned', value: mockBugs.filter(b => b.lessonsLearned).length, icon: Shield },
];

export default function Index() {
  const recentBugs = mockBugs.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Skull className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Post-Mortem Platform</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-4">
              Where Production Bugs<br />
              <span className="text-primary">Rest in Peace</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Record, analyze, and learn from every production incident. Turn your team's pain into engineering wisdom.
            </p>
            <div className="flex gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/bugs">
                  View Graveyard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary">
                <Link to="/analytics">Analytics</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
              <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Bugs */}
      <section className="container pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Recent Tombstones</h2>
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link to="/bugs">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {recentBugs.map((bug, i) => (
            <BugCard key={bug.id} bug={bug} index={i} />
          ))}
        </div>
      </section>

      {/* Quick Analytics */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">At a Glance</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Severity Distribution</h3>
            <SeverityDistribution />
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Time to Fix Trend</h3>
            <TimeToFixTrend />
          </div>
        </div>
      </section>
    </div>
  );
}
