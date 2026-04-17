"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  Users, List, CheckCircle, Clock, 
  ArrowRight, FileText, Calendar,
  Activity, ShieldCheck, Database, Zap
} from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'


export default function AdminDashboard() {
  const { exams, attempts } = useStore()
  
  const dashboardCards = [
    { 
      label: 'Students', 
      value: '1,280', 
      icon: Users, 
      color: 'text-accent-blue', 
      desc: 'Access verified candidate directory',
      href: '/admin/students'
    },
    { 
      label: 'Total Exams', 
      value: exams.length, 
      icon: List, 
      color: 'text-accent-cyan', 
      desc: 'Manage all assessment modules',
      href: '/admin/exams'
    },
    { 
      label: 'Submissions', 
      value: attempts.length, 
      icon: ShieldCheck, 
      color: 'text-emerald-400', 
      desc: 'Review forensic attempt logs',
      href: '/admin/submissions'
    },
    { 
      label: 'Upcoming Exams', 
      value: exams.filter(e => new Date(e.startTime) > new Date()).length, 
      icon: Calendar, 
      color: 'text-amber-400', 
      desc: 'Scheduled deployment queue',
      href: '/admin/upcoming'
    },
  ]

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="System Administrator Command" />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-accent-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">Universal Governance Interface</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                ADMIN <span className="text-accent-blue font-light italic">CONTROL</span>
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium max-w-xl">
                Master terminal for managing industrial-grade assessments and candidate intelligence.
              </p>
            </div>
          </div>

          {/* Core Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
            {dashboardCards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={card.href}
                  className="glass-card !p-10 block group hover:border-accent-blue/40 transition-all relative overflow-hidden h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent-blue/10 transition-colors" />
                  
                  <div className="flex justify-between items-start mb-10 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      <card.icon className={`${card.color} w-8 h-8`} />
                    </div>
                    <ArrowRight className="w-6 h-6 text-zinc-700 group-hover:text-accent-blue group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[4px] mb-3">{card.label}</p>
                    <p className="text-5xl font-display font-bold text-white tracking-tighter mb-4">{card.value}</p>
                    <p className="text-xs text-zinc-600 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
               <div className="glass-card !p-10 h-full">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                      <Database className="text-accent-blue w-6 h-6" /> REAL-TIME THROUGHPUT
                    </h3>
                    <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                       <span className="text-[10px] font-bold text-zinc-500 uppercase">Live Cluster</span>
                    </div>
                  </div>
                  
                  <div className="h-64 flex items-end gap-2 px-4 border-b border-white/5 pb-2">
                     {[40, 70, 45, 90, 65, 30, 85, 55, 100, 75, 50, 80].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ delay: i * 0.05, duration: 1 }}
                         className="flex-1 bg-accent-blue/20 border-t border-accent-blue/40 rounded-t-sm"
                       />
                     ))}
                  </div>
                  <div className="flex justify-between mt-6 px-2">
                     {['00:00', '06:00', '12:00', '18:00', '23:59'].map(t => (
                       <span key={t} className="text-[10px] font-bold text-zinc-700">{t}</span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4">
               <div className="glass-card !p-10 h-full border-accent-blue/10 bg-accent-blue/[0.01]">
                  <h3 className="text-xl font-display font-bold text-white mb-10 tracking-tight flex items-center gap-3">
                    <Zap className="text-amber-400 w-6 h-6" /> SYSTEM HEALTH
                  </h3>
                  <div className="space-y-8">
                    {[
                      { label: 'Latency', value: '18ms', status: 'Optimal' },
                      { label: 'Storage', value: '42%', status: 'Normal' },
                      { label: 'Uptime', value: '99.98%', status: 'Verified' },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center pb-6 border-b border-white/5 last:border-0 last:pb-0">
                         <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">{s.label}</p>
                            <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/5 px-3 py-1 rounded-full border border-emerald-400/10">
                              {s.status}
                            </span>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
