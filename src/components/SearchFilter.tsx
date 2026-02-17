import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { severities, statuses, modules } from '@/data/mockBugs';

interface SearchFilterProps {
  search: string;
  onSearchChange: (v: string) => void;
  severity: string;
  onSeverityChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  module: string;
  onModuleChange: (v: string) => void;
}

export default function SearchFilter({
  search, onSearchChange,
  severity, onSeverityChange,
  status, onStatusChange,
  module, onModuleChange,
}: SearchFilterProps) {
  const hasFilters = search || severity !== 'all' || status !== 'all' || module !== 'all';

  const clearAll = () => {
    onSearchChange('');
    onSeverityChange('all');
    onStatusChange('all');
    onModuleChange('all');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bugs..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-secondary border-border"
        />
      </div>
      <Select value={severity} onValueChange={onSeverityChange}>
        <SelectTrigger className="w-[140px] bg-secondary border-border">
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Severity</SelectItem>
          {severities.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px] bg-secondary border-border">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statuses.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={module} onValueChange={onModuleChange}>
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue placeholder="Module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modules</SelectItem>
          {modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
      {hasFilters && (
        <Button variant="ghost" size="icon" onClick={clearAll} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
