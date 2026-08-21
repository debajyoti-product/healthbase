"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function UploadConfirmation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-6 bg-gradient-to-b from-background to-surface-muted">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="card w-full max-w-[320px] text-center space-y-6 py-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, damping: 12 }}
          className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-primary fill-primary/20" />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-secondary">Profile Ready</h2>
          <p className="text-foreground/70 text-sm px-4 leading-relaxed">
            We've saved the report and created a profile. Let's see what's next.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
