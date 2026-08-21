"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle2, CalendarClock, ArrowUp, Share, ChevronRight, Users, Stethoscope, TreePine, X } from "lucide-react";
import Link from "next/link";

// Mock data based on ID
const insightMap: Record<string, {
  title: string; metric: string; meaning: string; consequence: string;
  isLocked: boolean; recommendationType: string; recommendation: string;
  recommendationEmoji: string; points: number; isManagedMember: boolean; memberName: string; completed?: boolean; actionId: string;
}> = {
  "urgent": {
    title: "Your LDL cholesterol is trending high.",
    metric: "LDL Cholesterol",
    meaning: "Your LDL cholesterol has crossed into the elevated range. LDL is the 'bad' cholesterol that can build up in blood vessels.",
    consequence: "Over time, high LDL increases the strain on your cardiovascular system, raising the risk of heart-related issues.",
    isLocked: false, recommendationType: "action", 
    recommendation: "Take a 15-minute walk after dinner this week.",
    recommendationEmoji: "🚶",
    points: 2, isManagedMember: false, memberName: "Priya", actionId: "walk-ldl"
  },
  "today": {
    title: "Your LDL cholesterol is trending high.",
    metric: "LDL Cholesterol",
    meaning: "Your LDL cholesterol has crossed into the elevated range. LDL is the 'bad' cholesterol that can build up in blood vessels.",
    consequence: "Over time, high LDL increases the strain on your cardiovascular system, raising the risk of heart-related issues.",
    isLocked: true, recommendationType: "action", 
    recommendation: "Take a 15-minute walk after dinner this week.",
    recommendationEmoji: "🚶",
    points: 2, isManagedMember: false, memberName: "Priya", actionId: "walk-ldl"
  },
  "routine1": {
    title: "Steady progress on HbA1c.",
    metric: "HbA1c",
    meaning: "Your average blood sugar levels have remained stable in the normal range over the past few months.",
    consequence: "Maintaining this level significantly reduces long-term metabolic risks and keeps energy steady.",
    isLocked: false, recommendationType: "action",
    recommendation: "Meditate for 10 minutes before bed.",
    recommendationEmoji: "🧘",
    points: 2, isManagedMember: false, memberName: "Priya", completed: true, actionId: "meditate-hba1c"
  },
  "routine2": {
    title: "Vitamin D is back in normal range.",
    metric: "Vitamin D",
    meaning: "Your Vitamin D levels have improved and are now within the healthy range.",
    consequence: "Adequate Vitamin D supports bone health, immunity, and mood regulation.",
    isLocked: false, recommendationType: "action",
    recommendation: "Spend 15 minutes in morning sunlight.",
    recommendationEmoji: "☀️",
    points: 2, isManagedMember: false, memberName: "Priya", completed: true, actionId: "sunlight-vitd"
  },
  "ravi-today": {
    title: "Ravi's fasting glucose is slightly elevated.",
    metric: "Fasting Glucose",
    meaning: "Ravi's fasting glucose reading is slightly above the optimal range, which may indicate early metabolic changes.",
    consequence: "If left unmonitored, elevated fasting glucose can progress toward pre-diabetic levels over time.",
    isLocked: true, recommendationType: "action",
    recommendation: "Avoid sugary drinks today.",
    recommendationEmoji: "🥤",
    points: 2, isManagedMember: true, memberName: "Ravi", actionId: "ravi-glucose"
  },
  "mom-today": {
    title: "Mom's TSH levels are stable.",
    metric: "TSH",
    meaning: "Mom's thyroid function markers are within the normal range, indicating well-managed thyroid health.",
    consequence: "Stable TSH levels mean her current medication and routine are working well.",
    isLocked: true, recommendationType: "action",
    recommendation: "Take thyroid medication on time.",
    recommendationEmoji: "💊",
    points: 2, isManagedMember: true, memberName: "Mom", actionId: "mom-tsh"
  },
};

const fallbackInsight = {
  title: "Health insight", metric: "General",
  meaning: "We're analyzing this metric for you.", consequence: "Stay tuned for personalized recommendations.",
  isLocked: false, recommendationType: "action", recommendation: "Drink an extra glass of water today.",
  recommendationEmoji: "💧", points: 2, isManagedMember: false, memberName: "You", actionId: "general"
};

