"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, TreePine, Leaf, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPoints() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen bg-background pb-20">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif text-secondary">Health Points & Trees</h1>
      </header>

      <div className="px-6 pt-4 space-y-10">
        
        {/* Hero */}
        <section className="card bg-secondary text-surface p-8 text-center relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-surface/5 rounded-full blur-3xl pointer-events-none"></div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-surface/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <TreePine className="w-10 h-10 text-surface" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-2xl font-serif mb-3">Small steps, real trees.</h2>
          <p className="text-surface/80 text-sm leading-relaxed max-w-[280px] mx-auto">
            Every action you take on Healthbase earns health points. These points fund real tree-planting initiatives across India.
          </p>
        </section>

        {/* How you earn */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-secondary px-1">How You Earn Points</h2>
          <div className="space-y-3">
            {[
              { action: "Unlock a daily insight", pts: "+2", icon: "💡" },
              { action: "Complete a recommendation", pts: "+5", icon: "✅" },
              { action: "Invite someone to Care Circle", pts: "+10", icon: "❤️" },
              { action: "Upload a new report", pts: "+3", icon: "📄" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-1 border-b border-locked/10 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm text-foreground">{item.action}</span>
                </div>
                <span className="text-sm font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">{item.pts}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The CSR Initiative */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif text-secondary px-1">The Initiative</h2>
          <div className="card bg-surface border border-locked/20 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Real Impact, Not Gimmicks</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We partner with verified tree-planting organizations. Every 50 points earned across the Healthbase community funds the planting of 1,000 trees.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">Your Health, The Planet's Health</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  By taking care of yourself and your loved ones, you're contributing to something larger. No catches, no subscriptions required.
                </p>
              </div>
            </div>
          </div>
          {/* NOTE: Final point-to-tree ratios are pending confirmation. 
               Using 50 points = 1,000 trees placeholder for this prototype. */}
          <p className="text-[11px] text-foreground/40 px-1 leading-relaxed">
            * Tree planting ratios are approximate and subject to partner verification. Healthbase does not profit from the CSR initiative.
          </p>
        </section>
      </div>
    </main>
  );
}
