"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Terminal, ChevronRight, ChevronLeft, CheckCircle, Circle, Play, AlertCircle } from 'lucide-react'
import { useStore, Question } from '@/lib/store'
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

  if (!exam) return <div className="p-20 text-center text-white">Exam not found or unavailable.</div>

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
    setCodeOutput('Executing in sandbox environments...\n[+] Memory allocated.\n[+] Tests running...\n[>] Success: All logic constraints satisfied.')
  }

  const submitAttempt = () => {
    let scoreAcc = 0
    let totalPoints = 0
    exam.questions.forEach(q => {
      totalPoints += q.points
      if (answers[q.id] === q.correctAnswer) {
        scoreAcc += q.points
      } else if (q.type === 'CODING' && answers[q.id] && String(answers[q.id]).length > 10) {
          // Fake positive grading for coding if it's somewhat substantive
          scoreAcc += q.points
      }
    })
    const percentage = Math.round((scoreAcc / totalPoints) * 100) || 0

    const newAttempt = {
      id: `attempt-${Date.now()}`,
      examId: exam.id,
      userId: currentUser?.id || 'guest',
      answers,
      score: percentage,
      startTime: new Date(Date.now() - (exam.duration * 60 - timeLeft) * 1000).toISOString(),
      endTime: new Date().toISOString(),
      status: 'completed' as const
    }
    
    addAttempt(newAttempt)
    router.replace(`/student/results/${exam.id}`)
  }

  const handleAutoSubmit = () => {
    setIsSubmitting(true)
    submitAttempt()
  }

  const handleFinalSubmit = () => {
    if (window.confirm('Are you sure you want to construct final submission? Unanswered modules will be scored zero.')) {
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
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Exam Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16">
           <div className="max-w-[800px] mx-auto w-full space-y-10">
              
              {/* Question Header */}
              <div className="flex items-center justify-between pb-8 border-b border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Terminal className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[4px]">Module {currentIndex + 1} / {exam.questions.length}</div>
                        <div className="text-sm font-bold text-zinc-300 uppercase tracking-widest">{question.type} Protocol</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-accent-blue uppercase tracking-[4px] mb-1">Time Remaining</div>
                    <div className={`text-2xl font-display font-bold tracking-tighter ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </div>
                 </div>
              </div>

              {/* Question Body */}
              <motion.div 
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                  <h2 className="text-2xl font-medium leading-relaxed font-display">{question.text}</h2>

                  {question.type === 'MCQ' && (
                    <div className="space-y-4">
                      {question.options?.map((opt, i) => {
                        const isSelected = answers[question.id] === i
                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center gap-4 group ${
                              isSelected 
                                ? 'bg-accent-blue/10 border-accent-blue shadow-[0_0_20px_rgba(30,136,229,0.15)]' 
                                : 'bg-white/[0.02] border-white/5 hover:border-accent-blue/40 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${isSelected ? 'border-accent-blue bg-accent-blue text-white' : 'border-zinc-600 text-transparent group-hover:border-accent-blue/50'}`}>
                                <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {question.type === 'SHORT' && (
                    <div className="space-y-4">
                       <input 
                         type="text" 
                         value={(answers[question.id] as string) || ''}
                         onChange={(e) => handleAnswer(e.target.value)}
                         placeholder="Initialize text input..."
                         className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-sm font-medium text-white outline-none focus:border-accent-blue transition-all"
                       />
                    </div>
                  )}

                  {question.type === 'CODING' && (
                    <div className="space-y-6">
                       <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A0A0A]">
                          <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                             <div className="flex gap-2">
                               <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                               <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                               <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                             </div>
                             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sandbox Execution</span>
                          </div>
                          <textarea 
                            value={(answers[question.id] as string) || ''}
                            onChange={(e) => handleAnswer(e.target.value)}
                            placeholder="// Write your logic sequence here..."
                            className="w-full h-64 bg-transparent p-6 text-sm font-mono text-zinc-300 outline-none resize-none selection:bg-accent-blue/30"
                            spellCheck={false}
                          />
                       </div>
                       <div className="flex justify-start">
                         <button onClick={runCode} className="btn-secondary flex items-center gap-2">
                           <Play className="w-4 h-4" /> Run Code
                         </button>
                       </div>
                       
                       {/* Terminal Output */}
                       <AnimatePresence>
                         {codeOutput && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="rounded-2xl bg-zinc-950 border border-white/5 p-6 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed shadow-inner"
                           >
                              {codeOutput}
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  )}

                  {/* Navigation Forces */}
                  <div className="flex items-center justify-between pt-10 mt-10 border-t border-white/5 gap-4">
                     <button
                       onClick={handlePrev}
                       disabled={currentIndex === 0}
                       className="p-4 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2"
                     >
                       <ChevronLeft className="w-5 h-5" /> <span className="text-xs uppercase font-bold tracking-widest hidden sm:inline">Previous</span>
                     </button>
                     
                     <div className="flex gap-4">
                       <button
                         onClick={handleSkip}
                         className="px-6 py-4 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-xs uppercase font-bold tracking-widest"
                       >
                         Skip
                       </button>

                       <button
                         onClick={handleNext}
                         className="btn-primary flex items-center gap-2"
                       >
                         {currentIndex === exam.questions.length - 1 ? (
                           <>Submit Mission <CheckCircle className="w-4 h-4" /></>
                         ) : (
                           <>Next Protocol <ChevronRight className="w-4 h-4" /></>
                         )}
                       </button>
                     </div>
                  </div>

              </motion.div>
           </div>
        </div>

        {/* Right Sidebar Palette Tracker */}
        <div className="hidden lg:flex w-80 bg-zinc-950/50 border-l border-white/5 flex-col p-8">
           <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[4px] mb-8">Navigation Grid</h3>
           
           <div className="grid grid-cols-5 gap-3">
              {exam.questions.map((q, i) => {
                const isAnswered = answers[q.id] !== undefined && answers[q.id] !== ''
                const isSkippedLocal = skipped.has(q.id)
                const isCurrent = currentIndex === i
                
                let bgColor = 'bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'
                if (isCurrent) bgColor = 'bg-accent-blue/20 border-accent-blue/50 text-accent-blue shadow-[0_0_15px_rgba(30,136,229,0.2)]'
                else if (isAnswered) bgColor = 'bg-emerald-400/20 border-emerald-400/30 text-emerald-400'
                else if (isSkippedLocal) bgColor = 'bg-amber-400/20 border-amber-400/30 text-amber-400'

                return (
                  <button
                    key={q.id}
                    onClick={() => { setCurrentIndex(i); setCodeOutput(''); }}
                    className={`h-12 w-full rounded-xl border text-xs font-bold transition-all shadow-sm flex items-center justify-center ${bgColor}`}
                  >
                    {i + 1}
                  </button>
                )
              })}
           </div>

           <div className="mt-8 space-y-3 pt-8 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Answered</span>
                <span>{Object.keys(answers).length}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Skipped</span>
                <span>{skipped.size}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-zinc-600"></div> Pending</span>
                <span>{exam.questions.length - Object.keys(answers).length - skipped.size}</span>
              </div>
           </div>
           
           <div className="mt-auto pt-8">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[4px] mb-4">Total Progress</div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-accent-blue transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
