const R = 26;
const C = 2 * Math.PI * R;

export default function StatRing(props: { percent: number; value: string; label: string }) {
  return (
    <div class="ds-stat">
      <svg viewBox="0 0 64 64" class="ds-ring" role="img" aria-label={`${props.percent}%`}>
        <circle cx="32" cy="32" r={R} class="ds-ring__bg" />
        <circle
          cx="32" cy="32" r={R}
          class="ds-ring__fg"
          stroke-dasharray={`${(C * props.percent) / 100} ${C}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <strong>{props.value}</strong>
      <span class="ds-label">{props.label}</span>
    </div>
  );
}
