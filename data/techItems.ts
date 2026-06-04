/**
 * data/techItems.ts
 * Single source of truth for tech skills data — consumed by both
 * the 3D TechGlobe (desktop) and the 2D FloatingTagCloud (mobile).
 */

export type TechCategory = 'programming' | 'ai' | 'cloud' | 'database' | 'tools'

export interface TechItem {
  label:     string   // short label displayed on badge
  fullLabel: string   // tooltip / aria label
  category:  TechCategory
}

// ── 18 tech items across 5 categories ──────────────────────────
export const TECH_ITEMS: TechItem[] = [
  // Programming
  { label: 'C',            fullLabel: 'C Language',             category: 'programming' },
  { label: 'C++',          fullLabel: 'C++',                    category: 'programming' },
  { label: 'Java',         fullLabel: 'Java',                   category: 'programming' },
  { label: 'Python',       fullLabel: 'Python',                 category: 'programming' },
  // AI & Data
  { label: 'AI',           fullLabel: 'Artificial Intelligence',category: 'ai'          },
  { label: 'Gen AI',       fullLabel: 'Generative AI',          category: 'ai'          },
  { label: 'Analytics',    fullLabel: 'Data Analytics',         category: 'ai'          },
  { label: 'G. Analytics', fullLabel: 'Google Analytics',       category: 'ai'          },
  // Cloud
  { label: 'AWS',          fullLabel: 'Amazon Web Services',    category: 'cloud'       },
  { label: 'Cloud',        fullLabel: 'Cloud Computing',        category: 'cloud'       },
  // Database
  { label: 'DBMS',         fullLabel: 'Database Management Systems', category: 'database' },
  { label: 'SQL',          fullLabel: 'Structured Query Language',   category: 'database' },
  // Tools & Web
  { label: 'Git',          fullLabel: 'Git',                    category: 'tools'       },
  { label: 'GitHub',       fullLabel: 'GitHub',                 category: 'tools'       },
  { label: 'VS Code',      fullLabel: 'Visual Studio Code',     category: 'tools'       },
  { label: 'Linux',        fullLabel: 'Linux',                  category: 'tools'       },
  { label: 'HTML',         fullLabel: 'HTML5',                  category: 'tools'       },
  { label: 'CSS',          fullLabel: 'CSS3',                   category: 'tools'       },
]

// ── Category colours (hardcoded; CSS vars aren't accessible in R3F JS) ──
export const CATEGORY_COLORS: Record<TechCategory, string> = {
  programming: '#22d3ee',  // cyan
  ai:          '#a78bfa',  // violet
  cloud:       '#fb923c',  // orange
  database:    '#34d399',  // emerald
  tools:       '#60a5fa',  // blue
}

export const CATEGORY_META: Record<TechCategory, { label: string; icon: string }> = {
  programming: { label: 'Programming', icon: '⚡' },
  ai:          { label: 'AI & Data',   icon: '🧠' },
  cloud:       { label: 'Cloud',       icon: '☁️'  },
  database:    { label: 'Database',    icon: '🗄️'  },
  tools:       { label: 'Tools & Web', icon: '🛠️'  },
}
