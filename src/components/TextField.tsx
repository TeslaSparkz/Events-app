import { createSignal, createUniqueId, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";
type TextFieldProps = {
  label: string;
  error?: string;
  /** Renders a show/hide toggle when type is "password". */
  revealable?: boolean;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export default function TextField(props: TextFieldProps) {
  const [local, input] = splitProps(props, ["label", "error", "revealable", "type", "class"]);
  const id = createUniqueId();
  const errorId = `${id}-error`;
  const [visible, setVisible] = createSignal(false);

  const inputType = () =>
    local.type === "password" && local.revealable && visible() ? "text" : local.type;

  return (
    <div class="field" classList={{ "field--error": !!local.error }}>
      <label class="field__label" for={id}>
        {local.label}
      </label>

      <div class="field__control">
        <input
          {...input}
          id={id}
          type={inputType()}
          class="field__input"
          aria-invalid={local.error ? "true" : undefined}
          aria-describedby={local.error ? errorId : undefined}
        />

        <Show when={local.type === "password" && local.revealable}>
          <button
            type="button"
            class="field__toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible() ? "Hide password" : "Show password"}
            aria-pressed={visible()}
          >
            {visible() ? "Hide" : "Show"}
          </button>
        </Show>
      </div>

      <Show when={local.error}>
        <p id={errorId} class="field__error" role="alert">
          {local.error}
        </p>
      </Show>
    </div>
  );
}
