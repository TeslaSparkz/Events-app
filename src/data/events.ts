import { createSignal } from "solid-js";

export type EventItem = { id: number; title: string; date: string; time: string; details: string };

const pad = (n: number) => String(n).padStart(2, "0");
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const formatDay = (iso: string) =>
  new Date(`${iso}T00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });

// Shared in-memory store (resets on reload). Swap for your API later.
export const [events, setEvents] = createSignal<EventItem[]>([
  { id: 1, title: "Intro to Solid.js workshop", date: inDays(2), time: "6:00 PM", details: "Bring your laptop. Room 204." },
  { id: 2, title: "Study Jam: Cloud basics", date: inDays(5), time: "4:30 PM", details: "Hands-on labs, snacks provided." },
  { id: 3, title: "Hack Night", date: inDays(9), time: "7:00 PM", details: "Build something in 3 hours." },
  { id: 4, title: "Speaker session: Careers in tech", date: inDays(16), time: "11:00 AM", details: "Open to all branches." },
]);
