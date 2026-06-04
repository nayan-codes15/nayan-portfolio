export interface GithubProfile {
  login: string
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

const GITHUB_USERNAME = 'nayan-codes15'
const API_URL = 'https://api.github.com'

// Headers to bypass basic rate limiting if a token is ever added
// For unauthenticated, we get 60 req/hour per IP.
const headers = {
  'Accept': 'application/vnd.github.v3+json',
}

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(`${API_URL}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!res.ok) throw new Error('Failed to fetch profile')
    return await res.json()
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    return null
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`${API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers,
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch repos')
    return await res.json()
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export async function getGithubStats() {
  const profile = await getGithubProfile()
  const repos = await getGithubRepos()

  if (!profile) return null

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  
  // Calculate top languages
  const languageCounts = repos.reduce((acc: Record<string, number>, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1
    }
    return acc
  }, {})

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))

  // Top 4 repos by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4)

  return {
    profile,
    totalStars,
    totalRepos: repos.length,
    topLanguages,
    topRepos
  }
}
