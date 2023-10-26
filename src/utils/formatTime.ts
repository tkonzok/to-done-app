const formatter = new Intl.RelativeTimeFormat("de-de", {
  numeric: "always",
});

const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export function formatDateDue(date: Date, interval: number) {
  const dueDate = new Date();
  dueDate.setDate(date.getDate() + interval);
  let duration = (dueDate.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
}

export function formatDaysLeft(date: Date, interval: number) {
  const dueDate = new Date();
  dueDate.setDate(date.getDate() + interval);
  return (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
}
