"use client"
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { useStore } from '@/lib/store'
import { 
  Trophy, Target, AlertCircle, ArrowLeft, 
  CheckCircle, XCircle, TrendingUp, Cpu, 
  Activity, ArrowRight
} from 'lucide-react'

export default function ExamResults() {
  const params = useParams()
  const router = useRouter()
  const { exams, attempts, currentUser } = useStore()
  
  const exam = exams.find(e => e.id === params.id)
  const attempt = attempts.find(
    a => a.examId === params.id && a.userId === (currentUser?.id || 'guest') && a.status === 'completed'
  )

  if (!exam || !attempt) {
    return (
      <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden flex flex-col">
        <Sidebar role="student" />
        <div className="min-h-screen flex flex-col">
          <DashboardHeader title="Forensic Analysis" />
          <main className="flex-1 p-8 flex items-center justify-center">
             <div className="text-center space-y-6">
                <AlertCircle className="w-16 h-16 text-zinc-500 mx-auto" />
                <h2 className="text-2xl font-display font-bold">No Data Logs Found</h2>
                <button onClick={() => router.push('/student/history')} className="btn-secondary !mx-auto">
                   Return to Archives
                </button>
             </div>
          </main>
        </div>
      </div>
    )
  }

  const isPassing = attempt.score >= exam.passingScore
  
  // Categorize errors to provide 'improvements needed'
  let missedMCQ = 0
  let missedShort = 0
  let missedCoding = 0
  
  exam.questions.forEach((q) => {
    const userAnswer = attempt.answers[q.id]
    if (userAnswer !== q.correctAnswer) {
      if (q.type === 'MCQ') missedMCQ++
      else if (q.type === 'SHORT') missedShort++
      else if (q.type === 'CODING' && (!userAnswer || String(userAnswer).length < 10)) missedCoding++
    }
  })

  const improvements = []
  if (missedMCQ > 0) improvements.push("Theoretical architecture protocols need review.")
  if (missedShort > 0) improvements.push("Direct logic articulation lacks precision.")
  if (missedCoding > 0) improvements.push("Algorithmic sandbox execution failed repeatedly.")
  if (improvements.length === 0) improvements.push("Optimal performance recorded. Maintain current calibration.")

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title={`Analysis Result: ${exam.title}`} />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px] w-full mx-auto space-y-16">
           
           <button onClick={() => router.push('/student/history')} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[4px] text-zinc-500 hover:text-accent-blue transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Archives
           </button>

           {/* Core Metrics */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                 <div className="glass-card !p-12 flex flex-col md:flex-row items-center gap-12 border-white/5">
                    <div className="relative">
                       <div className="w-48 h-48 rounded-full border-4 border-zinc-900 flex items-center justify-center relative z-10 bg-zinc-950">
                          <div className="text-center">
                             <div className={`text-6xl font-display font-bold tracking-tighter ${isPassing ? 'text-emerald-400' : 'text-red-400'}`}>
                               {attempt.score}<span className="text-3xl">%</span>
                             </div>
                             <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">{isPassing ? 'CLEARANCE GRANTED' : 'CLEARANCE DENIED'}</div>
                          </div>
                       </div>
                       
                       {/* SVG glow based on score */}
                       <svg className="absolute inset-0 w-full h-full -rotate-90 z-0" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="8"/>
                          <circle 
                             cx="50" cy="50" r="46" fill="transparent" 
                             stroke={isPassing ? '#34d399' : '#f87171'} 
                             strokeWidth="8" 
                             strokeDasharray="289" 
                             strokeDashoffset={289 - (289 * attempt.score) / 100}
                             className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                          />
                       </svg>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                       <h1 className="text-3xl md:text-4xl font-display font-bold">PERFORMANCE <span className="text-accent-blue">METRICS</span></h1>
                       <p className="text-zinc-400 text-sm font-medium max-w-md leading-relaxed">
                          Your forensic data has been analyzed. Total points achieved divided by maximum possible points constructs your absolute accuracy ratio.
                       </p>
                       <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                          <div className="px-5 py-3 rounded-xl bg-white/[0.02] border border-white/5 inline-flex items-center gap-3">
                             <Target className="w-4 h-4 text-zinc-500" />
                             <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Passing Threshold: {exam.passingScore}%</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Improvements Block */}
                 <div className="glass-card !p-10 border-white/5 space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                       <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-400/20">
                          <TrendingUp className="w-5 h-5 text-amber-400" />
                       </div>
                       <h3 className="text-xl font-display font-bold tracking-wide">REQUIRED CALIBRATIONS</h3>
                    </div>
                    <ul className="space-y-4 pt-2">
                       {improvements.map((imp, idx) => (
                         <li key={idx} className="flex items-start gap-3">
                            <Cpu className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                            <span className="text-zinc-300 text-sm font-medium leading-relaxed">{imp}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Side Stats */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="glass-card !p-8 bg-accent-blue/[0.02] border-accent-blue/10">
                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[4px] mb-8">EXECUTION FORENSICS</h3>
                    <div className="space-y-6 text-sm">
                       <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Total Modules</span>
                          <span className="font-bold">{exam.questions.length}</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">Accurate Data</span>
                          <span className="font-bold">{exam.questions.filter(q => attempt.answers[q.id] === q.correctAnswer).length}</span>
                       </div>
                       <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-red-500 font-bold uppercase tracking-widest text-[10px]">Corrupted Data</span>
                          <span className="font-bold">{exam.questions.filter(q => attempt.answers[q.id] !== q.correctAnswer && attempt.answers[q.id] !== undefined).length}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">Unanswered</span>
                          <span className="font-bold">{exam.questions.filter(q => attempt.answers[q.id] === undefined || attempt.answers[q.id] === '').length}</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Review Page / Detailed Answers */}
           <div className="space-y-8">
              <h2 className="text-2xl font-display font-bold tracking-tight pb-4 border-b border-white/10">DETAILED MODULE REVIEW</h2>
              <div className="space-y-6">
                 {exam.questions.map((q, index) => {
                   const userAnswer = attempt.answers[q.id]
                   const isCorrect = userAnswer === q.correctAnswer || (q.type === 'CODING' && String(userAnswer).length > 10)
                   const isUnanswered = userAnswer === undefined || userAnswer === ''

                   return (
                     <div key={q.id} className="glass-card !p-8 border-white/5 group hover:border-white/10 transition-colors">
                        <div className="flex items-start gap-6">
                           <div className="shrink-0 mt-1">
                             {isUnanswered ? (
                               <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
                                  <AlertCircle className="w-4 h-4" />
                               </div>
                             ) : isCorrect ? (
                               <div className="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                  <CheckCircle className="w-4 h-4" />
                               </div>
                             ) : (
                               <div className="w-8 h-8 rounded-full bg-red-400/10 flex items-center justify-center text-red-400 border border-red-400/20 shadow-[0_0_15px_rgba(248,113,113,0.1)]">
                                  <XCircle className="w-4 h-4" />
                               </div>
                             )}
                           </div>
                           <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{q.type} Protocol // Module {index + 1}</span>
                              </div>
                              <h4 className="text-lg font-medium text-white max-w-2xl leading-relaxed">{q.text}</h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                                 <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">Your Output Configuration</p>
                                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 text-sm font-medium text-zinc-300">
                                       {isUnanswered ? <span className="text-zinc-600 italic">No configuration provided.</span> : 
                                         q.type === 'MCQ' ? q.options?.[userAnswer as number] : String(userAnswer)
                                       }
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2">System Expected Configuration</p>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-emerald-400/10 text-sm font-medium text-zinc-300">
                                       {q.type === 'MCQ' ? q.options?.[q.correctAnswer as number] : String(q.correctAnswer)}
                                    </div>
                                 </div>
                              </div>
                              
                              {q.explanation && (
                                <div className="mt-4 p-4 rounded-xl bg-accent-blue/5 border border-accent-blue/10">
                                  <div className="flex gap-2">
                                    <Activity className="w-4 h-4 text-accent-blue mt-0.5 shrink-0" />
                                    <p className="text-xs font-medium text-zinc-400 leading-relaxed text-left block">
                                      <span className="font-bold text-accent-blue uppercase tracking-widest mb-1 block">Logic Trace:</span>
                                      {q.explanation}
                                    </p>
                                  </div>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                   )
                 })}
              </div>
           </div>
        </main>
      </div>
    </div>
  )
}
