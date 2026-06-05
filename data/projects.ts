import { IconType } from "react-icons";
import { SiC, SiCplusplus, SiPython } from "react-icons/si";
import { FaMicrochip, FaRobot, FaChartBar, FaBrain } from "react-icons/fa";

export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  status: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: { name: string; Icon: IconType }[];
  overview: string;
  problemStatement: string;
  keyFeatures: string[];
  learningOutcomes: string[];
  futureImprovements: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "cuda-core-dev",
    title: "CUDA Core Development Using Different GeForce Models",
    category: "Systems",
    difficulty: "Intermediate",
    status: "Research",
    imageUrl: "/images/projects/project-cuda-core.svg",
    githubUrl: "https://github.com/nayankumar/cuda-core-dev",
    technologies: [
      { name: "C", Icon: SiC },
      { name: "C++", Icon: SiCplusplus },
      { name: "GPU Architecture", Icon: FaMicrochip },
      { name: "CUDA Concepts", Icon: FaMicrochip },
    ],
    overview:
      "Explored GPU architecture concepts through CUDA programming, studying how different GeForce GPU models handle parallel computation and core allocation.",
    problemStatement:
      "Understanding how CUDA cores differ across GPU generations and how parallel processing can be leveraged for compute-intensive tasks.",
    keyFeatures: [
      "GPU architecture comparison study",
      "CUDA programming exploration",
      "Parallel computing concepts",
      "Performance analysis concepts",
    ],
    learningOutcomes: [
      "Understood GPU vs CPU architecture",
      "Learned basics of parallel programming",
      "Gained insight into hardware-software interaction at low level",
    ],
    futureImprovements: [
      "Implement actual CUDA benchmarks",
      "Compare real performance metrics",
      "Explore GPU memory management",
    ],
  },
  {
    id: "ai-smart-grid",
    title: "AI in Smart Grid Development",
    category: "AI",
    difficulty: "Intermediate",
    status: "Research",
    imageUrl: "/images/projects/project-ai-grid.svg",
    githubUrl: "https://github.com/nayankumar/ai-smart-grid",
    technologies: [
      { name: "Python", Icon: SiPython },
      { name: "Predictive Modeling", Icon: FaChartBar },
      { name: "Smart Meter Concepts", Icon: FaRobot },
      { name: "Data Analysis", Icon: FaBrain },
    ],
    overview:
      "Researched and conceptualized how Artificial Intelligence can optimize smart grid energy distribution using predictive modeling and real-time data from smart meters.",
    problemStatement:
      "Traditional power grids lack intelligence to handle dynamic energy demands. AI can enable predictive load balancing and anomaly detection.",
    keyFeatures: [
      "AI-powered load prediction concepts",
      "Smart meter data analysis approach",
      "Energy optimization strategies",
      "Anomaly detection framework design",
    ],
    learningOutcomes: [
      "Understood AI applications in real-world infrastructure",
      "Learned predictive modeling concepts",
      "Explored Python for data analysis",
    ],
    futureImprovements: [
      "Build a working prototype",
      "Implement real ML models",
      "Add real-time dashboard",
    ],
  },
  {
    id: "portfolio-hub",
    title: "Portfolio Hub UI with React + Tailwind",
    category: "Web",
    difficulty: "Intermediate",
    status: "Live",
    imageUrl: "/images/projects/project-portfolio-hub.svg",
    liveUrl: "https://github.com/nayankumar/portfolio-hub",
    githubUrl: "https://github.com/nayankumar/portfolio-hub",
    technologies: [
      { name: "React", Icon: FaBrain },
      { name: "Tailwind CSS", Icon: FaRobot },
      { name: "Responsive Design", Icon: FaMicrochip },
      { name: "Performance Optimization", Icon: FaChartBar },
    ],
    overview:
      "Built a responsive portfolio UI with React and Tailwind CSS, including animation, responsive grid layout, and modern component structure.",
    problemStatement:
      "Create a performant, accessible portfolio experience that looks premium across desktop and mobile while staying easy to maintain.",
    keyFeatures: [
      "Responsive project gallery layout",
      "Interactive category filtering",
      "Live demo and GitHub action links",
      "Modern visual hierarchy and micro-interactions",
    ],
    learningOutcomes: [
      "Improved component design for scalability",
      "Learned advanced Tailwind patterns",
      "Deepened knowledge of responsive UX",
    ],
    futureImprovements: [
      "Add project modal detail views",
      "Implement image previews with lightbox",
      "Include case studies for each project",
    ],
  },
  {
    id: "react-dashboard",
    title: "Interactive React Dashboard",
    category: "React",
    difficulty: "Intermediate",
    status: "Live",
    imageUrl: "/images/projects/project-react-dashboard.svg",
    liveUrl: "https://github.com/nayankumar/react-dashboard",
    githubUrl: "https://github.com/nayankumar/react-dashboard",
    technologies: [
      { name: "React", Icon: FaBrain },
      { name: "Charts", Icon: FaChartBar },
      { name: "UI Animation", Icon: FaRobot },
      { name: "Performance", Icon: FaMicrochip },
    ],
    overview:
      "Created an interactive dashboard with data visualization, real-time updates, and mobile-first React interface.",
    problemStatement:
      "Build a usable analytics experience that surfaces key metrics without overwhelming the user with complex data.",
    keyFeatures: [
      "Live chart visualizations",
      "Responsive card layout",
      "Filter and sort controls",
      "Accessible navigation and focus states",
    ],
    learningOutcomes: [
      "Refined React composition patterns",
      "Improved data-driven interface design",
      "Applied performance optimizations for render-heavy UI",
    ],
    futureImprovements: [
      "Add export and reporting tools",
      "Implement real backend integrations",
      "Add user authentication and settings",
    ],
  },
];
