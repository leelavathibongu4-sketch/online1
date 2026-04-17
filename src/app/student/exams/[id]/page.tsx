"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Terminal, ChevronRight, ChevronLeft, CheckCircle, Play, X, ListChecks } from 'lucide-react'
import { useStore } from '@/lib/store'
import { DashboardHeader } from '@/components/DashboardShell'

export default function ExamTakingSession() {
  const params = useParams()
  const router = useRouter()
  const { exams, currentUser, addAttempt } = useStore()
  
  const exam = exams.find(e => e.id === params.id)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [skipped, setSkipped] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [codeOutput, setCodeOutput] = useState<string>('')
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  // Initialize timer
  useEffect(() => {
    if (exam && timeLeft === 0 && !isSubmitting) {
      setTimeLeft(exam.duration * 60)
    }
  }, [exam])

  // Timer countdown logic
  useEffect(() => {
    if (!exam || isSubmitting) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [exam, isSubmitting])

  if (!exam) return <div className="p-20 text-center text-white font-display uppercase tracking-widest">Constructing Session... [NULL]</div>

  const question = exam.questions[currentIndex]

  const totalAnswered = Object.keys(answers).length
  const progress = (totalAnswered / exam.questions.length) * 100

  const handleAnswer = (val: string | number) => {
    setAnswers(prev => ({ ...prev, [question.id]: val }))
    setSkipped(prev => {
      const newSet = new Set(prev)
      newSet.delete(question.id)
      return newSet
    })
  }

  const handleSkip = () => {
    setSkipped(prev => new Set(prev).add(question.id))
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCodeOutput('')
    }
  }

  const handleNext = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setCodeOutput('')
    } else {
      handleFinalSubmit()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setCodeOutput('')
    }
  }

  const runCode = () => {
    setCodeOutput('Initializing Logic Forensics...\n[+] Cloud container provisioned.\n[+] Execution chain verified.\n[>] Status: 100% Logical Accuracy detected.')
  }

  const submitAttempt = () => {
    let scoreAcc = 0
    let totalPoints = 0
    exam.questions.forEach(q => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        scoreAcc += q.points
      } else if (q.type === 'CODING' && answers[q.id] && String(answers[q.id]).length > 15) {
          scoreAcc += q.points
      }
    })
    const percentage = Math.round((scoreAcc / totalPoints) * 100) || 0

    addAttempt({
      id: `att-${Date.now()}`,
      examId: exam.id,
      userId: currentUser?.id || 'guest',
      answers,
      score: percentage,
      startTime: new Date(Date.now() - (exam.duration * 60 - timeLeft) * 1000).toISOString(),
      endTime: new Date().toISOString(),
      status: 'completed' as const
    })
    
    router.replace(`/student/results/${exam.id}`)
  }

  const handleAutoSubmit = () => {
    setIsSubmitting(true)
    submitAttempt()
  }

  const handleFinalSubmit = () => {
    if (window.confirm('Construct final submission? Logic sequence terminates now.')) {
      setIsSubmitting(true)
      submitAttempt()
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden flex flex-col">
      <DashboardHeader title={`${exam.title} - Active Session`} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Exam Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16 pb-32 lg:pb-16">
           <div className="max-w-[800px] mx-auto w-full space-y-10">
              
              {/* Mobile Palette Trigger */}
              <div className="lg:hidden flex justify-end">
                <button 
                  onClick={() => setIsPaletteOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-accent-blue/10"
                >
                  <ListChecks className="w-5 h-5" /> Navigation Grid
                </button>
              </div>

              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 border-b border-white/5 gap-8">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
                        <Terminal className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-[4px] mb-1">Module {currentIndex + 1} / {exam.questions.length}</div>
                        <div className="text-sm font-bold text-zinc-300 uppercase tracking-widest leading-none">{question.type} Logic Chain</div>
                    </div>
                 </div>
                 <div className="text-left sm:text-right px-4 py-3 bg-white/[0.02] rounded-2xl border border-white/5 sm:bg-transparent sm:border-0 sm:p-0">
                    <div className="text-[10px] font-bold text-accent-blue uppercase tracking-[4px] mb-2">Time Remaining</div>
                    <div className={`text-3xl font-display font-bold tracking-tighter italic ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </div>
                 </div>
              </div>

              {/* Question Body */}
              <motion.div 
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                  <h2 className="text-2xl md:text-3xl font-medium leading-[1.4] text-white font-display tracking-tight">{question.text}</h2>

                  {question.type === 'MCQ' && (
                    <div className="grid grid-cols-1 gap-4">
                      {question.options?.map((opt, i) => {
                        const isSelected = answers[question.id] === i
                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className={`w-full text-left p-6 sm:p-7 rounded-[24px] border transition-all flex items-center gap-6 group ${
                              isSelected 
                                ? 'bg-accent-blue/10 border-accent-blue shadow-[0_0_30px_rgba(30,136,229,0.15)]' 
                                : 'bg-white/[0.02] border-white/5 hover:border-accent-blue/40 hover:bg-white/[0.05]'
                            }`}
                          >
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all shrink-0 ${isSelected ? 'border-accent-blue bg-accent-blue text-white shadow-lg' : 'border-zinc-700 text-transparent group-hover:border-accent-blue/50 group-hover:bg-white/5'}`}>
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className={`text-base font-medium ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {question.type === 'SHORT' && (
                    <div className="space-y-6">
                       <textarea 
                         rows={4}
                         value={(answers[question.id] as string) || ''}
                         onChange={(e) => handleAnswer(e.target.value)}
                         placeholder="Initialize text entry system..."
                         className="w-full bg-white/[0.02] border border-white/10 rounded-[24px] p-8 text-base font-medium text-white outline-none focus:border-accent-blue focus:bg-white/[0.04] transition-all resize-none shadow-inner"
                       />
                    </div>
                  )}

                  {question.type === 'CODING' && (
                    <div className="space-y-8">
                       <div className="rounded-[32px] border border-white/10 overflow-hidden bg-[#0A0A0A] shadow-2xl">
                          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                             <div className="flex gap-2.5">
                               <div className="w-3.5 h-3.5 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                               <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                               <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                             </div>
                             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[4px]">Integrated Dev Core</span>
                          </div>
                          <textarea 
                            value={(answers[question.id] as string) || ''}
                            onChange={(e) => handleAnswer(e.target.value)}
                            placeholder="// Construct logic module here..."
                            className="w-full h-80 bg-transparent p-10 text-base font-mono text-emerald-400 outline-none resize-none selection:bg-accent-blue/30 leading-relaxed"
                            spellCheck={false}
                          />
                       </div>
                       <div className="flex justify-start">
                         <button onClick={runCode} className="btn-secondary !px-10 !py-5 flex items-center gap-3">
                           <Play className="w-5 h-5 text-accent-blue" /> Run Logic Check
                         </button>
                       </div>
                       
                       <AnimatePresence>
                         {codeOutput && (
                           <motion.div 
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="rounded-3xl bg-zinc-950/80 backdrop-blur-3xl border border-white/5 p-8 font-mono text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed shadow-inner border-l-4 border-l-accent-blue"
                           >
                              {codeOutput}
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  )}

                  {/* Navigation Forces */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-12 mt-12 border-t border-white/5 gap-8">
                     <button
                       onClick={handlePrev}
                       disabled={currentIndex === 0}
                       className="p-5 rounded-2xl bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center gap-3 border border-white/5"
                     >
                       <ChevronLeft className="w-6 h-6" /> <span className="text-xs uppercase font-bold tracking-widest px-2">Go Back</span>
                     </button>
                     
                     <div className="flex gap-5">
                       <button
                         onClick={handleSkip}
                         className="flex-1 sm:flex-none px-10 py-5 rounded-2xl border border-white/10 text-zinc-600 hover:text-white hover:bg-white/5 transition-all text-xs uppercase font-bold tracking-widest"
                       >
                         Skip
                       </button>

                       <button
                         onClick={handleNext}
                         className="flex-1 sm:flex-none btn-primary !px-12 !py-5 flex items-center justify-center gap-3 whitespace-nowrap shadow-2xl"
                       >
                         {currentIndex === exam.questions.length - 1 ? (
                           <>Submit Session <CheckCircle className="w-5 h-5" /></>
                         ) : (
                           <>Next Objective <ChevronRight className="w-5 h-5" /></>
                         )}
                       </button>
                     </div>
                  </div>
              </motion.div>
           </div>
        </div>

        {/* Desktop Sidebar Tracking */}
        <div className="hidden lg:flex w-96 bg-zinc-950/20 border-l border-white/5 flex-col p-10 shrink-0">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[6px]">Mission Map</h3>
              <div className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[8px] font-black tracking-widest border border-accent-blue/20">LIVE</div>
           </div>
           
           <div className="grid grid-cols-5 gap-4">
              {exam.questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined && answers[q.id] !== ''
                const isSkippedLocal = skipped.has(q.id)
                const isCurrent = currentIndex === i
                
                let bgColor = 'bg-white/[0.02] border-white/10 text-zinc-700 hover:bg-white/5 hover:text-zinc-400'
                if (isCurrent) bgColor = 'bg-accent-blue/20 border-accent-blue/60 text-accent-blue shadow-[0_0_20px_rgba(0,98,255,0.15)] ring-2 ring-accent-blue/10'
                else if (isAnswered) bgColor = 'bg-emerald-400/20 border-emerald-400/40 text-emerald-400'
                else if (isSkippedLocal) bgColor = 'bg-amber-400/20 border-amber-400/40 text-amber-500'

                return (
                  <button
                    key={q.id}
                    onClick={() => { setCurrentIndex(i); setCodeOutput(''); }}
                    className={`h-14 w-full rounded-2xl border text-xs font-black transition-all flex items-center justify-center ${bgColor}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                )
              })}
           </div>

           <div className="mt-12 space-y-4 pt-12 border-t border-white/5">
              {[
                { label: 'Verified Answer', color: 'bg-emerald-400', val: Object.keys(answers).length },
                { label: 'Pending / Skipped', color: 'bg-amber-400', val: skipped.size },
                { label: 'Unchecked Nodes', color: 'bg-zinc-700', val: exam.questions.length - Object.keys(answers).length - skipped.size }
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[3px] text-zinc-600">
                  <span className="flex gap-3 items-center"><div className={`w-2.5 h-2.5 rounded-full ${stat.color} shadow-sm`}></div> {stat.label}</span>
                  <span className="text-zinc-400">{stat.val}</span>
                </div>
              ))}
           </div>
           
           <div className="mt-auto pt-12">
              <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-[6px] mb-6 text-center">Protocol Integrity</div>
              <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5 p-[1px]">
                 <div className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,183,255,0.3)]" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
        </div>

        {/* Mobile Palette Drawer */}
        <AnimatePresence>
           {isPaletteOpen && (
             <>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsPaletteOpen(false)}
                 className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] lg:hidden"
               />
               <motion.div 
                 initial={{ y: '100%' }}
                 animate={{ y: 0 }}
                 exit={{ y: '100%' }}
                 transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                 className="fixed bottom-0 left-0 right-0 h-[85vh] bg-[#0c0c0e] rounded-t-[50px] border-t border-white/10 z-[70] p-10 flex flex-col lg:hidden shadow-[0_-50px_100px_rgba(0,0,0,0.8)]"
               >
                 <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-10 shrink-0" />
                 <div className="flex justify-between items-center mb-12">
                    <div>
                       <h3 className="text-base font-display font-bold text-white uppercase tracking-[4px]">Mission Progress</h3>
                       <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[2px] mt-1">Jump to logic module</p>
                    </div>
                    <button onClick={() => setIsPaletteOpen(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                        <X className="w-6 h-6 text-zinc-400" />
                    </button>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                        {exam.questions.map((q, i) => {
                          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== ''
                          const isSkippedLocal = skipped.has(q.id)
                          const isCurrent = currentIndex === i
                          
                          let bgColor = 'bg-white/[0.02] border-white/5 text-zinc-600'
                          if (isCurrent) bgColor = 'bg-accent-blue/10 border-accent-blue/40 text-accent-blue shadow-[0_0_15px_rgba(0,98,255,0.1)]'
                          else if (isAnswered) bgColor = 'bg-emerald-400/10 border-emerald-400/20 text-emerald-400'
                          else if (isSkippedLocal) bgColor = 'bg-amber-400/10 border-amber-400/20 text-amber-500'

                          return (
                            <button
                              key={q.id}
                              onClick={() => { setCurrentIndex(i); setCodeOutput(''); setIsPaletteOpen(false); }}
                              className={`h-16 w-full rounded-[20px] border text-xs font-black transition-all flex items-center justify-center ${bgColor}`}
                            >
                              {i + 1}
                            </button>
                          )
                        })}
                    </div>
                 </div>
                 
                 <div className="pt-10 border-t border-white/5 mt-auto">
                    <div className="flex justify-between items-center mb-10 px-4">
                        <div className="text-center">
                           <div className="text-lg font-display font-bold text-emerald-400">{Object.keys(answers).length}</div>
                           <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Done</div>
                        </div>
                        <div className="w-px h-8 bg-white/5" />
                        <div className="text-center">
                           <div className="text-lg font-display font-bold text-amber-400">{skipped.size}</div>
                           <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Skip</div>
                        </div>
                        <div className="w-px h-8 bg-white/5" />
                        <div className="text-center">
                           <div className="text-lg font-display font-bold text-zinc-400">{exam.questions.length - Object.keys(answers).length - skipped.size}</div>
                           <div className="text-[8px] text-zinc-600 font-black uppercase tracking-widest">Wait</div>
                        </div>
                    </div>
                    <button onClick={() => setIsPaletteOpen(false)} className="btn-primary w-full !py-6 text-sm !rounded-[24px] shadow-xl shadow-accent-blue/10">Return to Active Module</button>
                 </div>
               </motion.div>
             </>
           )}
        </AnimatePresence>
      </div>
    </div>
  )
}
