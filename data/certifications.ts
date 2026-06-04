export interface Certification {
  id: string
  name: string
  issuer: string
  category: string
  issueDate?: string
  credentialId?: string
  imageUrl?: string
  pdfUrl?: string
  verifyUrl?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cloud-computing',
    name: 'Fundamentals of Cloud Computing',
    issuer: 'upGrad',
    category: 'Cloud Computing',
    issueDate: 'Aug 2025',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'ai-fluency-students',
    name: 'AI Fluency for Students',
    issuer: 'Anthropic',
    category: 'Artificial Intelligence',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'ai-fluency-framework',
    name: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    category: 'Artificial Intelligence',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'claude-code',
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    category: 'Artificial Intelligence',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'data-science',
    name: 'What is Data Science?',
    issuer: 'IBM × Coursera',
    category: 'Data Science',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'ai-tools-skillup',
    name: 'AI Tools Skill Up',
    issuer: 'GeeksforGeeks',
    category: 'Artificial Intelligence',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'genai-data-analytics',
    name: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'TATA × Forage',
    category: 'Industry Experience',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'sql-basic',
    name: 'SQL (Basic)',
    issuer: 'HackerRank',
    category: 'Database',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'excel-basics',
    name: 'Basics of Microsoft Excel',
    issuer: 'Chandigarh University',
    category: 'Productivity Tools',
    imageUrl: '/certificates/placeholder.jpg',
  },
  {
    id: 'science-day-quiz',
    name: 'National Science Day Quiz',
    issuer: 'Desh Bhagat University',
    category: 'Academic Achievement',
    imageUrl: '/certificates/placeholder.jpg',
  }
]

export const CERTIFICATION_CATEGORIES = [
  'All',
  'Artificial Intelligence',
  'Cloud Computing',
  'Data Science',
  'Analytics',
  'Database',
  'Productivity Tools',
  'Industry Experience',
  'Academic Achievement'
]
