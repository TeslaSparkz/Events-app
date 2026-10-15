import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Button from "./Button";
import TextField from "./TextField";

export type Credentials = { username: string; password: string };

type LoginCardProps = {
  /** Throw (or reject) with an Error to show a message under the form. */
  onSubmit: (credentials: Credentials) => void | Promise<void>;
};

export default function LoginCard(props: LoginCardProps) {
  const [values, setValues] = createStore<Credentials>({ username: "", password: "" });
  const [errors, setErrors] = createStore<Partial<Credentials>>({});
  const [formError, setFormError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const validate = () => {
    const next: Partial<Credentials> = {};
    if (!values.username.trim()) next.username = "Enter your username.";
    if (!values.password) next.password = "Enter your password.";
    setErrors({ username: undefined, password: undefined, ...next });
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await props.onSubmit({ username: values.username.trim(), password: values.password });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section class="card" aria-labelledby="login-title">
      <h2 id="login-title" class="card__title">Login</h2>
      <p class="card__subtitle">Sign in to continue to your account.</p>

      <form class="form" onSubmit={handleSubmit} novalidate>
        <TextField
          label="Username"
          name="username"
          autocomplete="username"
          placeholder="your.username"
          value={values.username}
          onInput={(e) => setValues("username", e.currentTarget.value)}
          error={errors.username}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          revealable
          autocomplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onInput={(e) => setValues("password", e.currentTarget.value)}
          error={errors.password}
        />

        <Show when={formError()}>
          <p class="form__error" role="alert">{formError()}</p>
        </Show>

        <Button type="submit" loading={loading()}>Login</Button>
      </form>
    </section>
  );
}
