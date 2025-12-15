export function snapshotPayload(overrides = {}) {
  return {
    browserTabs: 12,
    unusedBookmarks: 3,
    screenshots: 15,
    unusedApps: 4,
    desktopFiles: 20,
    downloadsFiles: 10,
    unreadEmails: 150,
    spamEmails: 37,
    ...overrides,
  };
}
