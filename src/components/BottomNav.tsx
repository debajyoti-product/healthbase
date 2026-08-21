"use client";

import { Home, Lightbulb, HeartPulse, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Insights", href: "/insights", icon: Lightbulb },
    { name: "Care Circle", href: "/care-circle", icon: HeartPulse },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-locked/20 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-50">
      <div className="max-w-[390px] mx-auto flex justify-between items-center px-6 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-16 transition-colors ${isActive ? 'text-primary' : 'text-foreground/40 hover:text-foreground/60'}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
