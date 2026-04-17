"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { Users, Search, MoreVertical, Shield, Mail, Calendar } from 'lucide-react'

export default function AdminStudents() {
  const students = [
    { id: '1', name: 'Leela Agent', email: 'leela@exampro.io', joined: '2026-04-01', status: 'Verified', accuracy: '98.2%' },
    { id: '2', name: 'Candidate Prime', email: 'prime@net.org', joined: '2026-04-05', status: 'Active', accuracy: '85.4%' },
    { id: '3', name: 'Alpha X', email: 'alphax@logic.com', joined: '2026-04-10', status: 'Pending', accuracy: 'N/A' },
  ]

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="admin" />
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Candidate Directory" />
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1400px]">
          <div className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-display font-bold text-white tracking-tight">STUDENT <span className="text-accent-blue font-light italic">DATABASE</span></h1>
              <p className="text-zinc-500 mt-2">Manage and monitor all active assessment candidates.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input type="text" placeholder="Search by name/email..." className="bg-white/5 border border-white/5 rounded-full pl-12 pr-6 py-3 text-sm focus:border-accent-blue/30 outline-none w-80 transition-all" />
            </div>
          </div>

          <div className="glass-card !p-0 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Contact</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Joined</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Accuracy</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[3px] text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6 font-bold text-white group-hover:text-accent-blue transition-colors">{student.name}</td>
                    <td className="px-8 py-6 text-zinc-500 text-sm">{student.email}</td>
                    <td className="px-8 py-6 text-zinc-500 text-sm">{student.joined}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/5 border border-white/10 ${student.status === 'Verified' ? 'text-emerald-400 border-emerald-400/20' : 'text-zinc-500'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-display font-medium text-accent-cyan">{student.accuracy}</td>
                    <td className="px-8 py-6 text-zinc-700 hover:text-white cursor-pointer transition-colors"><MoreVertical className="w-5 h-5" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
