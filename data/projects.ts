import { IconType } from 'react-icons'
import { SiC, SiCplusplus, SiPython } from 'react-icons/si'
import { FaMicrochip, FaRobot, FaChartBar, FaBrain } from 'react-icons/fa'

export interface Project {
  id: string
  title: string
  category: string
  difficulty: string
  status: string
  technologies: { name: string; Icon: IconType }[]
  overview: string
  problemStatement: string
  keyFeatures: string[]
  learningOutcomes: string[]
  futureImprovements: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'cuda-core-dev',
    title: 'CUDA Core Development Using Different GeForce Models',
    category: 'GPU Architecture / Systems',
    difficulty: 'Intermediate',
    status: 'Research',
    technologies: [
      { name: 'C', Icon: SiC },
      { name: 'C++', Icon: SiCplusplus },
      { name: 'GPU Architecture', Icon: FaMicrochip },
      { name: 'CUDA Concepts', Icon: FaMicrochip }
    ],
    overview: 'Explored GPU architecture concepts through CUDA programming, studying how different GeForce GPU models handle parallel computation and core allocation.',
    problemStatement: 'Understanding how CUDA cores differ across GPU generations and how parallel processing can be leveraged for compute-intensive tasks.',
    keyFeatures: [
      'GPU architecture comparison study',
      'CUDA programming exploration',
      'Parallel computing concepts',
      'Performance analysis concepts'
    ],
    learningOutcomes: [
      'Understood GPU vs CPU architecture',
      'Learned basics of parallel programming',
      'Gained insight into hardware-software interaction at low level'
    ],
    futureImprovements: [
      'Implement actual CUDA benchmarks',
      'Compare real performance metrics',
      'Explore GPU memory management'
    ]
  },
  {
    id: 'ai-smart-grid',
    title: 'AI in Smart Grid Development',
    category: 'AI / Energy Systems',
    difficulty: 'Intermediate',
    status: 'Research',
    technologies: [
      { name: 'Python', Icon: SiPython },
      { name: 'Predictive Modeling', Icon: FaChartBar },
      { name: 'Smart Meter Concepts', Icon: FaRobot },
      { name: 'Data Analysis', Icon: FaBrain }
    ],
    overview: 'Researched and conceptualized how Artificial Intelligence can optimize smart grid energy distribution using predictive modeling and real-time data from smart meters.',
    problemStatement: 'Traditional power grids lack intelligence to handle dynamic energy demands. AI can enable predictive load balancing and anomaly detection.',
    keyFeatures: [
      'AI-powered load prediction concepts',
      'Smart meter data analysis approach',
      'Energy optimization strategies',
      'Anomaly detection framework design'
    ],
    learningOutcomes: [
      'Understood AI applications in real-world infrastructure',
      'Learned predictive modeling concepts',
      'Explored Python for data analysis'
    ],
    futureImprovements: [
      'Build a working prototype',
      'Implement real ML models',
      'Add real-time dashboard'
    ]
  }
]
