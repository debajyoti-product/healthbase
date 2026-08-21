"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PhoneEntry() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/otp");
  };

  return (
    <main className="flex flex-col min-h-screen p-6 pt-20">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 flex-1"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-secondary">Welcome.</h1>
          <p className="text-foreground/70 font-sans text-base">Enter your phone number to get started.</p>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground/80">Phone Number</label>
            {/* 
              NOTE: This phone number becomes the account holder's identity AND the number 
              the app will later match against when a member downloads the app. 
              The phone-matching logic is core to the member-activation flow.
            */}
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="000 000 0000"
              className="w-full bg-surface border border-locked/30 rounded-[16px] px-4 py-5 text-xl tracking-wide outline-none focus:border-primary transition-colors shadow-soft"
              autoFocus
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full py-4 text-lg mt-8"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </main>
  );
}
