import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuestionType = 'MCQ' | 'SHORT' | 'CODING'

export interface Question {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
  points: number
  timerValue?: number // in seconds
}

export interface Exam {
  id: string
  title: string
  description: string
  duration: number // total duration in minutes (legacy or backup)
  questionTimer?: number // timer per question in seconds
  startTime: string
  endTime: string
  passingScore: number
  questions: Question[]
  status: 'draft' | 'published'
  createdAt: string
  category?: string
}

export interface Attempt {
  id: string
  examId: string
  userId: string
  answers: Record<string, string | number>
  score: number
  startTime: string
  endTime?: string
  status: 'ongoing' | 'completed'
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'student'
}

interface ExamStore {
  currentUser: User | null
  exams: Exam[]
  attempts: Attempt[]
  setCurrentUser: (user: User | null) => void
  addExam: (exam: Exam) => void
  updateExam: (exam: Exam) => void
  addAttempt: (attempt: Attempt) => void
  updateAttempt: (attempt: Attempt) => void
  publishExam: (id: string) => void
  seedExams: () => void
}

const generateMockQuestions = (count: number, examTitle: string): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `q-${examTitle}-${i}`,
    type: i % 3 === 0 ? 'MCQ' : i % 3 === 1 ? 'SHORT' : 'CODING',
    text: `Analysis Node ${i + 1}: Evaluate the efficiency of the ${examTitle} protocol under high-load conditions?`,
    options: i % 3 === 0 ? ['Optimized', 'Degraded', 'Compromised', 'Balanced'] : undefined,
    correctAnswer: i % 3 === 0 ? 0 : i % 3 === 1 ? "The system stabilizes." : "print('efficiency confirmed')",
    explanation: "Standard verification protocol applied. Ensure memory is strictly allocated.",
    points: 2,
    timerValue: 60
  }))
}

const SEED_EXAMS: Exam[] = [
  'Advanced Logic Hub', 'Neural Network Integrity', 'Cybersecurity Forensics', 
  'Quantum Computing Basics', 'Distributed Systems', 'Cloud Infrastructure',
  'Blockchain Architecture', 'AI Ethics & Governance', 'Big Data Engineering',
  'Full-Stack Industrial'
].map((title, idx) => ({
  id: `exam-${idx + 1}`,
  title: title,
  description: `Validation cycle for ${title}. Industrial grade assessment.`,
  duration: 50,
  questionTimer: 60,
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  passingScore: 70,
  questions: generateMockQuestions(50, title),
  status: 'published',
  createdAt: new Date().toISOString(),
  category: 'Industrial Systems'
}))

export const useStore = create<ExamStore>()(
  persist(
    (set) => ({
      currentUser: null,
      exams: SEED_EXAMS,
      attempts: [],
      setCurrentUser: (user) => set({ currentUser: user }),
      addExam: (exam) => set((state) => ({ exams: [...state.exams, exam] })),
      updateExam: (exam) => set((state) => ({ 
        exams: state.exams.map((e) => e.id === exam.id ? exam : e) 
      })),
      addAttempt: (attempt) => set((state) => ({ attempts: [...state.attempts, attempt] })),
      updateAttempt: (attempt) => set((state) => ({ 
        attempts: state.attempts.map((a) => a.id === attempt.id ? attempt : a) 
      })),
      publishExam: (id) => set((state) => ({
        exams: state.exams.map((e) => e.id === id ? { ...e, status: 'published' } : e)
      })),
      seedExams: () => set({ exams: SEED_EXAMS })
    }),
    {
      name: 'exam-platform-storage-v2',
    }
  )
)
