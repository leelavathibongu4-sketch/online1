"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { 
  FileText, Calendar, Plus, MoreVertical, 
  ExternalLink, Trash2, Send, Clock
} from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { format } from 'date-fns'

export default function MyExams() {
  const { exams, publishExam } = useStore()

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Question Inventory" />
        
        <main className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">ALL EXAMS</h2>
              <p className="text-zinc-500 mt-2">Manage and monitor all your created assessments.</p>
            </div>
            
            <Link 
              href="/admin/exams/create"
              className="blue-gradient px-6 py-3 rounded-2xl font-bold flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Exam
            </Link>
          </div>

          {exams.length === 0 ? (
            <div className="glass p-20 rounded-[40px] border-white/5 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-zinc-700" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">NO EXAMS DETECTED</h3>
              <p className="text-zinc-500 max-w-sm mb-10">Start by creating your first exam to populate your dashboard and invite students.</p>
              <Link href="/admin/exams/create" className="blue-gradient px-8 py-4 rounded-2xl font-bold">Initialize First Session</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam, i) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-[32px] border-white/5 group hover:border-accent-blue/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-blue/10 flex items-center justify-center">
                      <FileText className="text-accent-blue w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-accent-blue transition-colors clamp-1">{exam.title}</h3>
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2 h-10">{exam.description || 'No description provided for this assessment.'}</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 flex items-center gap-2 uppercase tracking-widest font-bold"><Clock className="w-3.5 h-3.5" /> Duration</span>
                      <span className="text-white font-medium">{exam.duration}m</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 flex items-center gap-2 uppercase tracking-widest font-bold"><Calendar className="w-3.5 h-3.5" /> Created</span>
                      <span className="text-white font-medium">{format(new Date(exam.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 flex items-center gap-2 uppercase tracking-widest font-bold"><Send className="w-3.5 h-3.5" /> Status</span>
                      <span className={`font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${exam.status === 'published' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                        {exam.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {exam.status === 'draft' && (
                      <button 
                        onClick={() => publishExam(exam.id)}
                        className="flex-1 blue-gradient py-3 rounded-xl font-bold text-sm"
                      >
                        Publish
                      </button>
                    )}
                    <button className="flex-1 glass py-3 rounded-xl font-bold text-sm hover:bg-white/5 transition-all text-zinc-400 group-hover:text-white">
                      Edit Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
