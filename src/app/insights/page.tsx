"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { CheckCircle2, Circle, ChevronRight, Lock, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const mockProfiles = [
  { id: "1", name: "Priya", type: "self" },
  { id: "2", name: "Ravi", type: "family" },
  { id: "3", name: "Mom", type: "family" },
];

import { useUnlockedStatus } from "@/store/insights";

// Per-profile mock data
const insightsByProfile: Record<string, {
  today: { id: string; title: string; metric: string; locked: boolean; urgent: boolean; recommendation: string; };
  history: { id: string; title: string; metric: string; actedOn: boolean; recommendation: string; }[];
}> = {
  "1": {
    today: { id: "today", title: "Your LDL cholesterol is trending high.", metric: "LDL Cholesterol", locked: true, urgent: true, recommendation: "Take a 15-min walk after dinner" },
    history: [
      { id: "routine1", title: "Steady progress on HbA1c.", metric: "HbA1c", actedOn: true, recommendation: "Meditate for 10 minutes before bed" },
      { id: "routine2", title: "Vitamin D is back in normal range.", metric: "Vitamin D", actedOn: true, recommendation: "Spend 15 mins in morning sunlight" },
    ]
  },
  "2": {
    today: { id: "ravi-today", title: "Ravi's fasting glucose is slightly elevated.", metric: "Fasting Glucose", locked: true, urgent: false, recommendation: "Avoid sugary drinks today" },
    history: [
      { id: "ravi1", title: "Blood pressure is within range.", metric: "Blood Pressure", actedOn: true, recommendation: "Reduce salt in one meal today" },
    ]
  },
  "3": {
    today: { id: "mom-today", title: "Mom's TSH levels are stable.", metric: "TSH", locked: true, urgent: false, recommendation: "Take thyroid medication on time" },
    history: [
      { id: "mom1", title: "Hemoglobin is slightly low.", metric: "Hemoglobin", actedOn: false, recommendation: "Add iron-rich food to one meal" },
      { id: "mom2", title: "Calcium levels are optimal.", metric: "Calcium", actedOn: true, recommendation: "Continue daily calcium supplement" },
    ]
  },
};

export default function Insights() {
  const [activeProfileId, setActiveProfileId] = useState(mockProfiles[0].id);
  const activeProfile = mockProfiles.find(p => p.id === activeProfileId)!;
  const data = insightsByProfile[activeProfileId];

  const isTodayUnlocked = useUnlockedStatus(data.today.id, data.today.locked);

  return (
    <main className="flex flex-col min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-locked/10">
        <h1 className="text-3xl font-serif text-secondary mb-3">Insights</h1>

        {/* Profile Switcher */}
        <div className="flex gap-4 overflow-x-auto pt-4 pb-1 -mx-6 px-6 no-scrollbar">
          {mockProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfileId(profile.id)}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-opacity ${activeProfileId === profile.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-medium transition-all ${activeProfileId === profile.id ? 'bg-secondary text-surface shadow-soft ring-2 ring-background ring-offset-2 ring-offset-secondary' : 'bg-surface-muted text-secondary'}`}>
                {profile.name.charAt(0)}
              </div>
              <span className="text-[11px] font-medium text-foreground">{profile.name}</span>
            </button>
          ))}

          {/* Add Circle */}
          <Link
            href="/profile/members"
            className="flex flex-col items-center gap-1.5 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-locked/60 bg-surface/50 text-foreground/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-foreground">Add</span>
          </Link>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeProfileId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="px-6 pt-6 space-y-8"
        >
          {/* Today's Insight */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Today</h2>

            {isTodayUnlocked ? (
              <Link href={`/insight/${data.today.id}`} className="block">
                <div className={`card ${data.today.urgent ? 'bg-[#F4EDE5] border-alert/30' : 'bg-surface border-primary/20'} p-5 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow`}>
                  {data.today.urgent && <div className="absolute top-0 left-0 w-1 h-full bg-alert"></div>}
                  
                  <div className="flex justify-between items-start mb-3">
                    <div className={`${data.today.urgent ? 'bg-alert/10' : 'bg-primary/10'} rounded-full p-1.5`}>
                      <AlertCircle className={`w-4 h-4 ${data.today.urgent ? 'text-alert' : 'text-primary'}`} />
                    </div>
                    {data.today.urgent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-alert bg-alert/10 px-2 py-0.5 rounded-full">Important</span>
                    )}
                  </div>
                  <h3 className="font-serif text-base text-foreground mb-1.5">{data.today.title}</h3>
                  <p className="text-xs text-foreground/60">Tap to view full details</p>
                </div>
              </Link>
            ) : (
              <Link href={`/insight/${data.today.id}`} className="block">
                <div className="card bg-surface border border-locked/20 p-6 flex flex-col items-center text-center py-8 hover:bg-surface-muted/50 transition-colors">
                  <motion.div 
                    animate={{ rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary"
                  >
                    <Lock className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-base font-serif text-secondary">Unlock {activeProfile.name}'s Insight</h3>
                </div>
              </Link>
            )}
          </section>

          {/* History */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground/40">Past Insights</h2>
            </div>
            <div className="space-y-3">
              {data.history.map(item => (
                <Link key={item.id} href={`/insight/${item.id}`} className="block">
                  <div className="card p-4 flex gap-4 items-start bg-surface border border-locked/20 hover:border-primary/30 transition-colors">
                    <div className="mt-0.5">
                      {item.actedOn ? (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      ) : (
                        <Circle className="w-5 h-5 text-locked-text" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-medium text-foreground/50 uppercase tracking-wide bg-surface-muted px-2 py-0.5 rounded-sm">
                          {item.metric}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${item.actedOn ? 'bg-secondary/10 text-secondary' : 'bg-locked/30 text-foreground/60'}`}>
                          {item.actedOn ? 'Marked done' : 'Not yet'}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground leading-snug pt-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-foreground/50">💡 {item.recommendation}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <BottomNav />
    </main>
  );
}
