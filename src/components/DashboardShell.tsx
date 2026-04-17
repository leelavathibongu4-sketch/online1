"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, FileText, Settings, 
  LogOut, User, Bell, Search, Terminal,
  Plus, Calendar, ListChecks, Menu, X
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/lib/store'

interface SidebarProps {
  role: 'admin' | 'student'
}

export const Sidebar = ({ role }: SidebarProps) => {
  // Return early, the sidebar has been merged into the toggle drawer in DashboardHeader
  return null
}

export const DashboardHeader = ({ title }: { title: string }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const { currentUser } = useStore()
  
  const isAdmin = pathname.startsWith('/admin')

  const links = isAdmin ? [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { label: 'Total Exams', icon: FileText, href: '/admin/exams' },
    { label: 'Submissions', icon: ListChecks, href: '/admin/submissions' },
    { label: 'Students', icon: User, href: '/admin/students' },
    { label: 'Upcoming', icon: Calendar, href: '/admin/upcoming' },
    { label: 'Create Module', icon: Plus, href: '/admin/exams/create' },
  ] : [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/student/dashboard' },
    { label: 'Available Exams', icon: Calendar, href: '/student/exams' },
    { label: 'My Results', icon: ListChecks, href: '/student/history' },
    { label: 'Profile', icon: User, href: '/student/profile' },
  ]

  return (
    <>
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-12 bg-background/60 backdrop-blur-3xl sticky top-0 z-40 w-full transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden sm:flex items-center gap-3 mr-4">
            <span className="font-display font-bold text-sm tracking-tighter uppercase text-white">EXAMPRO</span>
          </div>
          <h1 className="text-xs font-bold uppercase tracking-[4px] text-zinc-500 whitespace-nowrap border-l border-white/10 pl-4 hidden md:block">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-accent-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Search resources..."
              className="bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-accent-blue/30 w-64 transition-all"
            />
          </div>
          
          <Link href="/student/notifications" className="relative p-2 text-zinc-500 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-blue rounded-full border-2 border-background" />
          </Link>

          <Link href="/student/profile" className="flex items-center gap-3 pl-6 border-l border-white/10 group">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-accent-blue transition-colors">{currentUser?.name || 'Guest'}</p>
              <p className="text-[10px] text-zinc-600 uppercase font-black">{currentUser?.role || 'User'}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center border border-accent-blue/30 group-hover:bg-accent-blue/40 transition-colors">
              <User className="w-4 h-4 text-accent-blue group-hover:text-white transition-colors" />
            </div>
          </Link>
        </div>
      </header>

      {/* Slide-out Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-background z-[70] flex flex-col border-r border-white/10 shadow-2xl shadow-black/50"
            >
              <div className="p-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center">
                    <Terminal className="text-white w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-lg tracking-tighter uppercase text-white">EXAMPRO</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <nav className="space-y-2">
                  {links.map((link) => {
                    const isActive = pathname === link.href || (link.href !== '/student/dashboard' && link.href !== '/admin/dashboard' && pathname.startsWith(link.href))
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                          isActive 
                            ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <link.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6 border-t border-white/5 shrink-0">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
