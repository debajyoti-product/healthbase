"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine, HeartPulse, Users, Share, Gift, Sparkles, Copy, CheckCircle2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function CareCircle() {
  const [copied, setCopied] = useState(false);
  const [showInviteSheet, setShowInviteSheet] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex flex-col min-h-screen bg-background pb-24 relative">
      <header className="px-6 pt-12 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-locked/10">
        <h1 className="text-3xl font-serif text-secondary">Care Circle</h1>
      </header>

      <div className="px-6 pt-6 space-y-8">
        
        {/* Hero Illustration Card */}
        <section>
          <div className="rounded-[20px] bg-gradient-to-br from-[#E6F0EB] to-[#D3E8E1] p-8 text-center space-y-5 relative overflow-hidden shadow-soft border border-locked/10">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-serif leading-tight text-secondary">
              Health is better together
            </h2>
            <p className="text-secondary/80 text-sm max-w-[280px] mx-auto leading-relaxed">
              When someone you invite joins Healthbase, you both earn health points toward real tree planting.
            </p>
            
            <div className="flex items-center gap-3 pt-3">
              <button 
                onClick={handleCopy}
                className="flex-1 py-3.5 px-3 whitespace-nowrap rounded-full border border-secondary text-secondary font-medium flex items-center justify-center gap-2 hover:bg-secondary/5 transition-colors text-sm"
              >
                {copied ? <><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Copied</> : <><Copy className="w-4 h-4 flex-shrink-0" /> Copy link</>}
              </button>
              <button 
                onClick={() => setShowInviteSheet(true)}
                className="flex-1 py-3.5 px-3 whitespace-nowrap rounded-full border border-transparent bg-secondary text-surface font-medium flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors text-sm shadow-sm"
              >
                <Share className="w-4 h-4 flex-shrink-0" /> Share invite
              </button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-2 gap-4">
          <div className="card bg-surface border border-locked/10 py-3.5 px-4 shadow-soft">
            <h3 className="text-2xl font-medium text-foreground">1</h3>
            <p className="text-xs text-foreground/60 mt-0.5">In your circle</p>
          </div>
          <div className="card bg-surface border border-locked/10 py-3.5 px-4 shadow-soft">
            <h3 className="text-2xl font-medium text-foreground">5</h3>
            <p className="text-xs text-foreground/60 mt-0.5">Points earned</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="pt-2">
          <h2 className="font-serif text-lg text-secondary px-1 mb-4">How Care Circle Works</h2>
          
          <div className="flex justify-between items-start gap-2 px-1">
            {[
              { icon: Share, title: "Share invite link", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: Sparkles, title: "Earn health points", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: TreePine, title: "Help plant trees", color: "bg-secondary/10", iconColor: "text-secondary" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                  {i < 2 && (
                    <div className="absolute top-6 left-[60%] w-[80%] border-t border-dashed border-locked/30" />
                  )}
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center mb-3 relative z-10`}>
                    <Icon className={`w-5 h-5 ${step.iconColor}`} />
                  </div>
                  <h4 className="font-medium text-foreground text-xs leading-tight">{step.title}</h4>
                </div>
              );
            })}
          </div>
        </section>

        {/* Points Breakdown */}
        <section className="space-y-3">
          <h2 className="text-lg font-serif text-secondary px-1">Earn Points</h2>
          <div className="card bg-surface border border-locked/15 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Friend joins your circle</span>
              </div>
              <span className="text-sm font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">+10 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">They unlock their first insight</span>
              </div>
              <span className="text-sm font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">+5 pts</span>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />

      {/* Invite Sheet */}
      <AnimatePresence>
        {showInviteSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowInviteSheet(false)}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-[32px] p-6 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="w-12 h-1.5 bg-locked/50 rounded-full mx-auto mb-8" />
              <div className="space-y-6 text-center max-w-[300px] mx-auto">
                <h3 className="text-2xl font-serif text-secondary leading-tight">
                  Help someone you care about stay on top of their health
                </h3>
                <div className="bg-surface-muted rounded-xl p-4 text-left border border-locked/20 relative overflow-hidden">
                  <span className="text-[10px] uppercase font-bold text-foreground/40 absolute top-2 right-3">Preview</span>
                  <p className="text-xs text-foreground/80 leading-relaxed mt-2">
                    "Hey, I've been using Healthbase to keep track of my health simply. Thought it could be helpful for you too. Join my Care Circle: hb.app/invite/priya"
                  </p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => setShowInviteSheet(false)}
                    className="btn btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    <Share className="w-4 h-4" /> Share via WhatsApp
                  </button>
                  <button 
                    onClick={() => setShowInviteSheet(false)}
                    className="mt-4 text-sm font-medium text-foreground/50 hover:text-foreground"
                  >
                    Cancel
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
