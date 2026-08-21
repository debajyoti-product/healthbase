"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-advance logic
    const currentOtp = otp.join("");
    if (currentOtp.length === 6) {
      if (currentOtp === "123456") {
        router.push("/onboarding/first-action");
      } else {
        setError(true);
        // Reset after briefly showing error
        setTimeout(() => {
          setOtp(["", "", "", "", "", ""]);
          setError(false);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  }, [otp, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main className="flex flex-col min-h-screen p-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 flex-1"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-secondary">Verify it's you.</h1>
          <p className="text-foreground/70 font-sans text-base">
            Enter the 6-digit code we sent you.<br/>
            <span className="text-sm opacity-60">(Use 123456 for this prototype)</span>
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-2 justify-between max-w-[320px] mx-auto">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-2xl font-medium rounded-xl border ${error ? 'border-alert/50 bg-alert/5 text-alert' : 'border-locked/30 bg-surface focus:border-primary'} outline-none transition-colors shadow-sm`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="space-y-4 text-center">
            <button 
              onClick={() => router.push("/onboarding/first-action")}
              className="btn btn-primary w-full py-4 text-lg"
            >
              Verify & Continue
            </button>
            <button className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium">
              Didn't receive a code? Resend
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
