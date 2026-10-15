import { createMemo, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Calendar from "../components/dash/Calendar";
import Card from "../components/dash/Card";
import DashLayout from "../components/dash/DashLayout";
import { events, formatDay, setEvents, toISO } from "../data/events";

export default function EventsPage() {
  const [selected, setSelected] = createSignal(toISO(new Date()));
  const [form, setForm] = createStore({ title: "", date: "", time: "", details: "" });
  const [error, setError] = createSignal("");

  const marked = createMemo(() => new Set(events().map((e) => e.date)));
  const dayEvents = () => events().filter((e) => e.date === selected()).sort((a, b) => a.time.localeCompare(b.time));

  const submit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return setError("Event name and date are required.");
    setError("");
    setEvents((list) => [...list, { id: Date.now(), title: form.title.trim(), date: form.date, time: form.time || "All day", details: form.details.trim() }]);
    setSelected(form.date);
    setForm({ title: "", date: "", time: "", details: "" });
  };

  return (
    <DashLayout>
      <h1 class="ds-h1">Events</h1>
      <div class="ds-events">
        <Card title={`Schedule · ${formatDay(selected())}`}>
          <ul class="ds-list">
            <For each={dayEvents()} fallback={<li class="ds-empty">Nothing scheduled for this day.</li>}>
              {(ev) => (
                <li class="ds-item">
                  <span class="ds-item__when">{ev.time}</span>
                  <strong>{ev.title}</strong>
                  <Show when={ev.details}><small>{ev.details}</small></Show>
                </li>
              )}
            </For>
          </ul>
        </Card>

        <Card>
          <Calendar selected={selected()} onSelect={setSelected} marked={(d) => marked().has(d)} />
        </Card>

        <Card title="Create event">
          <form class="ds-form" onSubmit={submit} novalidate>
            <label>
              <span class="ds-label">Event name</span>
              <input value={form.title} onInput={(e) => setForm("title", e.currentTarget.value)} placeholder="e.g. Android study jam" />
            </label>
            <div class="ds-row">
              <label>
                <span class="ds-label">Date</span>
                <input type="date" value={form.date} onInput={(e) => setForm("date", e.currentTarget.value)} />
              </label>
              <label>
                <span class="ds-label">Time</span>
                <input type="time" onInput={(e) => setForm("time", e.currentTarget.value)} value={form.time} />
              </label>
            </div>
            <label>
              <span class="ds-label">Details</span>
              <textarea rows="3" value={form.details} onInput={(e) => setForm("details", e.currentTarget.value)} placeholder="Add some details…" />
            </label>
            <Show when={error()}><p class="ds-error" role="alert">{error()}</p></Show>
            <button type="submit" class="ds-btn">Create event</button>
          </form>
        </Card>
      </div>
    </DashLayout>
  );
}
