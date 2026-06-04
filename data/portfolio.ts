/**
 * data/portfolio.ts  —  Single source of truth for all portfolio content.
 */
import type { PortfolioMeta, Project, SkillGroup, TimelineItem, Education } from '@/types'

// ── Personal Meta ─────────────────────────────────────────────
export const META: PortfolioMeta = {
  name:          'Nayan Deep',
  displayName:   'Nayan Deep',
  role:          'B.Tech Computer Science Student · 2nd Year',
  roles: [
    'Building Software Development Solutions',
    'Exploring Artificial Intelligence',
    'Learning Cloud Computing',
    'Discovering Data Analytics',
  ],
  tagline:  'Building real things with real code.',
  bio: `I'm a 2nd-year B.Tech Computer Science student at Desh Bhagat University,
passionate about building cloud-native applications, AI-powered tools, and
data-driven solutions. I love shipping projects that solve real problems —
from serverless image-analysis pipelines on AWS to algorithm-benchmarking
tools in C. Currently seeking internships in Software Development, AI,
Cloud Computing, and Data Analytics.`,
  email:         'nayandeep1412@gmail.com',
  location:      'India',
  resumeUrl:     '/resume/nayan-deep-resume.pdf',
  availableFrom: 'Immediately',
  socials: {
    github: 'https://github.com/nayan-codes15',
    linkedin: 'https://www.linkedin.com/in/nayan-deep-460119279',
  },
}

// ── Education ─────────────────────────────────────────────────
export const EDUCATION: Education = {
  institution: 'Desh Bhagat University',
  degree:      'Bachelor of Technology',
  field:       'Computer Science and Engineering',
  year:        '2023 – 2027',
  location:    'Punjab, India',
  highlights: [
    'Data Structures & Algorithms (DAA)',
    'Cloud Computing',
    'Operating Systems',
    'Database Management Systems',
    'Computer Networks',
    'Object Oriented Programming',
  ],
}

// ── Projects ─────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id:       'visionai',
    title:    'VisionAI',
    subtitle: 'Serverless AI Image Analysis Platform',
    description:
      `Upload any image and receive instant AI-powered analysis: object labels,
face attributes, OCR text extraction, and content moderation — powered by
AWS Rekognition in a fully serverless, event-driven pipeline.`,
    category: 'cloud',
    featured: true,
    year:     2024,
    tech: [
      'React', 'Node.js', 'AWS Lambda', 'AWS S3',
      'DynamoDB', 'AWS Rekognition', 'Serverless Framework', 'Vite',
    ],
    highlights: [
      'Parallel API calls via Promise.allSettled() — labels, faces, OCR & moderation in one Lambda invocation',
      'Event-driven: S3 ObjectCreated trigger fires Lambda automatically — zero polling',
      'Pre-signed S3 URLs for direct, secure browser uploads (no server relay)',
      'AI narrative summaries via Groq / OpenAI service layer',
      'DynamoDB stores results with automatic PENDING → COMPLETED / FAILED status',
    ],
    architecture: [
      { icon: '⬆', label: 'React Upload' },
      { icon: '☁', label: 'S3 Bucket'    },
      { icon: 'λ', label: 'Lambda'       },
      { icon: '👁', label: 'Rekognition' },
      { icon: '🗄', label: 'DynamoDB'    },
    ],
    githubUrl: 'https://github.com/nayan-codes15',
  },
  {
    id:       'sorting-analyzer',
    title:    'Algorithm Analyzer',
    subtitle: 'Sorting Algorithm Benchmarking Tool',
    description:
      `Interactive CLI tool written in C that lets you compare five sorting
algorithms on the same dataset — measuring real execution time and
displaying Big-O complexity analysis side-by-side.`,
    category: 'systems',
    featured: false,
    year:     2024,
    tech: ['C', 'Algorithms', 'DAA', 'Data Structures'],
    highlights: [
      'Implements Bubble, Selection, Insertion, Merge, and Quick Sort from scratch',
      'Microsecond execution timing using clock() — real benchmarks, not theoretical',
      'Big-O best / average / worst case comparison table after every run',
      'Supports manual data entry or random-number generation for testing',
    ],
    githubUrl: 'https://github.com/nayan-codes15',
  },
]

// ── Skills ────────────────────────────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id:    'cloud',
    label: 'Cloud & Backend',
    icon:  '☁',
    skills: [
      { name: 'AWS Lambda',           level: 80 },
      { name: 'AWS S3',               level: 80 },
      { name: 'AWS Rekognition',      level: 75 },
      { name: 'DynamoDB',             level: 72 },
      { name: 'Node.js',              level: 78 },
      { name: 'Serverless Framework', level: 70 },
    ],
  },
  {
    id:    'frontend',
    label: 'Frontend',
    icon:  '⚛',
    skills: [
      { name: 'React / JSX',        level: 80 },
      { name: 'JavaScript ES2022+', level: 82 },
      { name: 'TypeScript',         level: 72 },
      { name: 'HTML / CSS',         level: 85 },
      { name: 'Tailwind CSS',       level: 80 },
    ],
  },
  {
    id:    'systems',
    label: 'Systems & Algorithms',
    icon:  '⚙',
    skills: [
      { name: 'C / C++',                     level: 78 },
      { name: 'Data Structures & Algorithms', level: 82 },
      { name: 'Algorithm Design (DAA)',       level: 80 },
    ],
  },
  {
    id:    'tools',
    label: 'Tools & DevOps',
    icon:  '🛠',
    skills: [
      { name: 'Git & GitHub', level: 82 },
      { name: 'Docker',       level: 60 },
      { name: 'Linux CLI',    level: 70 },
    ],
  },
]

export const RADAR_DATA = [
  { subject: 'Cloud',      value: 78, fullMark: 100 },
  { subject: 'Frontend',   value: 80, fullMark: 100 },
  { subject: 'Backend',    value: 76, fullMark: 100 },
  { subject: 'Algorithms', value: 82, fullMark: 100 },
  { subject: 'AI / ML',    value: 62, fullMark: 100 },
  { subject: 'DevTools',   value: 74, fullMark: 100 },
]

export const TIMELINE: TimelineItem[] = [
  {
    id:          'btech-start',
    type:        'education',
    title:       'Started B.Tech in Computer Science',
    subtitle:    'Desh Bhagat University',
    date:        '2023',
    description: 'Enrolled in B.Tech CSE programme. Key coursework: DSA, OOP, Mathematics.',
    tags:        ['CS', 'Engineering'],
  },
  {
    id:          'sorting-project',
    type:        'project',
    title:       'Built Algorithm Analyzer',
    subtitle:    'DAA Capstone Project',
    date:        '2024',
    description: 'CLI benchmarking tool in C — 5 sorting algorithms with real microsecond timing.',
    tags:        ['C', 'Algorithms', 'DAA'],
  },
  {
    id:          'visionai-project',
    type:        'project',
    title:       'Shipped VisionAI',
    subtitle:    'Cloud Computing Project',
    date:        '2024',
    description: 'Full serverless AI image-analysis pipeline on AWS — S3, Lambda, Rekognition, DynamoDB.',
    tags:        ['AWS', 'React', 'Node.js', 'Serverless'],
  },
]

export const CERTIFICATIONS: Array<{
  id: string; title: string; issuer: string; date: string; url?: string
}> = []

export const GITHUB_USERNAME = 'nayan-codes15'
