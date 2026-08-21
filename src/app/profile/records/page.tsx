"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, ChevronRight, Calendar } from "lucide-react";

const mockProfiles = [
  { id: "priya", name: "Priya (You)" },
  { id: "ravi", name: "Ravi" },
  { id: "mom", name: "Mom" },
];

const mockRecords = [
  { id: 1, profileId: "priya", title: "Comprehensive Blood Test", date: "Aug 12, 2026", type: "PDF", lab: "HealthLink Labs" },
  { id: 2, profileId: "priya", title: "Lipid Profile", date: "Jan 05, 2026", type: "Image", lab: "City Clinic" },
  { id: 3, profileId: "ravi", title: "Annual Checkup", date: "Jul 20, 2026", type: "PDF", lab: "HealthLink Labs" },
  { id: 4, profileId: "mom", title: "Thyroid Panel", date: "Aug 02, 2026", type: "PDF", lab: "Metro Diagnostics" },
];

export default function Records() {
  const router = useRouter();
  const [activeProfileId, setActiveProfileId] = useState(mockProfiles[0].id);

  const filteredRecords = mockRecords.filter(r => r.profileId === activeProfileId);

  return (
    <main className="flex flex-col min-h-screen bg-background pb-24">
      <header className="px-6 pt-12 pb-4 sticky top-0 bg-background/90 backdrop-blur-md z-10 border-b border-locked/10">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-serif text-secondary absolute left-1/2 -translate-x-1/2">Records</h1>
          <div className="w-10"></div>
        </div>

        {/* Profile Switcher */}
        <div className="flex gap-4 overflow-x-auto pt-4 pb-1 -mx-6 px-6 no-scrollbar">
          {mockProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfileId(profile.id)}
              className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-opacity ${activeProfileId === profile.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-medium transition-all ${activeProfileId === profile.id ? 'bg-primary text-surface shadow-soft ring-2 ring-background ring-offset-2 ring-offset-primary' : 'bg-surface-muted text-foreground'}`}>
                {profile.name.charAt(0)}
              </div>
              <span className="text-[11px] font-medium text-foreground">{profile.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 pt-6 space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map(record => (
            <div key={record.id} className="card bg-surface border border-locked/20 p-4 flex gap-4 items-center group cursor-pointer hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-sm truncate">{record.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">{record.type}</span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-xs text-foreground/60 truncate">{record.lab}</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-foreground/50">
                  <Calendar className="w-3 h-3" />
                  <span className="text-[10px]">{record.date}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-locked-text group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-4 border-2 border-dashed border-locked/20 rounded-2xl">
            <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-foreground/30" />
            </div>
            <p className="text-sm font-medium text-foreground/60 mb-1">No records found</p>
            <p className="text-xs text-foreground/40">Upload a report to see it here.</p>
          </div>
        )}
      </div>
    </main>
  );
}
