import { GraduationCap, Scroll, School, LucideIcon } from 'lucide-react'

export interface EducationEntry {
  id: string
  institution: string
  degree?: string
  level?: string
  period?: string
  year?: string
  status: 'Current' | 'Completed'
  statusLabel: string
  badge?: string
  percentage?: string
  cgpa?: string
  details: string[]
  icon: LucideIcon
  highlight?: boolean
}

export const EDUCATION_DATA: EducationEntry[] = [
  {
    id: 'btech',
    institution: 'Desh Bhagat University',
    degree: 'B.Tech in Computer Science & Engineering',
    period: '2025 – Present',
    status: 'Current',
    statusLabel: '🟢 Currently Pursuing',
    badge: 'Active',
    details: [
      '2nd Year Student',
      'Focus: Software Development, AI, Cloud Computing, Data Analytics',
      'Seeking internship opportunities'
    ],
    icon: GraduationCap,
    highlight: true
  },
  {
    id: 'diploma',
    institution: 'NIMS University Jaipur',
    degree: 'Diploma in Computer Science & Engineering',
    period: '2022 – 2025',
    status: 'Completed',
    statusLabel: '✅ Completed',
    percentage: '68.07%',
    cgpa: '7.26',
    details: [
      'Foundation in CSE concepts',
      'Programming fundamentals',
      'Project work'
    ],
    icon: Scroll
  },
  {
    id: '10th',
    institution: 'New S Public School, Samastipur',
    level: 'CBSE Class 10',
    year: '2022',
    status: 'Completed',
    statusLabel: '✅ Completed',
    percentage: '56.2%',
    details: [
      'Secondary school completion',
      'Science stream foundation'
    ],
    icon: School
  }
]
