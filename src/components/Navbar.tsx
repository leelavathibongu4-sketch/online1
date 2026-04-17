"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Terminal, Shield, Menu, X, ArrowRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section
      const sections = ['hero', 'features', 'quiz', 'timer', 'leaderboard', 'docs']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileMenu(false)
    if (pathname !== '/') {
      router.push(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Quiz', id: 'quiz' },
    { label: 'Timer', id: 'timer' },
    { label: 'Leaderboard', id: 'leaderboard' },
    { label: 'Docs', id: 'docs' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-10'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className={`rounded-full px-8 py-4 border transition-all duration-700 flex items-center justify-between ${scrolled ? 'bg-background/40 backdrop-blur-3xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent'}`}>
          
          {/* Logo */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-10 h-10 blue-gradient rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-accent-blue/20">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tighter uppercase text-white">EXAMPRO</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-[10px] font-black uppercase tracking-[4px] transition-all relative py-2 ${activeSection === link.id ? 'text-accent-blue' : 'text-zinc-500 hover:text-white hover:scale-105'}`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-blue shadow-[0_0_10px_rgba(0,98,255,0.5)]" />
                )}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/auth/login"
              className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-zinc-400"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-3xl p-8 border border-white/10 lg:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-xs font-bold uppercase tracking-[4px] text-zinc-400 hover:text-accent-blue"
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-white/5 w-full my-2" />
            <Link 
              href="/auth/login"
              className="blue-gradient w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-white text-center"
            >
              Launch Control Hub
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
