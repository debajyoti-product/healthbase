"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, CheckCircle2 } from "lucide-react";

export default function UploadProgress() {
  const router = useRouter();
  const [phase, setPhase] = useState("reading"); // reading, done

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase("done");
    }, 2500);

    const timer2 = setTimeout(() => {
      router.push("/home");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-6 bg-surface-muted">
      <div className="flex flex-col items-center space-y-8 max-w-[260px] text-center">
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Animated background rings */}
          {phase === "reading" && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-0 bg-primary/10 rounded-full"
              />
            </>
          )}

          <motion.div 
            className="relative z-10 w-20 h-20 bg-surface rounded-2xl shadow-soft flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: phase === "done" ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {phase === "reading" ? (
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FileText className="w-10 h-10 text-secondary" />
                <motion.div 
                  className="absolute top-4 -right-1 w-full h-0.5 bg-primary/50"
                  animate={{ top: ["20%", "80%", "20%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle2 className="w-10 h-10 text-secondary" />
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div 
          key={phase}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h2 className="text-xl font-serif text-secondary">
            {phase === "reading" ? "Reading your report..." : "Report uploaded"}
          </h2>
          <p className="text-foreground/60 text-sm">
            {phase === "reading" ? "We're securely saving your document." : "Your baseline is set."}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
