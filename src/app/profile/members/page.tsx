"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share, MoreVertical, Trash2, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialMembers = [
  { id: 2, name: "Ravi", relationship: "Husband", status: "Managed by you", active: false, phone: "+1 555 123 4567" },
  { id: 3, name: "Mom", relationship: "Mother", status: "Active", active: true, phone: "+1 555 987 6543" },
];

export default function ManageMembers() {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleRemove = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
    setOpenMenuId(null);
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
        <h1 className="text-xl font-serif text-secondary">Family Members</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-6 pt-6 space-y-6">
        {members.map((member) => (
          <div key={member.id} className="card bg-surface border border-locked/20 p-5 space-y-4">
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${member.active ? 'bg-surface-muted text-secondary' : 'bg-primary/10 text-primary'}`}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-lg">{member.name}</h3>
                  <p className="text-xs text-foreground/60">{member.relationship} • {member.phone}</p>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => toggleMenu(member.id)}
                  className="p-2 -mr-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {openMenuId === member.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, transformOrigin: "top right" }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-10 w-48 bg-surface rounded-xl shadow-lg border border-locked/10 py-2 z-20"
                    >
                      <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-surface-muted flex items-center gap-2">
                        <Edit2 className="w-4 h-4 text-foreground/60" /> Edit Details
                      </button>
                      <button 
                        onClick={() => handleRemove(member.id)}
                        className="w-full text-left px-4 py-2 text-sm text-alert hover:bg-alert/5 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4 text-alert" /> Remove Member
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-3 border-t border-locked/10 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${member.active ? 'bg-secondary/10 text-secondary' : 'bg-primary text-white'}`}>
                  {member.status}
                </span>
                {!member.active && (
                  <p className="text-xs text-foreground/60 mt-2 max-w-[200px]">
                    They haven't downloaded the app yet.
                  </p>
                )}
              </div>
              
              {!member.active && (
                <button className="btn btn-secondary py-2 px-4 text-xs flex items-center gap-2 bg-surface">
                  <Share className="w-3 h-3" /> Resend Link
                </button>
              )}
            </div>
            
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center py-10 text-foreground/60">
            No family members added yet.
          </div>
        )}
      </div>
      
      {/* Invisible overlay to close dropdown */}
      {openMenuId && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setOpenMenuId(null)}
        />
      )}
    </main>
  );
}
