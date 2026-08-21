"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Info, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const actionMap: Record<string, {
  emoji: string;
  title: string;
  metric: string;
  isHighMetric: boolean;
  completed: boolean;
  points: number;
  why: string;
  howItHelps: string[];
  tips: string[];
}> = {
  "walk-ldl": {
    emoji: "🚶",
    title: "Take a 15-min walk after dinner",
    metric: "LDL Cholesterol",
    isHighMetric: true,
    completed: false,
    points: 2,
    why: "Walking after meals helps your body process fats more efficiently. When LDL cholesterol is elevated, gentle post-meal movement can help your muscles absorb glucose and lipids from your bloodstream, reducing the load on your cardiovascular system.",
    howItHelps: [
      "Improves blood circulation and helps move cholesterol through the body",
      "Lowers triglyceride levels naturally within hours of walking",
      "Reduces post-meal blood sugar spikes, which are linked to lipid buildup",
      "Supports weight management — a key factor in cholesterol control"
    ],
    tips: [
      "Walk at a comfortable pace — you should be able to hold a conversation",
      "Even 10 minutes helps — start small and build up",
      "Try walking after your heaviest meal of the day",
      "Pair it with light music or a podcast to make it enjoyable"
    ]
  },
  "meditate-hba1c": {
    emoji: "🧘",
    title: "Meditate for 10 minutes before bed",
    metric: "HbA1c",
    isHighMetric: false,
    completed: true,
    points: 2,
    why: "Stress directly impacts blood sugar regulation. When you're stressed, your body releases cortisol, which raises blood sugar levels. Meditation before bed helps lower cortisol, improving overnight glucose metabolism and contributing to stable HbA1c over time.",
    howItHelps: [
      "Reduces cortisol levels, which directly influence blood sugar",
      "Improves sleep quality — poor sleep is linked to insulin resistance",
      "Activates the parasympathetic nervous system, aiding recovery",
      "Builds emotional resilience, reducing stress-related sugar cravings"
    ],
    tips: [
      "Start with guided meditations — apps like Headspace or YouTube work great",
      "Focus on deep belly breathing: inhale for 4 counts, hold for 4, exhale for 6",
      "Keep your room dimly lit and put your phone on Do Not Disturb",
      "Consistency matters more than duration — even 5 minutes daily helps"
    ]
  },
  "sunlight-vitd": {
    emoji: "☀️",
    title: "Get 15 mins of morning sunlight",
    metric: "Vitamin D",
    isHighMetric: false,
    completed: true,
    points: 2,
    why: "Your body needs direct sunlight to synthesize Vitamin D naturally. Morning sunlight is particularly effective because the UVB rays are less harsh on your skin while still providing the necessary stimulation for Vitamin D production.",
    howItHelps: [
      "Naturally triggers Vitamin D synthesis in the skin",
      "Regulates your circadian rhythm, improving sleep and energy",
      "Supports immune system function and bone health",
      "Boosts serotonin levels, improving mood and focus"
    ],
    tips: [
      "Expose your arms and face for best absorption",
      "Avoid sunscreen for these short 15 minutes (unless sensitive to sun)",
      "Try combining it with a morning walk or stretching",
      "If you're behind a glass window, it doesn't count — get outside!"
    ]
  }
};

export default function ActionDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const data = actionMap[id];
  
  const [isDone, setIsDone] = useState(data?.completed || false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMarkDone = () => {
    setIsDone(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  if (!data) return null;

  return (
    <main className="flex flex-col min-h-screen bg-background pb-32 relative">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
          Action Details
        </span>
        <div className="w-10"></div>
      </header>

      <div className="px-6 space-y-10 pt-4 flex-1">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
              {data.emoji}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-serif text-secondary leading-tight">{data.title}</h1>
              {isDone && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-medium text-secondary">Completed · +{data.points} pts</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h2 className="text-base font-serif text-secondary">Why this matters</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">{data.why}</p>
        </motion.section>

        {/* How It Naturally Helps */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-base font-serif text-secondary">How it naturally helps</h2>
          <div className="space-y-2.5">
            {data.howItHelps.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-secondary">{i + 1}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Practical Tips */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-base font-serif text-secondary">Tips to get started</h2>
          <div className="card bg-surface border border-locked/20 p-5 space-y-3">
            {data.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-primary text-sm mt-px">•</span>
                <p className="text-sm text-foreground/70 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Medical Disclaimer for high metrics */}
        {data.isHighMetric && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 items-start p-4 bg-surface-muted/50 rounded-2xl border border-locked/20"
          >
            <Info className="w-4 h-4 text-foreground/40 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-foreground/50 leading-relaxed">
              These are lifestyle suggestions and not a substitute for medical advice. Since your {data.metric.toLowerCase()} is elevated, we recommend consulting your doctor for a proper diagnosis and treatment plan.
            </p>
          </motion.div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      {!isDone && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-10 pt-12">
          <button 
            onClick={handleMarkDone}
            className="w-full py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 bg-primary text-white hover:opacity-90 shadow-[0_4px_14px_rgba(224,109,83,0.25)]"
          >
            Mark as done (+{data.points} pts)
          </button>
        </div>
      )}

      {/* Confetti effect when completing */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-primary bg-white px-6 py-3 rounded-full shadow-lg"
          >
            <Star className="w-5 h-5 fill-primary" />
            <span className="font-bold">+{data.points} points!</span>
          </motion.div>
        </div>
      )}
    </main>
  );
}
