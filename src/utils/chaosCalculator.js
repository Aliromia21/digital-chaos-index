export function calculateChaosScore(data) {
  let score = 0;

  score += data.browserTabs * 2;
  score += data.unusedBookmarks * 1;
  score += data.screenshots * 1;
  score += data.unusedApps * 2;
  score += data.desktopFiles * 2;
  score += data.downloadsFiles * 1;
  score += data.unreadEmails * 1;
  score += data.spamEmails * 1;

  // Limit score 0–100
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return score;
}
