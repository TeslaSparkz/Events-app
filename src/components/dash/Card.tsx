import type { ParentProps } from "solid-js";
import { Show } from "solid-js";

export default function Card(props: ParentProps<{ title?: string; class?: string }>) {
  return (
    <section class={`ds-card ${props.class ?? ""}`}>
      <Show when={props.title}>
        <h2 class="ds-card__title">{props.title}</h2>
      </Show>
      {props.children}
    </section>
  );
}
