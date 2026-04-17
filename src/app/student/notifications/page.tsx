"use client"
import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/DashboardShell'
import { motion } from 'framer-motion'
import { Bell, Info, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Security Protocol Updated',
      message: 'New integrity checks have been added to your upcoming modules. Please review the updated guidelines.',
      time: '2 hours ago',
      icon: ShieldAlert,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
      borderColor: 'border-amber-400/20'
    },
    {
      id: 2,
      type: 'success',
      title: 'Mission Accomplished',
      message: 'Your recent submission for Logic Module 04 was graded. Accuracy: 98%.',
      time: '5 hours ago',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance',
      message: 'ExamPro central servers will be down for maintenance at 0300 HRS UTC.',
      time: '1 day ago',
      icon: Info,
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/10',
      borderColor: 'border-accent-blue/20'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Assessment Deadline Approaching',
      message: 'Final Sprint v2 must be completed within the next 48 hours to maintain rank.',
      time: '2 days ago',
      icon: AlertTriangle,
      color: 'text-rose-400',
      bgColor: 'bg-rose-400/10',
      borderColor: 'border-rose-400/20'
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white selection:bg-accent-blue/30 overflow-x-hidden">
      <Sidebar role="student" />
      
      <div className="min-h-screen flex flex-col">
        <DashboardHeader title="Notification Center" />
        
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center border border-accent-blue/30">
                <Bell className="w-4 h-4 text-accent-blue" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[4px] text-zinc-500">System Logs</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              COMMUNICATION <span className="text-accent-blue">HUB</span>
            </h1>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card !p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center group border-white/5 hover:border-accent-blue/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${notif.bgColor} ${notif.borderColor} border`}>
                  <notif.icon className={`w-6 h-6 ${notif.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap ml-4">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    {notif.message}
                  </p>
                </div>

                <button className="hidden sm:flex w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/10 group-hover:bg-accent-blue group-hover:text-white group-hover:border-accent-blue transition-all group-hover:shadow-[0_0_20px_rgba(30,136,229,0.4)]">
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </button>
              </motion.div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
