import { calculateChaosScore } from "../utils/chaosCalculator.js";

describe("chaosCalculator clamps between 0 and 100", () => {
  it("caps at 100 for extreme values", () => {
    const score = calculateChaosScore({
      browserTabs: 1000, unusedBookmarks: 1000, screenshots: 1000,
      unusedApps: 1000, desktopFiles: 1000, downloadsFiles: 1000,
      unreadEmails: 100000, spamEmails: 100000
    });
    expect(score).toBe(100);
  });

  it("floors at 0 for minimal values", () => {
    const score = calculateChaosScore({
      browserTabs: 0, unusedBookmarks: 0, screenshots: 0,
      unusedApps: 0, desktopFiles: 0, downloadsFiles: 0,
      unreadEmails: 0, spamEmails: 0
    });
    expect(score).toBe(0);
  });
});
