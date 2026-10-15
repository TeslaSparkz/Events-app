import { createMemo, createSignal, Index, Show } from "solid-js";
import { toISO } from "../../data/events";

type CalendarProps = {
  selected: string;
  onSelect: (iso: string) => void;
  marked: (iso: string) => boolean;
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function Calendar(props: CalendarProps) {
  const now = new Date();
  const todayISO = toISO(now);
  const [cursor, setCursor] = createSignal(new Date(now.getFullYear(), now.getMonth(), 1));
  const shift = (n: number) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + n, 1));

  const cells = createMemo(() => {
    const y = cursor().getFullYear();
    const m = cursor().getMonth();
    const lead = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
    const total = new Date(y, m + 1, 0).getDate();
    return [...Array<number | null>(lead).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  });
  const iso = (d: number) => toISO(new Date(cursor().getFullYear(), cursor().getMonth(), d));

  return (
    <div class="ds-cal">
      <div class="ds-cal__head">
        <button type="button" class="ds-icon-btn" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
        <strong>{cursor().toLocaleDateString(undefined, { month: "long", year: "numeric" })}</strong>
        <button type="button" class="ds-icon-btn" onClick={() => shift(1)} aria-label="Next month">›</button>
      </div>
      <div class="ds-cal__grid">
        {DAYS.map((d) => <span class="ds-label ds-cal__dow">{d}</span>)}
        <Index each={cells()}>
          {(day) => (
            <Show when={day()} fallback={<span />}>
              <button
                type="button"
                class="ds-cal__day"
                classList={{
                  "is-today": iso(day()!) === todayISO,
                  "is-selected": iso(day()!) === props.selected,
                  "has-event": props.marked(iso(day()!)),
                }}
                onClick={() => props.onSelect(iso(day()!))}
              >
                {day()}
              </button>
            </Show>
          )}
        </Index>
      </div>
    </div>
  );
}
