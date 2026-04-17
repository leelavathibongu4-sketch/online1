"use client"
import React, { useState } from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Trash2, Save, Send, Code, 
  HelpCircle, Type, Clock, Trophy, 
  ChevronRight, Upload, FileSpreadsheet,
  CheckCircle2, Settings
} from 'lucide-react'
import { useStore, Question, QuestionType, Exam } from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function CreateExam() {
  const router = useRouter()
  const { addExam } = useStore()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(60)
  const [questionTimer, setQuestionTimer] = useState(30)
  const [passingScore, setPassingScore] = useState(70)
  const [questions, setQuestions] = useState<Question[]>([])
  const [showExcelSim, setShowExcelSim] = useState(false)

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text: '',
      points: 2,
      correctAnswer: type === 'MCQ' ? 0 : '',
      options: type === 'MCQ' ? ['', '', '', ''] : undefined,
      timerValue: questionTimer
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q))
  }

  const handleSave = (status: 'draft' | 'published') => {
    if (!title) return alert('Verification Required: Please enter an exam title')
    
    const newExam: Exam = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      duration,
      questionTimer,
      passingScore,
      questions: questions.map(q => ({ ...q, timerValue: questionTimer })),
      status,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    }
    
    addExam(newExam)
    router.push('/admin/exams')
  }

  const simulateExcelUpload = () => {
    const mockQuestions: Question[] = Array.from({ length: 50 }, (_, i) => ({
      id: `q-excel-${i}`,
      type: i % 3 === 0 ? 'MCQ' : i % 3 === 1 ? 'SHORT' : 'CODING',
      text: `Imported Node ${i + 1}: Analyze the performance coefficient of the industrial cluster?`,
      options: i % 3 === 0 ? ['Optimal', 'Nominal', 'Critical', 'Emergency'] : undefined,
      correctAnswer: i % 3 === 0 ? 0 : i % 3 === 1 ? 'Stability confirmed' : 'print("Execution Success")',
      points: 2,
      timerValue: questionTimer
    }))
    setQuestions([...mockQuestions])
    setShowExcelSim(false)
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="EXAM CONSTRUCTOR v2.0" />
        
        <main className="p-8 md:p-12 lg:p-16 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-accent-blue rounded-[20px] flex items-center justify-center shadow-[0_0_30px_rgba(0,98,255,0.4)]">
                <Plus className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-4xl font-display font-bold text-white tracking-tight">INITIALIZE <span className="text-accent-blue italic font-light">MODULE</span></h2>
                <p className="text-zinc-500 font-medium">Standardize assessment protocols for the industrial cluster.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              {/* Basic Info */}
              <div className="glass shadow-2xl p-10 rounded-[48px] border-white/5 space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="space-y-4 relative z-10">
                  <label className="text-[10px] font-black uppercase tracking-[5px] text-zinc-600 block">Exam Identifier</label>
                  <input 
                    type="text" 
                    placeholder="Enter unique mission title..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-2xl font-bold outline-none focus:border-accent-blue transition-all placeholder:text-zinc-800"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <label className="text-[10px] font-black uppercase tracking-[5px] text-zinc-600 block">Mission Briefing</label>
                  <textarea 
                    placeholder="Configure objectives and scope..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 min-h-[150px] outline-none focus:border-accent-blue transition-all resize-none placeholder:text-zinc-800"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Questions Area */}
              <div className="space-y-8">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-2xl font-display font-bold flex items-center gap-4">
                    MODULE STACK <span className="text-accent-blue text-sm">[{questions.length}]</span>
                  </h3>
                  <button 
                    onClick={() => setShowExcelSim(true)}
                    className="bg-emerald-400/10 border border-emerald-400/20 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-400/20 transition-all flex items-center gap-3"
                  >
                    <FileSpreadsheet className="w-4 h-4" /> Import Excel Archive
                  </button>
                </div>

                <AnimatePresence>
                  {questions.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass border-2 border-dashed border-white/5 rounded-[48px] py-40 text-center"
                    >
                      <Plus className="w-12 h-12 text-zinc-800 mx-auto mb-6" />
                      <p className="text-zinc-600 font-medium">Stack currently empty. Initialize or import modules.</p>
                    </motion.div>
                  ) : (
                    questions.map((q, qIndex) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass p-10 rounded-[48px] border-white/5 relative group"
                      >
                        <button 
                          onClick={() => removeQuestion(q.id)}
                          className="absolute top-8 right-8 p-2 text-zinc-700 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-display font-bold text-accent-cyan border border-white/5">
                            {qIndex + 1}
                          </div>
                          <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[3px] ${
                            q.type === 'MCQ' ? 'bg-accent-blue/10 text-accent-blue' : 
                            q.type === 'CODING' ? 'bg-emerald-400/10 text-emerald-400' : 
                            'bg-accent-cyan/10 text-accent-cyan'
                          }`}>
                            {q.type} PROTOCOL
                          </div>
                        </div>

                        <input 
                          type="text" 
                          placeholder="State the technical challenge..."
                          className="w-full bg-transparent border-b border-white/10 py-4 mb-10 text-xl font-medium outline-none focus:border-accent-blue transition-all"
                          value={q.text}
                          onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                        />

                        {q.type === 'MCQ' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {q.options?.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-4 group/opt">
                                <button 
                                  onClick={() => updateQuestion(q.id, { correctAnswer: optIdx })}
                                  className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${q.correctAnswer === optIdx ? 'bg-accent-blue border-accent-blue shadow-lg' : 'border-white/10'}`}
                                >
                                  {q.correctAnswer === optIdx && <CheckCircle2 className="w-5 h-5 text-white" />}
                                </button>
                                <input 
                                  type="text"
                                  placeholder={`Descriptor ${optIdx + 1}`}
                                  className="flex-1 bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-accent-blue/40 text-sm"
                                  value={opt}
                                  onChange={(e) => {
                                    const newOpts = [...(q.options || [])]
                                    newOpts[optIdx] = e.target.value
                                    updateQuestion(q.id, { options: newOpts })
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {(q.type === 'SHORT' || q.type === 'CODING') && (
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Verified Output Signature</label>
                            <textarea 
                              placeholder={q.type === 'CODING' ? '# Standard implementation...' : 'Conclusion string...'}
                              className={`w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 outline-none focus:border-accent-blue transition-all min-h-[120px] ${q.type === 'CODING' ? 'font-mono text-xs text-emerald-400 bg-black' : ''}`}
                              value={q.correctAnswer}
                              onChange={(e) => updateQuestion(q.id, { correctAnswer: e.target.value })}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>

                {/* Add Question Buttons */}
                <div className="flex flex-wrap gap-4 pt-12 items-center justify-center">
                  <button onClick={() => addQuestion('MCQ')} className="glass flex flex-col items-center justify-center w-40 h-40 rounded-[32px] font-bold hover:border-accent-blue transition-all group gap-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <HelpCircle className="w-6 h-6 text-accent-blue" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white">MCQ Module</span>
                  </button>
                  <button onClick={() => addQuestion('SHORT')} className="glass flex flex-col items-center justify-center w-40 h-40 rounded-[32px] font-bold hover:border-accent-cyan transition-all group gap-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Type className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white">Logic String</span>
                  </button>
                  <button onClick={() => addQuestion('CODING')} className="glass flex flex-col items-center justify-center w-40 h-40 rounded-[32px] font-bold hover:border-emerald-400 transition-all group gap-4 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                       <Code className="w-6 h-6 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white">Code Block</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Config */}
            <div className="lg:col-span-4">
              <div className="glass shadow-2xl p-10 rounded-[48px] border-white/5 sticky top-28 space-y-12">
                <h3 className="text-xl font-display font-bold text-white italic flex items-center gap-3"><Settings className="w-5 h-5 text-accent-blue" /> CONFIGURATION</h3>
                
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-600">Mission Duration</span>
                      <span className="text-accent-blue">{duration} Minutes</span>
                    </div>
                    <input 
                      type="range" min="15" max="240" step="15"
                      className="w-full accent-accent-blue h-1 bg-white/5 rounded-full cursor-pointer"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-600">Module Pulse (Timer)</span>
                      <span className="text-accent-cyan">{questionTimer} Seconds</span>
                    </div>
                    <input 
                      type="range" min="10" max="120" step="5"
                      className="w-full accent-accent-cyan h-1 bg-white/5 rounded-full cursor-pointer"
                      value={questionTimer}
                      onChange={(e) => setQuestionTimer(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-zinc-600">Critical Accuracy</span>
                      <span className="text-emerald-400">{passingScore}%</span>
                    </div>
                    <input 
                      type="range" min="40" max="100" step="5"
                      className="w-full accent-emerald-400 h-1 bg-white/5 rounded-full cursor-pointer"
                      value={passingScore}
                      onChange={(e) => setPassingScore(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <button 
                    onClick={() => handleSave('published')}
                    className="w-full blue-gradient py-6 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,100,255,0.3)] hover:scale-[1.03] active:scale-95 transition-all"
                  >
                    <Send className="w-5 h-5" /> BROADCAST MISSION
                  </button>
                  <button 
                    onClick={() => handleSave('draft')}
                    className="w-full bg-white/5 border border-white/5 py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-xs uppercase tracking-widest text-zinc-500"
                  >
                    <Save className="w-4 h-4" /> Save Local Cache
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Excel Upload Simulation Overlay */}
      <AnimatePresence>
        {showExcelSim && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="glass p-16 rounded-[60px] max-w-xl w-full text-center border-accent-blue/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-blue/[0.02] pointer-events-none" />
              <div className="w-24 h-24 bg-emerald-400/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 border border-emerald-400/20 shadow-[0_0_40px_rgba(52,211,153,0.1)]">
                <Upload className="text-emerald-400 w-12 h-12" />
              </div>
              <h3 className="text-3xl font-display font-bold mb-6 tracking-tighter uppercase">ARCHIVE INJECTION</h3>
              <p className="text-zinc-500 mb-12 text-sm leading-relaxed px-8">Uploading dataset cluster. The engine will synthesize 50 modules with 30s pulse locks automatically.</p>
              
              <div className="p-8 border border-white/5 rounded-3xl bg-black/40 mb-12 text-left font-mono text-[10px] space-y-3">
                <div className="flex gap-4">
                  <span className="text-emerald-400">STATUS:</span>
                  <span className="text-zinc-400 animate-pulse">Scanning industrial_dump.xlsx...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-emerald-400">STRUCT:</span>
                  <span className="text-zinc-600">Verification Table [Detected]</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-emerald-400">MAP:</span>
                  <span className="text-zinc-600">Headers mapped to Logic Clusters</span>
                </div>
              </div>

              <div className="flex gap-6 relative z-10">
                <button onClick={() => setShowExcelSim(false)} className="flex-1 bg-white/5 border border-white/5 py-4 rounded-3xl font-bold text-zinc-600 hover:text-white transition-all uppercase text-[10px] tracking-widest">Abort</button>
                <button onClick={simulateExcelUpload} className="flex-1 blue-gradient py-4 rounded-3xl font-bold shadow-[0_0_30px_rgba(0,100,255,0.4)] text-xs uppercase tracking-[3px]">Deploy Dataset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
