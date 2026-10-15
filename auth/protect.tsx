import { Navigate } from "@solidjs/router";
import { Show } from "solid-js";
import type { Component } from "solid-js";
import { isAuthed } from "./auth";


export function protect(Page: Component): Component {
  return () => (
    <Show when={isAuthed()} fallback={<Navigate href="/login" />}>
      <Page />
    </Show>
  );
}
