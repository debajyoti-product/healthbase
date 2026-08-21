"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileUp, ArrowLeft } from "lucide-react";

export default function UploadSelect() {
  const router = useRouter();

  const handleSelect = () => {
    router.push("/upload/progress");
  };

  return (
    <main className="flex flex-col min-h-screen p-6 pt-12">
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 flex-1"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-secondary">Add a report</h1>
          <p className="text-foreground/70">Upload your lab document.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleSelect}
            className="w-full card bg-surface flex flex-col items-center justify-center gap-4 py-12 border-2 border-dashed border-locked/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-surface-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
              <FileUp className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg text-foreground">Choose from files</h3>
              <p className="text-sm text-foreground/60">PDF or image</p>
            </div>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
