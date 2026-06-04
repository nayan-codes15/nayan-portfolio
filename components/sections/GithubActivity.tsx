import { getGithubStats } from '@/lib/github'
import GithubActivityClient from '../github/GithubActivityClient'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default async function GithubActivity() {
  const stats = await getGithubStats()

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-1)]" />
      </div>
    }>
      <GithubActivityClient stats={stats} />
    </Suspense>
  )
}
