"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Shield, Mail, User, ArrowRight, Terminal } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function LoginPage() {
  const [role, setRole] = useState<'student' | 'admin'>('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const { setCurrentUser, addExam, exams } = useStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Set user in store
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === 'admin' ? 'Leela Admin' : 'Candidate Alpha'),
      email: email || (role === 'admin' ? 'admin@exampro.io' : 'candidate@exampro.io'),
      role: role
    })

    // If exams are empty, add a default one for demo
    if (exams.length === 0) {
      addExam({
        id: 'demo-1',
        title: 'Quantum Logic Architecture',
        description: 'Industrial assessment for high-performance logic systems.',
        duration: 45,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString(),
        passingScore: 70,
        questions: [
          { id: 'q1', type: 'MCQ', text: 'What is the primary benefit of isolated execution loops?', options: ['Low Latency', 'Security Isolation', 'High Concurrency', 'All of the above'], correctAnswer: 3, points: 10 },
          { id: 'q2', type: 'CODING', text: 'Write a secure execution loop in Javascript.', correctAnswer: '// code logic', points: 30 }
        ],
        status: 'published',
        createdAt: new Date().toISOString()
      })
    }

    if (role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/student/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-accent-blue/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] z-10"
      >
        <div className="glass-card !p-10 md:!p-12 shadow-2xl">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-12 h-12 blue-gradient rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent-blue/20">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 tracking-normal">Secure Access</h1>
            <p className="text-zinc-500 text-sm font-medium">Verify your credentials to enter the hub.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Toggle */}
            <div className="p-1 glass rounded-2xl border border-white/5 flex gap-1">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${role === 'student' ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-zinc-500 hover:text-white'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${role === 'admin' ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'text-zinc-500 hover:text-white'}`}
              >
                Admin
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="group space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[3px] text-zinc-500 px-1">Identity</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 bg-white/[0.02] border border-white/5 rounded-2xl px-6 text-sm font-medium focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[3px] text-zinc-500 px-1">Network Base</label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-white/[0.02] border border-white/5 rounded-2xl px-6 text-sm font-medium focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.04] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl blue-gradient text-white font-bold text-sm flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-blue/10"
            >
              Authenticate System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Link */}
            <div className="text-center pt-4">
              <button type="button" className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">
                Registry Support Required?
              </button>
            </div>
          </form>
        </div>

        {/* Footer Credit */}
        <div className="mt-10 flex justify-center items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <Terminal className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-[4px]">EXAMPRO INDUSTRIAL v2.0</span>
        </div>
      </motion.div>
    </div>
  )
}
