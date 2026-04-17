"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FloatingTags } from '@/components/FloatingTags'
import { GlassCard } from '@/components/GlassCard'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import { 
  Users, Code, Timer, BarChart3, Shield, Star, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Terminal, Monitor, Database, Globe, Lock, Zap,
  FileText, MessageSquare, Trophy, MousePointer2,
  Clock, CheckCircle, Smartphone, Activity, Sparkles, X
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
}

export default function Home() {
  const router = useRouter()
  const [activeManual, setActiveManual] = React.useState<string | null>(null)

  const manualsData: Record<string, { title: string; content: string; code?: string }> = {
    'API Gateway': {
      title: 'API Gateway Protocol',
      content: 'Connect to our high-availability REST architecture. Push and pull raw question matrices globally with a 10ms latency SLA.',
      code: 'async function connect() {\n  return await API.init_gateway("alpha-04");\n}'
    },
    'Excel Sync': {
      title: 'Excel Sync Standard',
      content: 'Standardized spreadsheet parsing logic. Drop an entire syllabus structure directly into the core engine via CSV payloads.',
      code: 'engine.parseCSV({\n  strict_mode: true,\n  payload: fileBuffer\n});'
    },
    'Security Auth': {
      title: 'Zero-Trust Handshakes',
      content: 'Multi-factor execution loops using JSON Web Tokens combined with ephemeral device signatures to guarantee identity.',
      code: 'AuthStrategy.use(\n  new BiometricStrategy({ strict: true })\n);'
    },
    'Heartbeat': {
      title: 'Heartbeat Webhooks',
      content: 'Live telemetry socket subscriptions. Listen to candidate progression paths and hardware interrupts instantaneously.',
      code: 'socket.on("heartbeat_loss", (session) => {\n  console.warn(session);\n});'
    }
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative bg-background text-foreground font-sans selection:bg-accent-blue/30 overflow-x-hidden scroll-smooth">
      <Navbar />

      <AnimatePresence>
        {activeManual && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveManual(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-zinc-950 border border-white/10 p-12 rounded-[40px] z-[110] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col"
            >
               <button onClick={() => setActiveManual(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10">
                  <X className="w-5 h-5" />
               </button>
               <div className="w-16 h-16 rounded-[20px] bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20 mb-8">
                  <Terminal className="text-accent-blue w-8 h-8" />
               </div>
               <h3 className="text-3xl font-display font-bold text-white mb-4 tracking-normal">{manualsData[activeManual].title}</h3>
               <p className="text-zinc-400 text-base leading-relaxed mb-10 font-medium">{manualsData[activeManual].content}</p>
               
               <div className="bg-black/50 border border-white/5 p-6 rounded-2xl font-mono text-sm text-emerald-400/90 whitespace-pre-wrap leading-relaxed ring-1 ring-inset ring-white/10 shadow-inner">
                  {manualsData[activeManual].code}
               </div>

               <div className="mt-10 flex gap-4 pt-8 border-t border-white/5">
                 <button onClick={() => setActiveManual(null)} className="btn-primary w-full shadow-none font-bold text-sm tracking-widest uppercase">
                   Acknowledge
                 </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 px-6 z-10">
        {/* Spotlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] spotlight-glow z-0" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 glass mb-12 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-accent-blue animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[5px] text-zinc-400">The Industrial Assessment Standard</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="heading-h1 mb-10 text-gradient leading-[1.05]"
          >
            Smarter exams. <br />
            Precise <span className="opacity-40 italic font-light">forensics.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="body-text mb-16 max-w-[750px] mx-auto text-xl leading-relaxed"
          >
            Deploy high-integrity assessments with real-time tracking, 
            automated grading clusters, and secure sandbox environments. 
            Engineered for organizations that demand absolute reliability.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 md:mb-32 lg:mb-48"
          >
            <button 
              onClick={() => router.push('/auth/login')}
              className="btn-primary group w-full sm:w-auto"
            >
              Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollTo('docs')}
              className="btn-secondary w-full sm:w-auto"
            >
              View Documentation
            </button>
          </motion.div>

          <div className="hidden sm:block">
            <FloatingTags />
          </div>
          <div className="sm:hidden mt-10">
             <p className="text-[10px] font-black uppercase tracking-[4px] text-zinc-600 mb-6">Interactive Modules</p>
             <FloatingTags />
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="section-wrapper">
        <motion.div {...fadeInUp} className="text-center mb-32 max-w-[700px] mx-auto">
          <span className="text-accent-blue text-[10px] font-black uppercase tracking-[8px] block mb-6">Execution Suite</span>
          <h2 className="heading-h2 text-5xl mb-8">Built for <span className="text-zinc-600">Performance.</span></h2>
          <p className="body-text-small text-xl max-w-lg mx-auto">Absolute stability, zero-latency sync, and military-grade session integrity.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { icon: Shield, title: "Forensic Integrity", desc: "Multi-parameter session tracking with biometric-style identity verification." },
            { icon: Code, title: "Isolated Sandbox", desc: "Ephemeral containers for logic execution with 100ms feedback cycles." },
            { icon: Timer, title: "Hardware Sync", desc: "Clock protocols aligned with regional nodes to prevent latency drifts." },
            { icon: BarChart3, title: "Cognitive Maps", desc: "Generate multi-dimensional heatmaps of candidate performance instantly." },
            { icon: Activity, title: "Status Heartbeat", desc: "Live health monitoring of individual sessions across the global cluster." },
            { icon: Database, title: "Drizzle Core", desc: "High-performance data layer built on edge-ready persistence paradigms." },
          ].map((feat, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard icon={feat.icon} title={feat.title} description={feat.desc} />
            </motion.div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* 3. EXAM TYPES SECTION */}
      <section id="quiz" className="section-wrapper relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] spotlight-glow opacity-5 z-0" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
           <motion.div {...fadeInUp}>
              <span className="text-accent-blue text-[10px] font-black uppercase tracking-[8px] block mb-6">Multi-Modality</span>
              <h2 className="heading-h2 text-5xl text-left mb-10 leading-[1.1]">The Modern Exam <br /><span className="text-zinc-600 italic">Experience.</span></h2>
              <p className="body-text-small text-left mb-16 text-xl leading-relaxed">Transition between complex MCQs and live coding environments with zero context switching. Our engine adapts to the candidate&apos;s speed and cognitive rhythm.</p>
              
              <div className="space-y-10">
                 <div className="flex gap-8 items-start group">
                    <div className="w-14 h-14 rounded-[22px] bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-accent-blue/30 transition-all">
                       <MousePointer2 className="w-6 h-6 text-accent-blue" />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Adaptive Clusters</h4>
                       <p className="text-zinc-500 text-base leading-relaxed">Dynamic difficulty curves that challenge candidates in real-time based on verified responses.</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start group">
                    <div className="w-14 h-14 rounded-[22px] bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-emerald-400/30 transition-all">
                       <Terminal className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">Logic Sandboxes</h4>
                       <p className="text-zinc-500 text-base leading-relaxed">Secure, isolated containers supporting core JS and Python logic blocks with instant evaluation.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
              <div className="glass shadow-2xl rounded-[60px] p-12 border-accent-blue/20 bg-accent-blue/[0.02] relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl" />
                 <div className="flex justify-between items-center mb-12">
                    <div className="flex gap-2.5">
                       <div className="w-3.5 h-3.5 rounded-full bg-red-400/20 border border-red-400/30" />
                       <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/20 border border-yellow-400/30" />
                       <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/20 border border-emerald-400/30" />
                    </div>
                    <div className="pill-tag !px-3 !py-1">Compiler Active</div>
                 </div>
                 <div className="font-mono text-base space-y-6">
                    <p className="text-emerald-400/60 leading-relaxed">{"// Protocol: Secure Execution Loop"}</p>
                    <p className="text-white">{"async function deploy(attempt) {"}</p>
                    <p className="text-zinc-500 pl-6">{"const session = await Mainframe.verify();"}</p>
                    <p className="text-zinc-500 pl-6">{"return session.commit(attempt.payload);"}</p>
                    <p className="text-white">{"}"}</p>
                    <div className="pt-10">
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: "85%" }} 
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                            className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan shadow-[0_0_20px_rgba(0,98,255,0.5)]" 
                          />
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      <div className="divider" />

      {/* 4. TIMER & SYNC SECTION */}
      <section id="timer" className="section-wrapper">
        <motion.div 
          {...fadeInUp}
          className="glass rounded-[60px] p-20 border-white/5 overflow-hidden relative"
        >
          <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] spotlight-glow z-0" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
             <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center mb-10 border border-white/5 shadow-inner">
                   <Clock className="w-10 h-10 text-accent-blue" />
                </div>
                <h2 className="heading-h2 text-5xl mb-8 leading-tight">Persistence <br /><span className="text-zinc-600">Protocol.</span></h2>
                <p className="body-text-small mb-12 text-xl leading-relaxed">Distributed clock synchronization ensures that even with total network failure, the candidate&apos;s timer remains hardware-locked. Auto-submission triggers at T-minus zero.</p>
                <div className="grid grid-cols-2 gap-8 w-full max-w-lg">
                   {['Sub-10ms Sync', 'Cluster Lock', 'Live Heartbeat', 'Forensic Log'].map(i => (
                     <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase text-zinc-400 tracking-[3px]">
                        <CheckCircle2 className="w-5 h-5 text-accent-blue" /> {i}
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="flex justify-center">
                <div className="w-80 h-80 rounded-full border-[1.5px] border-white/5 relative flex items-center justify-center p-8">
                   <div className="absolute inset-0 border-[2px] border-accent-blue rounded-full border-t-transparent animate-[spin_12s_linear_infinite] shadow-[0_0_50px_rgba(0,98,255,0.1)]" />
                   <div className="text-center">
                      <p className="text-xs font-black text-zinc-600 uppercase tracking-[6px] mb-4">Time Remaining</p>
                      <p className="text-7xl font-display font-bold text-white tracking-normal italic">42:15</p>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      <div className="divider" />

      {/* 5. LEADERBOARD SECTION */}
      <section id="leaderboard" className="section-wrapper">
         <motion.div {...fadeInUp} className="text-center mb-32 max-w-[800px] mx-auto">
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[10px] block mb-6">Global Engagement</span>
            <h2 className="heading-h2 text-5xl mb-8">Performance <span className="text-zinc-600">Metrology.</span></h2>
            <p className="body-text-small text-xl max-w-lg mx-auto">Foster absolute clarity with verified, real-time leaderboard systems powered by forensic scoring algorithms.</p>
         </motion.div>

         <div className="glass shadow-2xl rounded-[60px] overflow-hidden border-white/10 group">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
               {[
                 { rank: '#01', name: 'Leela Agent', score: 99.8, loc: 'East Node 04', status: 'Verified' },
                 { rank: '#02', name: 'Candidate Prime', score: 98.2, loc: 'West Node 12', status: 'Verified' },
                 { rank: '#03', name: 'Alpha X', score: 97.4, loc: 'Global Cluster', status: 'Verified' },
               ].map((user, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                   className="p-16 transition-all cursor-pointer relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-8">
                       <Trophy className={`w-8 h-8 ${i === 0 ? 'text-accent-blue opacity-50' : 'text-zinc-800'}`} />
                    </div>
                    <span className="text-6xl font-display font-bold text-zinc-800/40 mb-10 block tracking-tighter">{user.rank}</span>
                    <p className="text-2xl font-bold text-white mb-3 tracking-tight">{user.name}</p>
                    <div className="flex justify-between items-end">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">{user.loc}</p>
                          <div className="pill-tag !px-2 !py-0.5 !text-[8px] border-emerald-400/20 text-emerald-400 bg-emerald-400/5">{user.status}</div>
                       </div>
                       <p className="text-4xl font-display font-bold text-gradient tracking-tighter italic">{user.score}%</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      <div className="divider" />

      {/* 6. DOCUMENTATION SECTION */}
      <section id="docs" className="section-wrapper">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp} className="space-y-16">
               <div>
                  <h2 className="heading-h2 text-6xl text-left mb-8 leading-[1.05]">Built for <br /><span className="text-zinc-600 italic">Integrators.</span></h2>
                  <p className="body-text-small text-left text-xl leading-relaxed max-w-md">Comprehensive API manuals and automated deployment blueprints to scale your node in seconds.</p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'API Gateway', icon: Database, color: 'text-accent-blue' },
                    { title: 'Excel Sync', icon: FileText, color: 'text-zinc-400' },
                    { title: 'Security Auth', icon: Shield, color: 'text-white' },
                    { title: 'Heartbeat', icon: Activity, color: 'text-zinc-500' },
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      onClick={() => setActiveManual(item.title)}
                      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                      className="p-8 glass rounded-[32px] border border-white/5 flex items-center gap-6 cursor-pointer transition-all hover:border-white/20"
                    >
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-xl">
                          <item.icon className={`w-6 h-6 ${item.color}`} />
                       </div>
                       <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">{item.title}</span>
                    </motion.div>
                  ))}
               </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-[#0c0c0e] rounded-[60px] border border-white/5 p-16 font-mono text-base shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Terminal className="w-40 h-40 text-accent-blue" />
               </div>
               <div className="flex gap-6 mb-12 border-b border-white/5 pb-6">
                  <span className="text-accent-blue cursor-pointer font-bold">POST</span>
                  <span className="text-zinc-600 cursor-pointer hover:text-white transition-colors">GET</span>
                  <span className="text-zinc-600 cursor-pointer hover:text-white transition-colors">QUERY</span>
               </div>
               <div className="space-y-4 relative z-10">
                  <p className="text-accent-blue/80">{"{ \"protocol\": \"init_v2\", \"cluster\": \"alpha-04\" }"}</p>
                  <br />
                  <p className="text-zinc-700">{"// Connecting to ExamPro Mainframe"}</p>
                  <p className="text-white brightness-125">{"const engine = await init('exampro');"}</p>
                  <p className="text-white brightness-125">{"engine.deploy({ scale: 'edge_computing' });"}</p>
                  <br />
                  <p className="text-emerald-400 font-bold py-3 px-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10 inline-block">{"Protocol Status [200 OK]"}</p>
               </div>
            </motion.div>
         </div>
      </section>

      <div className="divider" />

      {/* 7. CTA / CONTACT SECTION */}
      <section id="contact" className="section-wrapper py-60">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-[80px] p-32 flex flex-col items-center text-center border-accent-blue/20 bg-gradient-to-br from-accent-blue/[0.08] via-transparent to-transparent relative shadow-2xl"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] spotlight-glow opacity-30 z-0" />
          
          <div className="relative z-10">
             <div className="w-20 h-20 rounded-[30px] bg-accent-blue flex items-center justify-center mb-12 shadow-[0_0_50px_rgba(0,98,255,0.4)] ring-8 ring-accent-blue/10">
                <Zap className="text-white w-10 h-10" />
             </div>
             <h2 className="heading-h1 mb-12 max-w-[850px] leading-[1.05]">
                Ready to deploy the <br />industrial standard?
             </h2>
             <p className="body-text mb-20 max-w-xl text-xl">Integrate the world&apos;s most stable assessment architecture. Secure, distributed, and remarkably elegant.</p>
             <div className="flex flex-col sm:flex-row gap-6">
               <button 
                 onClick={() => router.push('/auth/login')}
                 className="btn-primary"
               >
                 Launch Control Hub
               </button>
               <button 
                 onClick={() => scrollTo('docs')}
                 className="btn-secondary"
               >
                 Contact Integration
               </button>
             </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="section-wrapper pb-20 border-t border-white/5 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
              <Terminal className="text-accent-blue w-6 h-6" />
            </div>
            <div className="text-left">
               <span className="font-display font-bold text-xl tracking-tighter uppercase text-white block leading-none">EXAMPRO</span>
               <span className="text-[8px] font-black uppercase tracking-[8px] text-zinc-600">Unified System</span>
            </div>
          </div>
          <div className="text-center text-[10px] font-black uppercase tracking-[12px] text-zinc-700">
            © 2026 EXAMPRO INDUSTRIAL | PRECISION BUILT
          </div>
          <div className="flex gap-16 text-[10px] uppercase font-black tracking-[3px] text-zinc-500">
            <a href="#" className="hover:text-white transition-all hover:tracking-[5px]">Core</a>
            <a href="#" className="hover:text-white transition-all hover:tracking-[5px]">Auth</a>
            <a href="#" className="hover:text-white transition-all hover:tracking-[5px]">API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