import { useUnlockedStatus, unlockInsight } from "@/store/insights";

export default function InsightDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const data = insightMap[id] || fallbackInsight;
  
  const isUnlockedGlobally = useUnlockedStatus(id, data.isLocked);
  const isLocked = !isUnlockedGlobally;

  const [isDone, setIsDone] = useState(data.completed || false);
  const [showPoints, setShowPoints] = useState(false);
  const [remindMe, setRemindMe] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);

  const handleMarkDone = () => {
    setIsDone(true);
    if (data.points > 0) {
      setShowPoints(true);
      setTimeout(() => setShowPoints(false), 2000);
    }
  };

  // Auto-trigger reveal animation when landing on a locked insight
  const [hasDrawerBeenShown, setHasDrawerBeenShown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showInsightShareSheet, setShowInsightShareSheet] = useState(false);

  useEffect(() => {
    if (isLocked) {
      if (data.isManagedMember && !hasDrawerBeenShown) {
        setShowShareSheet(true);
        setHasDrawerBeenShown(true);
      } else if (!data.isManagedMember || (!showShareSheet && hasDrawerBeenShown)) {
        setIsAnimating(true);
      }
    }
  }, [isLocked, data.isManagedMember, hasDrawerBeenShown, showShareSheet]);

  const hasTriggeredRef = useRef(false);
  useEffect(() => {
    if (isAnimating && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setTimeout(() => {
        unlockInsight(id);
      }, 2800);
    }
  }, [isAnimating, id]);

  return (
    <main className="flex flex-col min-h-screen bg-background relative">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
          {data.metric}
        </span>
        <div className="w-10"></div>
      </header>

      <div className="px-6 flex-1 relative">
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div 
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center pt-16 pb-10 min-h-[70vh]"
            >
              {/* Pulsing rings — heartbeat effect */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-10">
                <motion.div 
                  animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-primary/20"
                />
                <motion.div 
                  animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                  className="absolute inset-0 rounded-full bg-primary/15"
                />
                <motion.div
                  animate={{ scale: [1, 0.92, 1.05, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center z-10"
                >
                  <motion.span 
                    className="text-4xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ❤️‍🩹
                  </motion.span>
                </motion.div>
              </div>

              {/* Loading text */}
              <motion.h2 
                className="text-2xl font-serif text-secondary mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Preparing your insight
              </motion.h2>

              <motion.p
                className="text-sm text-foreground/60 max-w-[260px] leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Understanding your health takes a moment. Take a deep breath in… 🌿
              </motion.p>

              {/* Gentle progress indicator */}
              <motion.div 
                className="mt-10 w-48 h-1 bg-locked/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="h-full bg-primary/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
                />
              </motion.div>

              <motion.p
                className="text-[11px] text-foreground/40 mt-4 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Every small step counts toward lasting health.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10 pb-24"
            >
              {/* Insight Content */}
              <div className="space-y-6">
                <h1 className="text-2xl font-serif text-secondary leading-tight">
                  {data.title}
                </h1>
                <div className="space-y-4 text-base text-foreground/80 leading-relaxed font-sans">
                  <div>
                    <h3 className="text-sm font-medium text-foreground/50 mb-1">What it means</h3>
                    <p>{data.meaning}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground/50 mb-1">Why it matters</h3>
                    <p>{data.consequence}</p>
                  </div>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg text-secondary border-b border-locked/30 pb-2">
                  What you can do
                </h3>
                <div className="card bg-surface border border-locked/20 p-6 space-y-6 relative overflow-hidden">
                  <Link href={`/action/${data.actionId}`} className="flex items-center justify-between group">
                    <p className="text-foreground text-lg">
                      {data.recommendationEmoji} {data.recommendation}
                    </p>
                    <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                  </Link>
                  
                  {data.recommendationType === "action" ? (
                    isDone ? (
                      <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-secondary" />
                          <span className="font-medium text-secondary">Completed</span>
                        </div>
                        <span className="text-sm font-bold text-secondary bg-white px-3 py-1 rounded-full shadow-sm">
                          +{data.points} pts
                        </span>
                      </div>
                    ) : null
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-surface-muted/50 rounded-2xl border border-locked/20">
                      <div className="flex items-center gap-3 text-foreground/80">
                        <CalendarClock className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">Recommended in 6-8 weeks</span>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" className="sr-only" checked={remindMe} onChange={(e) => setRemindMe(e.target.checked)} />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${remindMe ? 'bg-primary' : 'bg-locked'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${remindMe ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  )}

                  <AnimatePresence>
                    {showPoints && (
                      <motion.div 
                        initial={{ opacity: 0, y: 0, x: "-50%" }}
                        animate={{ opacity: 1, y: -40, x: "-50%" }}
                        exit={{ opacity: 0, y: -60, x: "-50%" }}
                        className="absolute left-1/2 bottom-16 flex items-center gap-1 text-secondary font-bold bg-white px-3 py-1 rounded-full shadow-soft"
                      >
                        <ArrowUp className="w-4 h-4" /> +{data.points} pts
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Share Insight CTA */}
              <div className="pt-2">
                <button 
                  onClick={() => setShowInsightShareSheet(true)}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-medium text-secondary/70 hover:text-secondary hover:bg-secondary/5 rounded-2xl transition-all border border-locked/20 shadow-sm bg-surface"
                >
                  <Share className="w-4 h-4" /> Share this insight
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Share Bottom Sheet for managed members */}
      <AnimatePresence>
        {showShareSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowShareSheet(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-[32px] p-6 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="w-12 h-1.5 bg-locked/50 rounded-full mx-auto mb-6" />
              <div className="space-y-5 max-w-[320px] mx-auto">
                
                {/* Warning */}
                <div className="bg-alert/5 border border-alert/20 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-alert/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-base">⚠️</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      Insights are more meaningful when members unlock by themselves.
                    </p>
                    <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                      Share the app so they can become empowered about their own health.
                    </p>
                  </div>
                </div>

                {/* Share CTA */}
                <div className="text-center space-y-4 pt-1">
                  <div className="bg-surface border border-locked/20 rounded-xl overflow-hidden shadow-sm text-left">
                    <div className="p-4 border-b border-locked/10">
                      <h4 className="font-medium text-foreground">Invite {data.memberName} to Healthbase</h4>
                      <p className="text-[11px] text-foreground/60 mt-0.5">Preview of what they'll receive</p>
                    </div>
                    <div className="bg-[#E6F0EB]/50 p-4">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        Hey {data.memberName}, I got a health insight for you on Healthbase. Download it here to see: hb.app/invite/priya
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowShareSheet(false)}
                    className="btn btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    <Share className="w-4 h-4" /> Share via WhatsApp
                  </button>
                  <button 
                    onClick={() => setShowShareSheet(false)}
                    className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors"
                  >
                    Reveal anyway
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Insight Share Sheet */}
      <AnimatePresence>
        {showInsightShareSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowInsightShareSheet(false)}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-surface rounded-t-[32px] p-6 pb-safe z-[70] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
            >
              <button 
                onClick={() => setShowInsightShareSheet(false)}
                className="absolute top-5 right-5 p-2 text-foreground/40 hover:text-foreground rounded-full hover:bg-locked/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-1.5 bg-locked/50 rounded-full mx-auto mb-6" />
              <div className="space-y-6 max-w-[320px] mx-auto">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif text-secondary leading-tight">
                    Share this insight
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Send a snippet of this insight to help others understand how we can help them with their health journey.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3 items-start p-3 rounded-xl bg-surface-muted/50 border border-locked/10">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Family & Friends</h4>
                      <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">
                        Share with family who might have similar genetics, or friends who can create their own routines.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 rounded-xl bg-surface-muted/50 border border-locked/10">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary mt-0.5">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Your Doctor</h4>
                      <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">
                        We trust our answers. Show this to your physician to have a more informed conversation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E6F0EB] to-[#D3E8E1] p-4 rounded-xl border border-secondary/10 text-center">
                  <TreePine className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs font-medium text-secondary/90 leading-relaxed">
                    <span className="font-bold">Bonus:</span> If they download Healthbase from your link, they join your <span className="font-bold">Care Circle</span> and you both earn points toward planting trees!
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setShowInsightShareSheet(false)}
                    className="btn btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    <Share className="w-4 h-4" /> Share snippet & link
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
