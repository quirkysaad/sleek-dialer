import { CallLogProps, CallSectionProps } from "../types";

// Utility: format section title
const formatSectionTitle = (ts: number): string => {
  const today = new Date();
  const d = new Date(ts);

  const isToday = d.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday = d.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

// Transform call logs → sectioned format
export const groupCallsByDate = (calls: Array<CallLogProps>): Array<CallSectionProps> => {
  const grouped: Record<string, CallLogProps[]> = {};

  calls.forEach((call) => {
    const dayKey = new Date(call.date).toDateString();
    if (!grouped[dayKey]) grouped[dayKey] = [];
    grouped[dayKey].push(call);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // latest first
    .map((dayKey) => {
      const ts = grouped[dayKey][0].date; // pick first call’s ts
      return {
        title: formatSectionTitle(ts),
        data: grouped[dayKey].sort((a, b) => b.date - a.date) // latest call first
      };
    });
};