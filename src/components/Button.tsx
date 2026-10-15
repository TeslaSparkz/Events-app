import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ButtonProps = {
  loading?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["loading", "children", "class"]);

  return (
    <button
      {...rest}
      class={`btn ${local.class ?? ""}`}
      disabled={rest.disabled || local.loading}
      aria-busy={local.loading}
    >
      <Show when={local.loading} fallback={local.children}>
        <span class="btn__spinner" aria-hidden="true" />
        <span>Signing in…</span>
      </Show>
    </button>
  );
}
