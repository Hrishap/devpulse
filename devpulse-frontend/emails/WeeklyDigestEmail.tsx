import type { RepoStat } from "@/types/dashboard";
import { formatDuration } from "@/lib/formatters";

export function WeeklyDigestEmail({
  week,
  flowScore,
  delta,
  totalFlowMs,
  bestDay,
  worstSwitches,
  topRepos,
  insight,
  dashboardUrl
}: {
  week: string;
  flowScore: number;
  delta: number;
  totalFlowMs: number;
  bestDay: string;
  worstSwitches: number;
  topRepos: RepoStat[];
  insight: string;
  dashboardUrl: string;
}) {
  return `<!doctype html>
<html>
<head>
  <meta name="color-scheme" content="dark light" />
  <style>
    @media (prefers-color-scheme: light) { body { background: #1A1730 !important; } }
  </style>
</head>
<body style="margin:0;background:#0F0D1A;color:#F0EEFF;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#1A1730;">
      <tr><td style="padding:24px;font-weight:bold;">DevPulse <span style="float:right;color:#9D94CC;font-weight:normal;">${week}</span></td></tr>
      <tr><td style="padding:32px 24px;border-top:1px solid #241F3A;border-bottom:1px solid #241F3A;">
        <div style="color:#9D94CC;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Flow Score</div>
        <div style="font-family:monospace;font-size:48px;font-weight:bold;">${flowScore} / 100 <span style="font-size:18px;color:#16A34A;">${delta >= 0 ? "+" : ""}${delta}</span></div>
      </td></tr>
      <tr><td style="padding:20px 24px;">
        <table width="100%" role="presentation"><tr>
          <td><strong>${formatDuration(totalFlowMs)}</strong><br/><span style="color:#9D94CC;font-size:12px;">Total flow</span></td>
          <td><strong>${bestDay}</strong><br/><span style="color:#9D94CC;font-size:12px;">Best day</span></td>
          <td><strong>${worstSwitches}</strong><br/><span style="color:#9D94CC;font-size:12px;">Worst switches</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:0 24px 20px;"><h3 style="font-size:13px;color:#9D94CC;">TOP PROJECTS</h3>${topRepos.map((repo, i) => `<p style="font-family:monospace;">${i + 1}. ${repo.repo} - ${formatDuration(repo.timeMs)}</p>`).join("")}</td></tr>
      <tr><td style="padding:0 24px 24px;"><h3 style="font-size:13px;color:#9D94CC;">THIS WEEK'S INSIGHT</h3><p>${insight}</p></td></tr>
      <tr><td align="center" style="padding:0 24px 32px;"><table role="presentation"><tr><td style="background:#582CDB;border-radius:6px;padding:12px 32px;"><a href="${dashboardUrl}" style="color:white;text-decoration:none;">View full dashboard</a></td></tr></table></td></tr>
    </table>
  </td></tr></table>
</body>
</html>`;
}
