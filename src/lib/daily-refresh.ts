const DAY_MS = 24 * 60 * 60 * 1000;

/** A stable cache key per UTC day, with the next refresh just after midnight. */
export function getDailyRefresh(now = Date.now()) {
  return {
    day: new Date(now).toISOString().slice(0, 10),
    delay: DAY_MS - (now % DAY_MS) + 1000,
  };
}
