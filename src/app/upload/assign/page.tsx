"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, ArrowLeft } from "lucide-react";

export default function UploadAssign() {
  const router = useRouter();
  const [selection, setSelection] = useState<"me" | "family" | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleComplete = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    router.push("/upload/confirmation");
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
          <h1 className="text-3xl font-serif text-secondary">Whose report is this?</h1>
          <p className="text-foreground/70">We'll organize this in the right profile.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setSelection("me")}
            className={`w-full card flex items-center p-4 gap-4 transition-all ${selection === "me" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-transparent hover:border-locked/50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selection === "me" ? 'bg-primary text-white' : 'bg-surface-muted text-secondary'}`}>
              <User className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-medium text-lg text-foreground">This is for me</h3>
              <p className="text-sm text-foreground/60">Add to your personal profile</p>
            </div>
          </button>

          <button 
            onClick={() => setSelection("family")}
            className={`w-full card flex items-center p-4 gap-4 transition-all ${selection === "family" ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-transparent hover:border-locked/50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selection === "family" ? 'bg-primary text-white' : 'bg-surface-muted text-secondary'}`}>
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-medium text-lg text-foreground">For a family member</h3>
              <p className="text-sm text-foreground/60">Manage someone else's health</p>
            </div>
          </button>
        </div>

        <AnimatePresence>
          {selection === "family" && (
            <motion.form 
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-4 border-t border-locked/30"
              onSubmit={handleComplete}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Their Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mom"
                  className="w-full bg-surface border border-locked/30 rounded-xl px-4 py-3 text-base outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-baseline gap-2">
                  Phone Number <span className="text-xs text-foreground/50 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000 000 0000"
                  className="w-full bg-surface border border-locked/30 rounded-xl px-4 py-3 text-base outline-none focus:border-primary transition-colors"
                />
                <p className="text-xs text-foreground/60 leading-relaxed mt-1">
                  Add their number so we can notify them directly. You can skip this and manage it yourself.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="pt-8">
        <button 
          onClick={() => handleComplete()}
          className="btn btn-primary w-full py-4 text-lg shadow-soft"
        >
          Create Profile
        </button>
      </div>
    </main>
  );
}
