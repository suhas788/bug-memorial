import { Link, useLocation } from 'react-router-dom';
import { Skull, BarChart3, List, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Graveyard', icon: Home },
  { path: '/bugs', label: 'All Bugs', icon: List },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <Skull className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              Bug Graveyard
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 text-sm font-medium transition-colors rounded-md"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-secondary rounded-md"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display italic">"Here lie the bugs that once haunted production."</p>
        </div>
      </footer>
    </div>
  );
}
