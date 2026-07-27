export function formatEventDateRange(
  startIso: string | undefined,
  endIso: string | undefined,
  timezone: string | undefined,
  fallback = "3–4 October 2026"
) {
  if (!startIso || !endIso) return fallback
  const start = new Date(startIso)
  const end = new Date(endIso)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return fallback
  }
  const options = { timeZone: timezone || "Europe/Paris" }
  const startDay = new Intl.DateTimeFormat("en-GB", {
    ...options,
    day: "numeric",
  }).format(start)
  const endDate = new Intl.DateTimeFormat("en-GB", {
    ...options,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(end)
  return `${startDay}–${endDate}`
}
