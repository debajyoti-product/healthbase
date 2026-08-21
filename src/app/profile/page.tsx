"use client";

import { motion } from "framer-motion";
import { User, Users, Settings, ChevronRight, FileText, Pencil } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function ProfileHome() {
  return (
    <main className="flex flex-col min-h-screen bg-background pb-24 relative">
      <header className="px-6 pt-12 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-locked/10">
        <h1 className="text-3xl font-serif text-secondary">Profile</h1>
      </header>

      <div className="px-6 pt-6 space-y-8">
        {/* Personal Profile Box */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-1">Personal Info</h2>
          <div className="bg-surface rounded-[24px] shadow-soft border border-locked/10 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl font-serif">
                P
              </div>
              <div>
                <h3 className="font-serif text-xl text-secondary">Priya</h3>
                <p className="text-sm text-foreground/60 mt-0.5">+91 98765 43210</p>
              </div>
            </div>
            <Link href="/profile/edit" className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors">
              <Pencil className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Navigation List */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40 px-1">Manage</h2>
          
          <div className="bg-surface rounded-[24px] shadow-soft border border-locked/10 overflow-hidden divide-y divide-locked/10">
            <Link href="/profile/records" className="flex items-center p-5 hover:bg-surface-muted transition-colors group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Records</h3>
                <p className="text-xs text-foreground/60">View all reports across profiles</p>
              </div>
              <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/profile/members" className="flex items-center p-5 hover:bg-surface-muted transition-colors group">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Family Members</h3>
                <p className="text-xs text-foreground/60">Edit profiles and check activation</p>
              </div>
              <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/profile/settings" className="flex items-center p-5 hover:bg-surface-muted transition-colors group">
              <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-foreground/60 mr-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Account Settings</h3>
                <p className="text-xs text-foreground/60">Notifications, logout</p>
              </div>
              <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
