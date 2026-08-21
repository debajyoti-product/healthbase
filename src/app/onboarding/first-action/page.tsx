"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileUp } from "lucide-react";

export default function FirstAction() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/upload/progress");
  };

  return (
    <main className="flex flex-col min-h-screen p-6 pt-16">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3 mb-10"
      >
        <h1 className="text-3xl font-serif text-secondary leading-tight">
          Let's build your baseline.
        </h1>
        <p className="text-foreground/70 text-base">
          Upload a recent lab report to start tracking what matters.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 flex items-center justify-center"
      >
        <button 
          onClick={handleContinue}
          className="w-full card bg-surface flex flex-col items-center justify-center gap-4 py-16 border-2 border-dashed border-locked/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-surface-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
            <FileUp className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg text-foreground">Choose from files</h3>
            <p className="text-sm text-foreground/60">PDF or image</p>
          </div>
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pb-8 pt-6"
      >
        <button 
          onClick={handleContinue}
          className="btn btn-primary w-full py-4 text-lg"
        >
          Continue
        </button>
      </motion.div>
    </main>
  );
}
