"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TreePine, Lock, Unlock, ChevronRight, AlertCircle, Flame } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { useUnlockedStatus } from "@/store/insights";

export default function Home() {
  const router = useRouter();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showStreakPopup, setShowStreakPopup] = useState(false);
  const isInsightUnlocked = useUnlockedStatus("today", true);

  const handleUnlockClick = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      router.push("/insight/today");
    }, 800);
  };

  return (
    <main className="flex flex-col min-h-screen bg-background pb-24">
      <header className="pt-12 px-6 flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-foreground/60">Good morning,</p>
          <h1 className="text-3xl font-serif text-secondary">Priya</h1>
        </div>
        
        <button 
          onClick={() => setShowStreakPopup(true)}
          className="flex items-center gap-1.5 bg-surface border border-locked/15 px-3 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-surface-muted transition-colors mt-1"
        >
          <Flame className="w-4 h-4 text-alert" />
          <span className="font-bold text-secondary text-sm">2</span>
        </button>
      </header>

      <div className="px-6 space-y-6 mt-8">
        {/* Points Tracker */}
        <Link href="/points" className="block">
          <div className="rounded-[20px] py-2.5 px-4 flex items-center gap-4 shadow-soft border border-locked/10 hover:shadow-md transition-shadow bg-gradient-to-br from-[#E6F0EB] to-[#D3E8E1]">
            <div className="relative w-11 h-11 flex-shrink-0">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary/15" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="100" strokeDashoffset="76" className="text-secondary" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <TreePine className="w-4 h-4 text-secondary" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg font-bold text-secondary tracking-tight leading-snug">12/50 points</h2>
              <p className="text-[11.5px] font-medium text-secondary/80 mt-0.5">
                38 points to your next milestone
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-secondary/40" />
          </div>
        </Link>


        {/* Hero Card: Today's Insight */}
        {isInsightUnlocked ? (
          <>
            <Link href="/insight/today" className="block">
              <div className="card bg-[#F4EDE5] border-alert/30 p-5 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-1 h-full bg-alert"></div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-alert/10 rounded-full p-1.5 flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-alert" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-alert bg-alert/10 px-2 py-0.5 rounded-full">Important</span>
                </div>
                <h3 className="font-serif text-base text-foreground mb-1.5">Your LDL cholesterol is trending high.</h3>
                <p className="text-xs text-foreground/60">Tap to view full details</p>
              </div>
            </Link>

            {/* Today's Action */}
            <section className="space-y-3 pt-2">
              <h3 className="font-serif text-lg text-secondary px-1">Today's Action</h3>
              <Link href="/action/walk-ldl" className="block">
                <div className="card p-5 flex items-center justify-between group border-primary/20 hover:border-primary/50 transition-all">
                  <div className="flex gap-4 items-center text-left">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      🚶
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Take a 15-min walk after dinner</h4>
                      <p className="text-xs text-foreground/60 mt-0.5">Based on your LDL insight</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </section>
          </>
        ) : (
          <button onClick={handleUnlockClick} className="block w-full text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card bg-surface border border-locked/20 p-6 flex flex-col items-center text-center justify-center py-10 hover:bg-surface-muted/50 transition-colors"
            >
              <motion.div 
                animate={isUnlocking ? { 
                  scale: [1, 1.2, 1], 
                  backgroundColor: ["rgba(224, 109, 83, 0.1)", "rgba(224, 109, 83, 0.3)", "rgba(224, 109, 83, 0.1)"]
                } : { rotate: [0, -8, 8, -4, 0] }}
                transition={isUnlocking ? { duration: 0.5, ease: "easeOut" } : { duration: 0.6, delay: 1, ease: "easeInOut" }}
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm transition-colors ${isUnlocking ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}
              >
                {isUnlocking ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Unlock className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </motion.div>
              <h3 className="text-lg font-serif text-secondary">Unlock Insight</h3>
            </motion.div>
          </button>
        )}

        {/* How It Works — for first-time users */}
        <motion.section 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <h3 className="font-serif text-lg text-secondary px-1 mb-6">How it works</h3>
          
          <div className="space-y-0 relative px-2">
            {[
              { emoji: "🔓", title: "Unlock your insight", desc: "Personalized health insights based on your reports.", color: "bg-primary/10" },
              { emoji: "✅", title: "Follow the recommendation", desc: "Simple, daily lifestyle changes that you can follow.", color: "bg-secondary/10" },
              { emoji: "🌳", title: "Earn points, plant trees", desc: "Earn points that fund tree-planting initiatives across India.", color: "bg-[#E6F0EB]" },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start relative">
                {/* Connecting line */}
                {i < 2 && (
                  <div className="absolute left-[22px] top-[44px] w-px h-[calc(100%-12px)] border-l-2 border-dashed border-locked/30"></div>
                )}
                
                <div className={`w-11 h-11 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0 text-xl z-10`}>
                  {step.emoji}
                </div>
                <div className={`flex-1 ${i < 2 ? 'pb-8' : ''}`}>
                  <h4 className="font-medium text-foreground text-sm">{step.title}</h4>
                  <p className="text-xs text-foreground/60 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <BottomNav />

      {/* Streak Popup */}
      <AnimatePresence>
        {showStreakPopup && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStreakPopup(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-1/2 translate-y-1/2 left-6 right-6 bg-surface p-6 rounded-[24px] shadow-xl z-50 text-center"
            >
              <div className="w-16 h-16 bg-alert/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-alert" />
              </div>
              <h2 className="text-2xl font-serif text-secondary mb-2">You're on fire!</h2>
              <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                You've unlocked health insights for 2 days straight. Keep the streak going and empower yourself with knowledge about your health!
              </p>
              <button 
                onClick={() => setShowStreakPopup(false)}
                className="w-full bg-primary text-white font-medium py-3.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Keep it going
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
