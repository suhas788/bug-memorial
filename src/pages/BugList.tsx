import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockBugs } from '@/data/mockBugs';
import BugCard from '@/components/BugCard';
import SearchFilter from '@/components/SearchFilter';

export default function BugList() {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('all');
  const [status, setStatus] = useState('all');
  const [module, setModule] = useState('all');

  const filtered = useMemo(() => {
    return mockBugs.filter(bug => {
      if (search && !bug.title.toLowerCase().includes(search.toLowerCase()) && !bug.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (severity !== 'all' && bug.severity !== severity) return false;
      if (status !== 'all' && bug.status !== status) return false;
      if (module !== 'all' && !bug.impactedModules.includes(module)) return false;
      return true;
    });
  }, [search, severity, status, module]);

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Bug Graveyard</h1>
        <p className="text-muted-foreground mb-6">All recorded production incidents, living and dead.</p>

        <SearchFilter
          search={search} onSearchChange={setSearch}
          severity={severity} onSeverityChange={setSeverity}
          status={status} onStatusChange={setStatus}
          module={module} onModuleChange={setModule}
        />

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {filtered.map((bug, i) => (
            <BugCard key={bug.id} bug={bug} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-display text-lg italic">No bugs found. The graveyard is empty... for now.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
