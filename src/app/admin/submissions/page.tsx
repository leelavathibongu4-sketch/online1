"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { ShieldCheck, Activity, Search, ExternalLink } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function AdminSubmissions() {
  const { attempts, exams } = useStore()

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Forensic Submission Logs" />
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-display font-bold text-white tracking-tight">LOG <span className="text-emerald-400 font-light italic">SUBMISSIONS</span></h1>
              <p className="text-zinc-500 mt-2">Real-time analysis of candidate assessment attempts.</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white/5 border border-white/5 rounded-full px-6 py-3 flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{attempts.length} Total Logs</span>
               </div>
            </div>
          </div>

          <div className="glass-card !p-0 overflow-hidden">
            {attempts.length === 0 ? (
               <div className="text-center py-32">
                  <p className="text-zinc-600 font-medium">No submission telemetry detected in the current cluster.</p>
               </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Attempt ID</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Candidate</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Module</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Score</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Review</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {attempts.map((attempt) => {
                    const exam = exams.find(e => e.id === attempt.examId)
                    return (
                      <tr key={attempt.id} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="px-8 py-6 font-mono text-zinc-500 text-xs">#{attempt.id.toUpperCase()}</td>
                        <td className="px-8 py-6 font-bold text-white">Student {attempt.userId.split('-')[0]}</td>
                        <td className="px-8 py-6 text-zinc-400 font-medium">{exam?.title || 'Unknown Module'}</td>
                        <td className="px-8 py-6">
                           <span className="text-xl font-display font-bold text-accent-blue">{attempt.score}%</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 ${attempt.status === 'completed' ? 'text-emerald-400 border-emerald-400/20' : 'text-amber-400 border-amber-400/20'}`}>
                            {attempt.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <button className="text-zinc-700 hover:text-accent-blue transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                             View <ExternalLink className="w-3.5 h-3.5" />
                           </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
