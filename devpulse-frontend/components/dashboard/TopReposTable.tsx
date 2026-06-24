import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDuration } from "@/lib/formatters";
import type { RepoStat } from "@/types/dashboard";

export function TopReposTable({ repos }: { repos: RepoStat[] }) {
  return (
    <Card className="col-span-12 md:col-span-6">
      <h2 className="mb-4 text-lg font-semibold">Top Repos</h2>
      {repos.length === 0 ? (
        <p className="text-sm text-text-2">No repository activity yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-brand-pale/20 bg-surface/30 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-surface-2/60 text-xs uppercase text-text-2 tracking-wider">
              <tr>
                <th className="w-12 px-3 py-3 text-left">Rank</th>
                <th className="px-3 py-3 text-left">Repo Name</th>
                <th className="px-3 py-3 text-left">Time</th>
                <th className="px-3 py-3 text-left">Language</th>
                <th className="px-3 py-3 text-left">Flow</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.repo} className="h-12 border-t border-brand-pale/10 transition-colors hover:bg-brand/5">
                  <td className="px-3 font-mono text-brand-light font-medium">{repo.rank}</td>
                  <td className="px-3 font-mono text-text-1">{repo.repo}</td>
                  <td className="px-3 font-mono text-text-1">{formatDuration(repo.timeMs)}</td>
                  <td className="px-3"><Badge>{repo.language}</Badge></td>
                  <td className="px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 rounded-full bg-surface-2/80 overflow-hidden shadow-inner">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand to-active shadow-glow" style={{ width: `${repo.flowPercent}%` }} />
                      </div>
                      <span className="font-mono text-xs text-text-2 font-medium">{repo.flowPercent}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
