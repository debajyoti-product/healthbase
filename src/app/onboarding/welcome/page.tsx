"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, Activity } from "lucide-react";

const slides = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Upload a report",
    description: "Simply snap a photo of any lab report. We'll extract the numbers so you don't have to guess what they mean."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Get one clear insight a day",
    description: "No overwhelming dashboards. Just one simple, actionable insight at a time to keep you or your loved ones on track."
  },
  {
    icon: <Activity className="w-8 h-8 text-primary" />,
    title: "Small actions, tracked simply",
    description: "Log progress effortlessly and see how small, consistent steps lead to better health outcomes over time."
  }
];

export default function Welcome() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      router.push("/auth/phone");
    }
  };

  return (
    <main className="flex flex-col min-h-screen p-6 pt-12 pb-12">
      <div className="flex justify-end">
        <button 
          onClick={() => router.push("/auth/phone")}
          className="text-sm font-medium text-foreground/50 hover:text-foreground/80 px-4 py-2"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center -mt-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-6 max-w-[280px]"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {slides[currentSlide].icon}
            </div>
            <h2 className="text-2xl font-serif text-secondary leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-foreground/70 text-base leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-8">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-primary' : 'w-1.5 bg-locked'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="btn btn-primary w-full py-4 text-lg"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </main>
  );
}
