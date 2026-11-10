export function calculateStreak(completedDates) {
  if (!completedDates || !completedDates.length) return 0;
  
  const uniqueDays = Array.from(new Set(
    completedDates.map(d => new Date(d).toISOString().slice(0, 10))
  )).sort().reverse();

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) {
    return 0; // Streak broken
  }

  let streak = 1;
  for (let i = 0; i < uniqueDays.length - 1; i++) {
    const curr = new Date(uniqueDays[i]).getTime();
    const prev = new Date(uniqueDays[i + 1]).getTime();
    const diffDays = Math.round((curr - prev) / 86400000);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
