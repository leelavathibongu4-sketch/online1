"use client"
import React from 'react'

const TAGS = [
  { label: 'Quiz', id: 'quiz' },
  { label: 'MCQ', id: 'quiz' },
  { label: 'Coding', id: 'quiz' },
  { label: 'Timer', id: 'timer' },
  { label: 'Leaderboard', id: 'leaderboard' },
  { label: 'Auto-Submit', id: 'timer' }
]

export const FloatingTags = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 px-6 mt-6 sm:mt-12">
      {TAGS.map((tag, i) => (
        <button 
          key={i}
          onClick={() => scrollTo(tag.id)}
          className="pill-tag hover:border-accent-blue/50 hover:text-white transition-all cursor-pointer active:scale-95"
        >
          {tag.label}
        </button>
      ))}
    </div>
  )
}
