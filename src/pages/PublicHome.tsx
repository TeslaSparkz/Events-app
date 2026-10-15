import { A } from "@solidjs/router";
import { For } from "solid-js";
import Card from "../components/dash/Card";
import DashLayout from "../components/dash/DashLayout";
import { events, formatDay, toISO } from "../data/events";

export default function PublicHome() {
  const upcoming = () =>
    events()
      .filter((e) => e.date >= toISO(new Date()))
      .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <DashLayout>
      <section class="ds-hero">
        <div>
          <h1>GDG On Campus IIIT Kalyani</h1>
          <p class="ds-tagline">Building Better Together.</p>
        </div>
        <A href="/login" class="ds-btn">Login</A>
      </section>

      <Card title="Upcoming events">
        <ul class="ds-list">
          <For each={upcoming()} fallback={<li class="ds-empty">No upcoming events.</li>}>
            {(e) => (
              <li>
                <A href="/login" class="ds-item">
                  <span class="ds-item__when">{formatDay(e.date)} @ {e.time}</span>
                  <strong>{e.title}</strong>
                  <small>{e.details}</small>
                </A>
              </li>
            )}
          </For>
        </ul>
        <A href="/login" class="ds-btn ds-btn--ghost">Login to see the full calendar</A>
      </Card>
    </DashLayout>
  );
}
