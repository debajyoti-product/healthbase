"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const mockMetrics = [
  { name: "Hemoglobin", value: "14.2 g/dL", range: "13.8 - 17.2", status: "normal" },
  { name: "HbA1c", value: "5.4%", range: "< 5.7", status: "normal" },
  { name: "LDL Cholesterol", value: "158 mg/dL", range: "< 100", status: "flagged", insight: "Slightly elevated" },
  { name: "TSH", value: "2.1 mIU/L", range: "0.4 - 4.0", status: "normal" },
];

export default function ExtractionResult() {
  const router = useRouter();

  return (
    <main className="flex flex-col min-h-screen p-6 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 flex-1"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-secondary">Report Analyzed</h1>
          <p className="text-foreground/70">Here are the key metrics we extracted. Everything looks well organized.</p>
        </div>

        <div className="bg-surface rounded-2xl shadow-soft border border-locked/20 overflow-hidden">
          <div className="p-4 bg-surface-muted/50 border-b border-locked/20 flex justify-between items-center text-sm text-foreground/60 font-medium">
            <span>Metric</span>
            <span>Result & Range</span>
          </div>
          
          <div className="divide-y divide-locked/10">
            {mockMetrics.map((metric, i) => (
              <motion.div 
                key={metric.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 flex items-start justify-between gap-4"
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">
                    {metric.status === "normal" ? (
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-alert" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{metric.name}</p>
                    {metric.insight && (
                      <p className="text-xs text-alert font-medium mt-0.5">{metric.insight}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${metric.status === "flagged" ? "text-alert" : "text-foreground"}`}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-foreground/50 mt-0.5">
                    Range: {metric.range}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-[390px] mx-auto">
          <button 
            onClick={() => router.push("/upload/assign")}
            className="btn btn-primary w-full py-4 text-lg shadow-soft"
          >
            Looks good, continue
          </button>
        </div>
      </div>
    </main>
  );
}
