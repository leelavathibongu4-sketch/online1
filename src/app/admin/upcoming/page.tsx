"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { Calendar, Clock, Terminal, ChevronRight, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function AdminUpcoming() {
  const { exams } = useStore()
  const upcomingExams = exams.filter(e => new Date(e.startTime) > new Date())

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Upcoming Deployment Queue" />
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          <div className="mb-16 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-display font-bold text-white tracking-tight">UPCOMING <span className="text-amber-400 font-light italic">DEPLOYMENTS</span></h1>
              <p className="text-zinc-500 mt-2">Scheduled assessment modules ready for industrial execution.</p>
            </div>
            <Link href="/admin/exams/create" className="btn-primary flex items-center gap-2">
               Initialize New Module <Zap className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingExams.length === 0 ? (
               <div className="col-span-full glass-card !p-20 text-center border-dashed border-white/10">
                  <p className="text-zinc-600 font-medium">Clear deployment queue. No upcoming assessments detected.</p>
               </div>
            ) : (
              upcomingExams.map((exam, i) => (
                <motion.div 
                  key={exam.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group hover:border-amber-400/30 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      <Calendar className="text-amber-400 w-6 h-6" />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-400/20">
                      Scheduled
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors">{exam.title}</h3>
                  <p className="text-zinc-500 text-sm mb-8 leading-relaxed line-clamp-2">{exam.description}</p>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div className="flex gap-8">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Time Profile</span>
                          <span className="text-xs font-bold text-zinc-300 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {exam.duration}m / 30s pulse</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Protocol</span>
                          <span className="text-xs font-bold text-zinc-300 flex items-center gap-2"><Terminal className="w-3.5 h-3.5" /> Multi-Modality</span>
                       </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-zinc-800 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
