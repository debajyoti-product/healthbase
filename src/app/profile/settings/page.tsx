"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Phone, Bell, MessageSquare, Check } from "lucide-react";

type MemberKey = "priya" | "ravi" | "mom";

export default function AccountSettings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Record<MemberKey, { whatsapp: boolean; push: boolean }>>({
    priya: { whatsapp: true, push: true },
    ravi: { whatsapp: false, push: true },
    mom: { whatsapp: true, push: false },
  });

  const toggleChannel = (member: MemberKey, channel: "whatsapp" | "push") => {
    setNotifications(prev => ({
      ...prev,
      [member]: {
        ...prev[member],
        [channel]: !prev[member][channel]
      }
    }));
  };

  const members: { id: MemberKey; name: string; relation?: string }[] = [
    { id: "priya", name: "Priya (You)" },
    { id: "ravi", name: "Ravi", relation: "Husband" },
    { id: "mom", name: "Mom", relation: "Mother" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-locked/10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif text-secondary">Account Settings</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-6 pt-6 space-y-8">
        

        {/* Notification Preferences */}
        <section className="space-y-3">
          <div className="px-1 space-y-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground/40">Notification Preferences</h2>
            <p className="text-xs text-foreground/60">Choose channels for daily insights & milestone alerts. Select WhatsApp, Push, or both.</p>
          </div>
          
          <div className="bg-surface rounded-2xl border border-locked/20 overflow-hidden divide-y divide-locked/10 shadow-soft">
            {members.map(member => {
              const prefs = notifications[member.id];
              return (
                <div key={member.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-foreground text-sm">{member.name}</span>
                      {member.relation && <span className="text-xs text-foreground/50 ml-1.5 font-normal">({member.relation})</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* WhatsApp Option */}
                    <button 
                      type="button"
                      onClick={() => toggleChannel(member.id, "whatsapp")}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                        prefs.whatsapp 
                          ? 'bg-[#25D366]/10 border-[#25D366]/40 text-[#1B8042] shadow-xs' 
                          : 'bg-surface-muted/60 border-locked/30 text-foreground/50 hover:border-locked/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                        prefs.whatsapp 
                          ? 'bg-[#25D366] border-[#25D366] text-white' 
                          : 'border-locked/60 bg-transparent'
                      }`}>
                        {prefs.whatsapp && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>

                    {/* Push Notification Option */}
                    <button 
                      type="button"
                      onClick={() => toggleChannel(member.id, "push")}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                        prefs.push 
                          ? 'bg-secondary/10 border-secondary/40 text-secondary shadow-xs' 
                          : 'bg-surface-muted/60 border-locked/30 text-foreground/50 hover:border-locked/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5" />
                        <span>Push</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                        prefs.push 
                          ? 'bg-secondary border-secondary text-white' 
                          : 'border-locked/60 bg-transparent'
                      }`}>
                        {prefs.push && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Logout */}
        <section className="pt-4">
          <button 
            onClick={handleLogout}
            className="w-full card bg-surface border border-alert/20 text-alert p-4 flex items-center justify-center gap-2 font-medium hover:bg-alert/5 transition-colors shadow-none"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </section>

      </div>
    </main>
  );
}
