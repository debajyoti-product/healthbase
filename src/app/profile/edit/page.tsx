"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, TreePine, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Priya",
    age: "34",
    gender: "Female",
    phone: "+91 98765 43210"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic would go here
    router.back();
  };

  return (
    <main className="flex flex-col min-h-screen bg-background pb-12">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-locked/10">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif text-secondary">Edit Profile</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-6 pt-6 space-y-8 flex-1">
        
        {/* Avatar & Impact */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-4xl font-serif relative">
            {formData.name.charAt(0) || "P"}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-soft border border-locked/10">
              <User className="w-4 h-4 text-foreground/60" />
            </div>
          </div>
          
          <div className="bg-secondary/5 px-4 py-2 rounded-full flex items-center gap-2 border border-secondary/20">
            <TreePine className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">12 Trees Planted</span>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface border border-locked/20 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Age</label>
              <input 
                type="number" 
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-surface border border-locked/20 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Gender</label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-surface border border-locked/20 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 px-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="w-4 h-4 text-foreground/40" />
              </div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-surface border border-locked/20 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

        </form>

      </div>

      <div className="px-6 pt-8 pb-safe">
        <button 
          onClick={handleSave}
          className="btn btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg shadow-soft"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </main>
  );
}
