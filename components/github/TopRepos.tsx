"use client";

import { motion } from "framer-motion";
import { GithubRepo } from "@/lib/github";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";

export default function TopRepos({ repos }: { repos: GithubRepo[] }) {
  if (!repos.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel p-6 rounded-2xl border h-full"
      style={{ borderColor: "var(--border)" }}
    >
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-[var(--accent-1)]" />
        Top Repositories
      </h3>

      <div className="flex flex-col gap-4">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block p-4 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderColor: "var(--border)",
              border: "1px solid",
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4
                className="font-semibold group-hover:transition-colors truncate pr-4"
                style={{ color: "var(--accent-1)" }}
              >
                {repo.name}
              </h4>
              <ExternalLink
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              />
            </div>

            <p
              className="text-xs mb-4 line-clamp-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {repo.description || "No description provided."}
            </p>

            <div
              className="flex items-center gap-4 text-xs font-medium"
              style={{ color: "var(--text-secondary)", opacity: 0.7 }}
            >
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-2)]" />
                  {repo.language}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                {repo.forks_count}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
