"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  FileText, Clock, ArrowRight,
  Play, CheckCircle, Search, Target, Zap
} from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'

export default function StudentExams() {
  const { exams, attempts, currentUser } = useStore()
  
  const studentAttempts = attempts.filter(a => a.userId === currentUser?.id)
  const publishedExams = exams.filter(e => e.status === 'published')

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Mission Grid" />
        
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
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">Inventory Status: Alpha</span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                AVAILABLE <span className="text-accent-blue">MISSIONS</span>
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium max-w-xl">
                Select your assessment module. Each mission follows strict integrity protocols and real-time tracking.
              </p>
            </div>
            
            <div className="relative group w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 w-5 h-5 group-focus-within:text-accent-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Filter missions..."
                className="bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-blue/50 transition-all w-full md:w-80 font-medium text-sm"
              />
            </div>
          </div>

          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {publishedExams.length === 0 ? (
              <div className="md:col-span-2 xl:col-span-3 glass-card !p-32 text-center border-dashed border-white/10 opacity-60">
                <FileText className="w-16 h-16 text-zinc-800 mx-auto mb-8" />
                <h3 className="text-2xl font-display font-bold mb-4 tracking-wide text-zinc-400">NO MISSIONS DEPLOYED</h3>
                <p className="text-zinc-600 max-w-sm mx-auto font-medium">Coordinate with your administrator to initialize assessment parameters in your sector.</p>
              </div>
            ) : (
              publishedExams.map((exam, i) => {
                const attempt = studentAttempts.find(a => a.examId === exam.id)
                const isCompleted = attempt?.status === 'completed'
                
                return (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card !p-10 flex flex-col h-full hover:translate-y-[-4px] transition-all group"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-accent-blue/30 transition-all">
                        <Zap className="text-zinc-500 group-hover:text-accent-blue w-6 h-6 transition-all" />
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">Duration</span>
                         <span className="text-xs font-bold text-white uppercase tracking-wider">{exam.duration}M</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-4 tracking-tight group-hover:text-accent-blue transition-colors">{exam.title}</h3>
                    <p className="text-zinc-500 text-sm mb-10 flex-1 leading-[1.8] font-medium">
                      {exam.description || 'Comprehensive evaluation grid involving logical MCQ clusters and high-fidelity code execution paradigms.'}
                    </p>
                    
                    <div className="flex items-center gap-6 mb-10 text-[10px] font-bold text-zinc-400 uppercase tracking-[3px] border-t border-white/5 pt-8">
                      <span className="flex items-center gap-2"> {exam.questions.length} MODULES</span>
                      <span className="flex items-center gap-2"> LEVEL: 04</span>
                    </div>

                    {isCompleted ? (
                      <Link 
                        href={`/student/results/${exam.id}`}
                        className="btn-secondary !w-full !py-4 flex items-center justify-center gap-2 border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/5"
                      >
                         ANALYZE RESULTS <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link 
                        href={`/student/exams/${exam.id}`}
                        className="btn-primary !w-full !py-4 flex items-center justify-center gap-2"
                      >
                        LAUNCH MISSION <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </motion.div>
                )
              })
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
