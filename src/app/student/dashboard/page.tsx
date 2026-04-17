"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  Trophy, Star, Clock, Calendar, 
  ArrowRight, Play, CheckCircle, Target,
  Zap, Activity, ShieldCheck
} from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function StudentDashboard() {
  const { exams, attempts, currentUser } = useStore()
  
  const studentAttempts = attempts.filter(a => a.userId === currentUser?.id)
  const publishedExams = exams.filter(e => e.status === 'published')
  
  const stats = [
    { label: 'Assessment Velocity', value: studentAttempts.length, icon: Activity, color: 'text-accent-blue' },
    { label: 'Current Accuracy', value: studentAttempts.length ? `${Math.round(studentAttempts.reduce((acc, a) => acc + a.score, 0) / studentAttempts.length)}%` : '0%', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Experience Points', value: studentAttempts.reduce((acc, a) => acc + a.score, 0) * 10, icon: Star, color: 'text-amber-400' },
    { label: 'Quantum Rank', value: '#128', icon: Zap, color: 'text-accent-cyan' },
  ]

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Candidate Command Hub" />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          {/* Header Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">Mission Active</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              WELCOME, <span className="text-accent-blue">{currentUser?.name?.toUpperCase() || 'AGENT'}</span>
            </h1>
            <p className="text-zinc-500 mt-4 text-lg font-medium max-w-xl">
              Initialize your next assessment cycle below. All systems are primed for execution.
            </p>
          </div>

          {/* Stats Grid - High Clarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card !p-8 border-white/5 hover:border-accent-blue/20"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center`}>
                    <stat.icon className={`${stat.color} w-6 h-6`} />
                  </div>
                </div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[3px] mb-2">{stat.label}</p>
                <p className="text-4xl font-display font-bold tracking-tighter text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">ACTIVE MISSIONS</h3>
                  <Link href="/student/exams" className="text-xs font-bold text-accent-blue uppercase tracking-widest hover:brightness-125 transition-all">Expand Grid</Link>
                </div>

                <div className="space-y-4">
                  {publishedExams.length === 0 ? (
                    <div className="glass-card !p-16 text-center border-dashed border-white/10">
                      <p className="text-zinc-600 font-medium">No missions currently assigned to your profile.</p>
                    </div>
                  ) : (
                    publishedExams.map((exam) => {
                      const alreadyTaken = studentAttempts.some(a => a.examId === exam.id)
                      return (
                        <div key={exam.id} className="glass-card !p-6 flex items-center justify-between group">
                          <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-accent-blue/30 transition-all">
                              <Play className="text-zinc-500 group-hover:text-accent-blue w-6 h-6 transition-colors" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{exam.title}</h4>
                              <div className="flex gap-6 mt-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                  <Clock className="w-3 h-3" /> {exam.duration}M
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                  <Target className="w-3 h-3" /> {exam.questions.length} MODULES
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {alreadyTaken ? (
                            <Link href={`/student/results/${exam.id}`} className="px-8 py-3 rounded-xl bg-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest border border-white/5 hover:text-white transition-all">
                              Analysis
                            </Link>
                          ) : (
                            <Link href={`/student/exams/${exam.id}`} className="btn-primary flex items-center gap-2">
                              Launch Session <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card bg-accent-blue/[0.02] border-accent-blue/10">
                <h3 className="text-lg font-display font-bold text-white mb-8 tracking-tight">CANDIDATE LOGS</h3>
                <div className="space-y-8">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider">High Accuracy</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-medium mt-1">Consistency Streak: 5</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider">Verified State</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-medium mt-1">Syncing with Mainframe</p>
                      </div>
                   </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[4px] mb-6">Execution Window</p>
                   <div className="space-y-4">
                      {['Final Sprint v2', 'Logic Module 04'].map((task, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <span className="text-xs font-bold text-zinc-300 uppercase tracking-tighter">{task}</span>
                          <span className="text-[10px] text-accent-blue font-bold tracking-widest">PENDING</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
