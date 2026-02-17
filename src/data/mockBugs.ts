export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type Status = 'open' | 'investigating' | 'fixing' | 'testing' | 'closed';

export interface TimelineEvent {
  date: string;
  event: string;
  user: string;
  detail?: string;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  rootCause: string;
  severity: Severity;
  status: Status;
  module: string;
  fix: string;
  lessonsLearned: string;
  prevention: string[];
  impactedModules: string[];
  timeline: TimelineEvent[];
  createdAt: string;
  closedAt?: string;
  assignee: string;
  reporter: string;
  timeToFix?: number; // hours
  rip?: string; // funny epitaph
}

export const mockBugs: Bug[] = [
  {
    id: 'BUG-001',
    title: 'The Null Pointer of Doom',
    description: 'User dashboard crashes when loading profile data for users who never set an avatar. The entire page white-screens with an unhandled TypeError.',
    rootCause: 'Missing null check on user.profile.avatar before calling .toUpperCase() on the file extension.',
    severity: 'critical',
    status: 'closed',
    module: 'User Dashboard',
    fix: 'Added optional chaining and fallback default avatar URL.',
    lessonsLearned: 'Always assume external data can be null. Never trust API responses without validation.',
    prevention: ['Add zod schema validation for all API responses', 'Set up error boundaries per route', 'Add integration tests for null data scenarios'],
    impactedModules: ['User Dashboard', 'Profile Service', 'Avatar Component'],
    timeline: [
      { date: '2025-03-15T09:00:00Z', event: 'Discovered', user: 'Sarah Chen', detail: 'Customer reported white screen' },
      { date: '2025-03-15T09:30:00Z', event: 'Assigned', user: 'Mike Johnson', detail: 'P0 escalation' },
      { date: '2025-03-15T11:00:00Z', event: 'Root Cause Found', user: 'Mike Johnson', detail: 'Null pointer in avatar component' },
      { date: '2025-03-15T13:00:00Z', event: 'Fix Deployed', user: 'Mike Johnson', detail: 'PR #1234 merged' },
      { date: '2025-03-15T14:00:00Z', event: 'Verified', user: 'Sarah Chen', detail: 'QA passed' },
      { date: '2025-03-15T14:30:00Z', event: 'Closed', user: 'Sarah Chen' },
    ],
    createdAt: '2025-03-15T09:00:00Z',
    closedAt: '2025-03-15T14:30:00Z',
    assignee: 'Mike Johnson',
    reporter: 'Sarah Chen',
    timeToFix: 5.5,
    rip: 'Here lies a null pointer. It pointed to nothing and crashed everything. 🪦',
  },
  {
    id: 'BUG-002',
    title: 'The Infinite Loop of Sorrow',
    description: 'Payment processing endpoint enters an infinite retry loop when the payment gateway returns a 429 rate limit response, causing server CPU to spike to 100%.',
    rootCause: 'Retry logic had no exponential backoff or max retry count. Every 429 response triggered an immediate retry.',
    severity: 'critical',
    status: 'closed',
    module: 'Payment Service',
    fix: 'Implemented exponential backoff with jitter and a max retry count of 3.',
    lessonsLearned: 'Retry logic without backoff is a DDoS against yourself. Always set circuit breakers.',
    prevention: ['Implement circuit breaker pattern', 'Set max retry limits on all external calls', 'Add CPU monitoring alerts'],
    impactedModules: ['Payment Service', 'Order Processing', 'Billing API'],
    timeline: [
      { date: '2025-04-02T03:00:00Z', event: 'Discovered', user: 'PagerDuty Alert', detail: 'CPU 100% alarm' },
      { date: '2025-04-02T03:15:00Z', event: 'Assigned', user: 'Alex Rivera', detail: 'On-call engineer paged' },
      { date: '2025-04-02T04:00:00Z', event: 'Root Cause Found', user: 'Alex Rivera', detail: 'Infinite retry in payment service' },
      { date: '2025-04-02T06:00:00Z', event: 'Fix Deployed', user: 'Alex Rivera', detail: 'Hotfix deployed' },
      { date: '2025-04-02T08:00:00Z', event: 'Verified', user: 'QA Team', detail: 'Load test passed' },
      { date: '2025-04-02T09:00:00Z', event: 'Closed', user: 'Alex Rivera' },
    ],
    createdAt: '2025-04-02T03:00:00Z',
    closedAt: '2025-04-02T09:00:00Z',
    assignee: 'Alex Rivera',
    reporter: 'PagerDuty Alert',
    timeToFix: 6,
    rip: 'It tried again. And again. And again. Until nothing was left. ∞',
  },
  {
    id: 'BUG-003',
    title: 'The CSS Z-Index Apocalypse',
    description: 'Modal dialog appears behind the navigation bar. Clicking "Confirm Delete" actually clicks a nav link, navigating users away and losing their unsaved data.',
    rootCause: 'Navigation bar had z-index: 9999. Modal overlay only had z-index: 100. Stacking context was never audited.',
    severity: 'high',
    status: 'closed',
    module: 'UI Framework',
    fix: 'Established a z-index scale system and refactored all z-index values to use CSS custom properties.',
    lessonsLearned: 'Z-index wars are a symptom of no design system. Establish a z-index scale early.',
    prevention: ['Create z-index scale tokens', 'Lint for arbitrary z-index values', 'Test modal interactions in CI'],
    impactedModules: ['UI Framework', 'Navigation', 'Modal System'],
    timeline: [
      { date: '2025-05-10T14:00:00Z', event: 'Discovered', user: 'Emma Wilson', detail: 'User reported data loss' },
      { date: '2025-05-10T14:30:00Z', event: 'Assigned', user: 'David Park' },
      { date: '2025-05-10T16:00:00Z', event: 'Root Cause Found', user: 'David Park', detail: 'Z-index conflict identified' },
      { date: '2025-05-11T10:00:00Z', event: 'Fix Deployed', user: 'David Park', detail: 'Z-index system refactored' },
      { date: '2025-05-11T12:00:00Z', event: 'Closed', user: 'Emma Wilson' },
    ],
    createdAt: '2025-05-10T14:00:00Z',
    closedAt: '2025-05-11T12:00:00Z',
    assignee: 'David Park',
    reporter: 'Emma Wilson',
    timeToFix: 22,
    rip: 'Buried under 9999 layers. Nobody could reach it. 📏',
  },
  {
    id: 'BUG-004',
    title: 'The Memory Leak Monster',
    description: 'Application memory usage grows by ~50MB per hour. After 8 hours, the browser tab crashes with an out-of-memory error.',
    rootCause: 'WebSocket event listeners were being added on every re-render but never cleaned up. Each listener held references to large state objects.',
    severity: 'high',
    status: 'closed',
    module: 'Real-time Engine',
    fix: 'Moved WebSocket setup to a useEffect with proper cleanup function. Added connection pooling.',
    lessonsLearned: 'Every addEventListener needs a removeEventListener. React useEffect cleanup is not optional.',
    prevention: ['Add memory leak detection in CI', 'Code review checklist for event listener cleanup', 'Performance monitoring in staging'],
    impactedModules: ['Real-time Engine', 'WebSocket Client', 'State Management'],
    timeline: [
      { date: '2025-06-01T10:00:00Z', event: 'Discovered', user: 'Performance Monitor', detail: 'Memory growth detected' },
      { date: '2025-06-01T11:00:00Z', event: 'Assigned', user: 'Lisa Chang' },
      { date: '2025-06-02T09:00:00Z', event: 'Root Cause Found', user: 'Lisa Chang', detail: 'Event listener leak found' },
      { date: '2025-06-02T15:00:00Z', event: 'Fix Deployed', user: 'Lisa Chang' },
      { date: '2025-06-03T10:00:00Z', event: 'Verified', user: 'QA Team', detail: '24hr soak test passed' },
      { date: '2025-06-03T11:00:00Z', event: 'Closed', user: 'Lisa Chang' },
    ],
    createdAt: '2025-06-01T10:00:00Z',
    closedAt: '2025-06-03T11:00:00Z',
    assignee: 'Lisa Chang',
    reporter: 'Performance Monitor',
    timeToFix: 49,
    rip: 'It consumed everything it touched. Nothing could fill the void. 🕳️',
  },
  {
    id: 'BUG-005',
    title: 'The Timezone Phantom',
    description: 'Scheduled reports are sent at wrong times for users in non-UTC timezones. Some users receive reports at 3 AM instead of 9 AM.',
    rootCause: 'Server stored all times as UTC but the scheduling logic compared UTC times with local timezone strings without conversion.',
    severity: 'medium',
    status: 'closed',
    module: 'Scheduler',
    fix: 'Normalized all time comparisons to UTC. Added timezone-aware scheduling with IANA timezone database.',
    lessonsLearned: 'Time is the hardest problem in computing. Always store UTC, always convert at display time.',
    prevention: ['Use date-fns-tz for all timezone operations', 'Add timezone-specific test cases', 'Document timezone handling policy'],
    impactedModules: ['Scheduler', 'Notification Service', 'Report Generator'],
    timeline: [
      { date: '2025-07-15T12:00:00Z', event: 'Discovered', user: 'Customer Support', detail: 'Multiple timezone complaints' },
      { date: '2025-07-15T13:00:00Z', event: 'Assigned', user: 'Tom Bradley' },
      { date: '2025-07-16T10:00:00Z', event: 'Root Cause Found', user: 'Tom Bradley' },
      { date: '2025-07-17T14:00:00Z', event: 'Fix Deployed', user: 'Tom Bradley' },
      { date: '2025-07-18T09:00:00Z', event: 'Closed', user: 'Customer Support' },
    ],
    createdAt: '2025-07-15T12:00:00Z',
    closedAt: '2025-07-18T09:00:00Z',
    assignee: 'Tom Bradley',
    reporter: 'Customer Support',
    timeToFix: 69,
    rip: 'It was always there, just never at the right time. ⏰',
  },
  {
    id: 'BUG-006',
    title: 'The Race Condition Specter',
    description: 'Duplicate orders created when users double-click the submit button. Two identical charges appear on their credit card.',
    rootCause: 'No idempotency key on the order submission endpoint. No client-side debouncing on the submit button.',
    severity: 'critical',
    status: 'closed',
    module: 'Order Processing',
    fix: 'Added idempotency keys to all mutation endpoints. Implemented button debouncing and optimistic UI updates.',
    lessonsLearned: 'Users will always click twice. Make every mutation idempotent.',
    prevention: ['Add idempotency middleware to all POST endpoints', 'Disable buttons during submission', 'Add E2E tests for double-submit'],
    impactedModules: ['Order Processing', 'Payment Service', 'Shopping Cart'],
    timeline: [
      { date: '2025-08-20T16:00:00Z', event: 'Discovered', user: 'Finance Team', detail: 'Duplicate charges detected' },
      { date: '2025-08-20T16:30:00Z', event: 'Assigned', user: 'Alex Rivera', detail: 'Urgent escalation' },
      { date: '2025-08-20T18:00:00Z', event: 'Root Cause Found', user: 'Alex Rivera' },
      { date: '2025-08-20T22:00:00Z', event: 'Fix Deployed', user: 'Alex Rivera' },
      { date: '2025-08-21T10:00:00Z', event: 'Closed', user: 'Finance Team' },
    ],
    createdAt: '2025-08-20T16:00:00Z',
    closedAt: '2025-08-21T10:00:00Z',
    assignee: 'Alex Rivera',
    reporter: 'Finance Team',
    timeToFix: 6,
    rip: 'Two were born where only one should have lived. 👻',
  },
  {
    id: 'BUG-007',
    title: 'The Cached Corpse',
    description: 'Users see stale data after updating their profile. Changes only appear after hard-refreshing the page.',
    rootCause: 'Aggressive CDN caching with 24hr TTL on API responses. Cache invalidation was never implemented for user mutations.',
    severity: 'medium',
    status: 'open',
    module: 'Caching Layer',
    fix: '',
    lessonsLearned: '',
    prevention: [],
    impactedModules: ['Caching Layer', 'CDN', 'Profile Service'],
    timeline: [
      { date: '2025-09-10T11:00:00Z', event: 'Discovered', user: 'Emma Wilson', detail: 'User reported stale profile data' },
      { date: '2025-09-10T12:00:00Z', event: 'Assigned', user: 'David Park' },
    ],
    createdAt: '2025-09-10T11:00:00Z',
    assignee: 'David Park',
    reporter: 'Emma Wilson',
    rip: 'Still haunting the cache to this day... 💀',
  },
  {
    id: 'BUG-008',
    title: 'The SQL Injection Wraith',
    description: 'Search endpoint vulnerable to SQL injection via the query parameter. An attacker could read the entire users table.',
    rootCause: 'Raw string concatenation used to build SQL query instead of parameterized queries.',
    severity: 'critical',
    status: 'closed',
    module: 'Search API',
    fix: 'Replaced all raw SQL with parameterized queries using prepared statements.',
    lessonsLearned: 'Never concatenate user input into SQL. Use parameterized queries exclusively.',
    prevention: ['Static analysis for SQL injection patterns', 'Security audit quarterly', 'Use ORM for all database access'],
    impactedModules: ['Search API', 'Database Layer', 'Auth Service'],
    timeline: [
      { date: '2025-02-28T08:00:00Z', event: 'Discovered', user: 'Security Audit', detail: 'Penetration test finding' },
      { date: '2025-02-28T08:15:00Z', event: 'Assigned', user: 'Lisa Chang', detail: 'Immediate P0' },
      { date: '2025-02-28T09:00:00Z', event: 'Root Cause Found', user: 'Lisa Chang' },
      { date: '2025-02-28T10:00:00Z', event: 'Fix Deployed', user: 'Lisa Chang', detail: 'Emergency deploy' },
      { date: '2025-02-28T11:00:00Z', event: 'Closed', user: 'Security Team' },
    ],
    createdAt: '2025-02-28T08:00:00Z',
    closedAt: '2025-02-28T11:00:00Z',
    assignee: 'Lisa Chang',
    reporter: 'Security Audit',
    timeToFix: 3,
    rip: "It could read your secrets. All of them. 🔓",
  },
];

export const modules = [...new Set(mockBugs.flatMap(b => b.impactedModules))];
export const severities: Severity[] = ['critical', 'high', 'medium', 'low', 'info'];
export const statuses: Status[] = ['open', 'investigating', 'fixing', 'testing', 'closed'];
