import { A } from "@solidjs/router";
import { For } from "solid-js";
import Card from "../components/dash/Card";
import DashLayout from "../components/dash/DashLayout";
import StatRing from "../components/dash/StatRing";
import { currentUser } from "../../auth/auth";
import { events, formatDay, toISO } from "../data/events";

const attendance = [
  { m: "May", v: 38 }, { m: "Jun", v: 52 }, { m: "Jul", v: 44 },
  { m: "Aug", v: 61 }, { m: "Sep", v: 78 }, { m: "Oct", v: 70 },
];

export default function DashboardPage() {
  const upcoming = () =>
    events().filter((e) => e.date >= toISO(new Date())).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);

  return (
    <DashLayout>
      <section class="ds-hero">
        <div>
          <h1>Welcome, {currentUser()}!</h1>
          <p class="ds-tagline">Building Better Together.</p>
        </div>
        <A href="/events" class="ds-btn">Open calendar</A>
      </section>

      <Card class="ds-stats">
        <StatRing percent={41} value="12/29" label="Events attended" />
        <StatRing percent={60} value="60%" label="Active members" />
        <StatRing percent={67} value="4/6" label="Workshops done" />
      </Card>

      <div class="ds-grid-2">
        <Card title="Upcoming events">
          <ul class="ds-list">
            <For each={upcoming()} fallback={<li class="ds-empty">No upcoming events.</li>}>
              {(e) => (
                <li class="ds-item">
                  <span class="ds-item__when">{formatDay(e.date)} @ {e.time}</span>
                  <strong>{e.title}</strong>
                </li>
              )}
            </For>
          </ul>
          <A href="/events" class="ds-btn ds-btn--ghost">See calendar</A>
        </Card>

        <Card title="Attendance by month">
          <div class="ds-bars" role="img" aria-label="Attendance by month">
            <For each={attendance}>
              {(b, i) => (
                <div class="ds-bar" classList={{ "is-hot": i() === attendance.length - 2 }}>
                  <span style={{ height: `${b.v}%` }} />
                  <em class="ds-label">{b.m}</em>
                </div>
              )}
            </For>
          </div>
        </Card>
      </div>
    </DashLayout>
  );
}
