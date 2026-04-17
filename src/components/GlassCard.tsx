"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface GlassCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export const GlassCard = ({ icon: Icon, title, description }: GlassCardProps) => {
  return (
    <div className="glass-card group flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-blue/10 group-hover:border-accent-blue/20 transition-all">
        <Icon className="w-6 h-6 text-zinc-400 group-hover:text-accent-blue transition-colors" />
      </div>
      <h3 className="text-xl font-display font-bold text-white mb-4 uppercase tracking-wider">{title}</h3>
      <p className="body-text-small">{description}</p>
    </div>
  )
}
