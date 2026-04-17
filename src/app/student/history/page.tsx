"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  Trophy, Clock, Calendar, 
  ArrowRight, Search, BarChart3,
  ExternalLink, ShieldCheck, Activity,
  Filter
} from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { format } from 'date-fns'

export default function StudentHistory() {
  const { exams, attempts, currentUser } = useStore()
  
  const studentAttempts = attempts.filter(a => a.userId === currentUser?.id && a.status === 'completed')

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Performance Archives" />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-10">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-accent-blue" />
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">Secure Database: Synced</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                MISSION <span className="text-accent-blue">ARCHIVES</span>
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium max-w-xl">
                Historical forensic data of all your completed assessment modules. Review metrics and efficiency scores.
              </p>
            </div>
            
            <div className="flex gap-4">
               <button className="btn-secondary flex items-center gap-2 !px-6">
                  <Filter className="w-4 h-4" /> Filter Logs
               </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="glass-card !p-0 overflow-hidden border-white/5 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left uppercase tracking-widest">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="px-10 py-8 text-[10px] font-bold text-zinc-500 tracking-[3px]">Mission Objective</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-zinc-500 tracking-[3px]">Timestamp</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-zinc-500 tracking-[3px]">Sync Integrity</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-zinc-500 tracking-[3px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {studentAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-32 text-center text-zinc-600 font-bold tracking-[2px]">
                        No archives detected. Initialize a mission to generate forensic data.
                      </td>
                    </tr>
                  ) : (
                    studentAttempts.map((attempt, i) => {
                      const exam = exams.find(e => e.id === attempt.examId)
                      const isPassing = attempt.score >= (exam?.passingScore || 50)
                      
                      return (
                        <motion.tr 
                          key={attempt.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          <td className="px-10 py-10">
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-accent-blue/30 transition-all">
                                <ShieldCheck className="text-zinc-500 group-hover:text-accent-blue w-6 h-6 transition-colors" />
                              </div>
                              <span className="font-bold text-white group-hover:text-accent-blue transition-colors text-base tracking-normal">{exam?.title || 'Unknown Protocol'}</span>
                            </div>
                          </td>
                          <td className="px-10 py-10 text-zinc-500 font-bold tracking-wider">
                            {format(new Date(attempt.endTime || attempt.startTime), 'MMM dd, yyyy â€¢ HH:mm')}
                          </td>
                          <td className="px-10 py-10">
                            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl font-bold text-[10px] tracking-[2px] ${isPassing ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.05)]' : 'bg-red-400/10 text-red-400 border border-red-400/20'}`}>
                              <Trophy className="w-3.5 h-3.5" /> {attempt.score}%
                            </div>
                          </td>
                          <td className="px-10 py-10 text-right">
                            <Link href={`/student/results/${attempt.examId}`} className="text-zinc-600 hover:text-white inline-flex items-center gap-3 font-bold transition-all p-3 rounded-xl bg-white/[0.02] border border-white/5">
                              Review <ArrowRight className="w-4 h-4" />
                            </Link>
                          </td>
                        </motion.tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
