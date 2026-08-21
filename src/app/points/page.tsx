"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, TreePine, Sparkles, HeartPulse, CheckCircle2, ChevronRight } from "lucide-react";

const pointHistory = [
  { id: 1, action: "Unlocked daily insight", points: 2, icon: Sparkles, date: "Today" },
  { id: 2, action: "Marked recommendation as done", points: 5, icon: CheckCircle2, date: "Yesterday" },
  { id: 3, action: "Invited Ravi to Care Circle", points: 10, icon: HeartPulse, date: "Mon, Aug 17" },
  { id: 4, action: "Unlocked daily insight", points: 2, icon: Sparkles, date: "Mon, Aug 17" },
];

export default function PointsTracker() {
  const router = useRouter();

  // NOTE: Final point-to-tree ratios are pending confirmation.
  // Using 50 points = 1,000 trees placeholder for this prototype.
  const currentPoints = 12;
  const nextMilestone = 50;
  const progressPercent = Math.min((currentPoints / nextMilestone) * 100, 100);

  return (
    <main className="flex flex-col min-h-screen bg-background pb-20">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif text-secondary">Your Impact</h1>
      </header>

      <div className="px-6 pt-2 space-y-10">
        
        <section className="space-y-6">
          <div className="card bg-surface border border-locked/20 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <TreePine className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-serif text-secondary mb-1">
              {currentPoints} <span className="text-xl text-foreground/50 font-sans">/ {nextMilestone}</span>
            </h2>
            <p className="text-sm text-foreground/70 mb-6">
              You're {nextMilestone - currentPoints} points away from your next milestone: <strong className="font-medium">1,000 trees planted.</strong>
            </p>
            
            <div className="w-full bg-surface-muted h-3 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-secondary h-full rounded-full relative"
              >
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div>
              </motion.div>
            </div>
            
            <div className="flex justify-between w-full text-xs font-medium text-foreground/50 px-1 mt-1">
              <span>0</span>
              <span>{nextMilestone}</span>
            </div>

            {/* Prototype trigger for milestone view */}
            <button 
              onClick={() => router.push("/points/milestone")}
              className="mt-6 text-xs text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full transition-colors flex items-center gap-1"
            >
              Simulate Milestone Reached <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        <div className="flex justify-center mt-[-10px] mb-2">
          <button 
            onClick={() => router.push("/points/about")}
            className="text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full transition-colors flex items-center gap-2"
          >
            How does this work? <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <section className="space-y-4">
          <h3 className="font-serif text-lg text-secondary border-b border-locked/20 pb-2">History</h3>
          <div className="space-y-3">
            {pointHistory.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-locked/10 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-secondary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{item.action}</h4>
                      <p className="text-xs text-foreground/50 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                    +{item.points}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-serif text-lg text-secondary border-b border-locked/20 pb-2">Past Milestones</h3>
          <div className="card bg-surface-muted/50 border border-transparent p-5 text-center">
            <p className="text-sm text-foreground/60 italic">No past milestones yet. Keep going!</p>
          </div>
        </section>
      </div>
    </main>
  );
}
