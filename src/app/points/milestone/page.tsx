"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TreePine, CheckCircle2, Leaf } from "lucide-react";

export default function MilestoneView() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen bg-secondary text-surface p-6 items-center justify-center relative overflow-hidden">
      
      {/* Background soft glow elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-[150vw] h-[150vw] bg-surface/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 z-10 w-full max-w-[320px] text-center">
        
        <div className="relative">
          {/* Animated Tree Growth */}
          <motion.div
            initial={{ height: 0, opacity: 0, y: 50 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "backOut" }}
            className="w-32 h-32 rounded-full bg-surface/10 flex items-center justify-center border border-surface/20 shadow-2xl relative"
          >
            <TreePine className="w-16 h-16 text-surface" strokeWidth={1.5} />
            
            {/* Soft decorative leaves floating up */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -60, x: i % 2 === 0 ? 20 : -20 }}
                transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute text-surface/60"
              >
                <Leaf className="w-4 h-4" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-surface text-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-surface/70">
            Milestone Reached
          </span>
          <h1 className="text-4xl font-serif leading-tight">
            You've helped plant <br/>
            <span className="text-primary font-serif">1,000 trees.</span>
          </h1>
          <p className="text-surface/80 text-base leading-relaxed px-4 pt-2">
            Every small step you take for your health is now growing into a real-world impact. Keep it up.
          </p>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="w-full z-10 pb-8"
      >
        <button 
          onClick={() => router.push("/home")}
          className="w-full bg-surface text-secondary font-medium py-4 rounded-full text-lg shadow-lg hover:bg-surface-muted transition-colors"
        >
          Back to Home
        </button>
      </motion.div>

    </main>
  );
}
