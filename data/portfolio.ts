/**
 * data/portfolio.ts  —  Single source of truth for all portfolio content.
 */
import type {
  PortfolioMeta,
  SkillGroup,
  TimelineItem,
  Education,
} from "@/types";

// ── Personal Meta ─────────────────────────────────────────────
export const META: PortfolioMeta = {
  name: "Nayan Kumar",
  displayName: "Nayan Kumar",
  role: "Full Stack Developer · B.Tech CSE Student",
  roles: [
    "Full Stack Developer",
    "React Developer",
    "Frontend Developer",
    "Software Developer",
    "AI Enthusiast",
    "B.Tech Student",
  ],
  tagline:
    "Crafting premium web experiences with AI and cloud-first engineering.",
  bio: `I am a B.Tech Computer Science student building modern web applications, AI-powered tools, and cloud-native systems with a focus on performance, accessibility, and recruiter-ready polish. I enjoy shipping projects that solve real problems and helping teams move faster with intelligent interfaces and reliable backend architecture.`,
  email: "hello@nayan-kumar.dev",
  location: "Samastipur, Bihar, India",
  resumeUrl: "/resume/nayan-kumar-resume.pdf",
  availableFrom: "Immediately",
  socials: {
    github: "https://github.com/nayankumar",
    linkedin: "https://www.linkedin.com/in/nayan-kumar",
    twitter: "https://twitter.com/nayankumar",
    instagram: "https://instagram.com/nayankumar",
  },
};

// ── Education ─────────────────────────────────────────────────
export const EDUCATION: Education = {
  institution: "Desh Bhagat University",
  degree: "Bachelor of Technology",
  field: "Computer Science and Engineering",
  year: "2023 – 2027",
  location: "Punjab, India",
  highlights: [
    "Data Structures & Algorithms (DAA)",
    "Cloud Computing",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "Object Oriented Programming",
  ],
};

// ── Skills ────────────────────────────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "cloud",
    label: "Cloud & Backend",
    icon: "☁",
    skills: [
      { name: "AWS Lambda", level: 80 },
      { name: "AWS S3", level: 80 },
      { name: "AWS Rekognition", level: 75 },
      { name: "DynamoDB", level: 72 },
      { name: "Node.js", level: 78 },
      { name: "Serverless Framework", level: 70 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "⚛",
    skills: [
      { name: "React / JSX", level: 80 },
      { name: "JavaScript ES2022+", level: 82 },
      { name: "TypeScript", level: 72 },
      { name: "HTML / CSS", level: 85 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    id: "systems",
    label: "Systems & Algorithms",
    icon: "⚙",
    skills: [
      { name: "C / C++", level: 78 },
      { name: "Data Structures & Algorithms", level: 82 },
      { name: "Algorithm Design (DAA)", level: 80 },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    icon: "🛠",
    skills: [
      { name: "Git & GitHub", level: 82 },
      { name: "Docker", level: 60 },
      { name: "Linux CLI", level: 70 },
    ],
  },
];

export const RADAR_DATA = [
  { subject: "Cloud", value: 78, fullMark: 100 },
  { subject: "Frontend", value: 80, fullMark: 100 },
  { subject: "Backend", value: 76, fullMark: 100 },
  { subject: "Algorithms", value: 82, fullMark: 100 },
  { subject: "AI / ML", value: 62, fullMark: 100 },
  { subject: "DevTools", value: 74, fullMark: 100 },
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "btech-start",
    type: "education",
    title: "Started B.Tech in Computer Science",
    subtitle: "Desh Bhagat University",
    date: "2023",
    description:
      "Enrolled in B.Tech CSE programme. Key coursework: DSA, OOP, Mathematics.",
    tags: ["CS", "Engineering"],
  },
  {
    id: "sorting-project",
    type: "project",
    title: "Built Algorithm Analyzer",
    subtitle: "DAA Capstone Project",
    date: "2024",
    description:
      "CLI benchmarking tool in C — 5 sorting algorithms with real microsecond timing.",
    tags: ["C", "Algorithms", "DAA"],
  },
  {
    id: "visionai-project",
    type: "project",
    title: "Shipped VisionAI",
    subtitle: "Cloud Computing Project",
    date: "2024",
    description:
      "Full serverless AI image-analysis pipeline on AWS — S3, Lambda, Rekognition, DynamoDB.",
    tags: ["AWS", "React", "Node.js", "Serverless"],
  },
];

export const CERTIFICATIONS: Array<{
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}> = [];

export const GITHUB_USERNAME = "nayan-codes15";
