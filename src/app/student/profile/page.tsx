"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  User, Mail, Shield, ShieldCheck, 
  Settings, Key, Fingerprint, Activity,
  Save, LogOut
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function StudentProfile() {
  const { currentUser, setCurrentUser } = useStore()
  const router = useRouter()

  const handleLogout = () => {
    setCurrentUser(null)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Agent Profile Configuration" />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-accent-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">Security Level: Omega</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                CANDIDATE <span className="text-accent-blue">IDENTITY</span>
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium max-w-xl">
                Manage your secure credentials and core system parameters.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Identity Form */}
            <div className="lg:col-span-8">
              <div className="glass-card !p-12 space-y-10">
                 <div className="flex items-center gap-8 pb-10 border-b border-white/5">
                    <div className="w-24 h-24 rounded-[32px] bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                       <Fingerprint className="w-12 h-12 text-accent-blue" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold text-white">SYSTEM IDENTITY</h3>
                        <p className="text-zinc-500 text-sm font-medium mt-1 uppercase tracking-widest font-black">Authorized Personnel</p>
                    </div>
                 </div>

                 <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-accent-blue/30 transition-all">
                       <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                              <User className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Full Name & Alias</p>
                              <p className="text-base font-bold text-white tracking-wide">{currentUser?.name || 'Leela'}</p>
                           </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-accent-blue/30 transition-all">
                       <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                              <Mail className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secure Node Address</p>
                              <p className="text-base font-bold text-white tracking-wide">{currentUser?.email || 'agent@exampro.hub'}</p>
                           </div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-accent-blue/30 transition-all">
                       <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                              <Shield className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Access Clearance</p>
                              <p className="text-base font-bold text-white uppercase tracking-wide">{currentUser?.role || 'student'}</p>
                           </div>
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 flex justify-end">
                    <button className="btn-primary !px-12 !py-4 flex items-center gap-2 grayscale brightness-50 cursor-not-allowed">
                       <Save className="w-4 h-4" /> Sync Parameters
                    </button>
                 </div>
              </div>
            </div>

            {/* Security Blocks */}
            <div className="lg:col-span-4 space-y-8">
               <div className="glass-card !p-8 border-accent-blue/10 bg-accent-blue/[0.01]">
                  <h3 className="text-lg font-display font-bold text-white mb-8">AUTHENTICATION</h3>
                  <div className="space-y-6">
                     <button className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-accent-blue/30 transition-all">
                        <div className="flex items-center gap-4">
                           <Key className="w-5 h-5 text-zinc-500 group-hover:text-accent-blue transition-colors" />
                           <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Rotate Keys</span>
                        </div>
                        <Activity className="w-4 h-4 text-zinc-700" />
                     </button>

                     <button className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group hover:border-accent-blue/30 transition-all">
                        <div className="flex items-center gap-4">
                           <ShieldCheck className="w-5 h-5 text-zinc-500 group-hover:text-accent-blue transition-colors" />
                           <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">2FA Integrity</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20 uppercase">Active</span>
                     </button>

                     <button 
                        onClick={handleLogout}
                        className="w-full p-5 rounded-2xl bg-red-400/5 border border-red-400/10 flex items-center justify-between group hover:bg-red-400/10 hover:border-red-400/30 transition-all active:scale-[0.98]"
                     >
                        <div className="flex items-center gap-4">
                           <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                           <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Log Out Session</span>
                        </div>
                     </button>
                  </div>
               </div>

               <div className="glass-card !p-8 bg-zinc-900/40 border-white/5">
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[4px] mb-4 text-center">Protocol v2.0</p>
                  <p className="text-[10px] text-zinc-800 text-center leading-relaxed">
                     Your identity is managed by the ExamPro Central Registry. For data modification requests, please contact the local administrator.
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
