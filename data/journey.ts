export interface JourneyMilestone {
  id: string
  year: string
  title: string
  description: string
  icon: string
  isCurrent?: boolean
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'started-diploma',
    year: '2022',
    title: 'Started CSE Diploma',
    description: 'Began learning programming fundamentals',
    icon: '🚀'
  },
  {
    id: 'c-cpp',
    year: '2022-23',
    title: 'C & C++ Foundations',
    description: 'Built understanding of system-level programming and OOP concepts',
    icon: '💻'
  },
  {
    id: 'web-tech',
    year: '2023',
    title: 'Exploring Web Technologies',
    description: 'Learned HTML, CSS basics and got comfortable with tools',
    icon: '🌐'
  },
  {
    id: 'java-python',
    year: '2023-24',
    title: 'Java & Python Introduction',
    description: 'Expanded language skills and started exploring different paradigms',
    icon: '☕'
  },
  {
    id: 'ai-cloud',
    year: '2024',
    title: 'AI & Cloud Discovery',
    description: 'Started exploring Generative AI, AWS fundamentals and certifications',
    icon: '🤖'
  },
  {
    id: 'diploma-completed',
    year: '2024-25',
    title: 'Diploma Completed',
    description: 'Graduated with CGPA 7.26 and transitioned to B.Tech',
    icon: '🎓'
  },
  {
    id: 'btech-begins',
    year: '2025',
    title: 'B.Tech Journey Begins',
    description: 'Now at Desh Bhagat University, focused on deepening CS knowledge',
    icon: '📚'
  },
  {
    id: 'internship-ready',
    year: 'Now',
    title: 'Internship Ready',
    description: 'Actively seeking opportunities in SDE, AI, Cloud, and Data Analytics',
    icon: '🎯',
    isCurrent: true
  }
]
