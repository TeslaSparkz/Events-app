import { Navigate } from "@solidjs/router";
import { Show } from "solid-js";
import Hero from "../components/Hero";
import LoginCard from "../components/LoginCard";
import type { Credentials } from "../components/LoginCard";
import Navbar from "../components/Navbar";
import { isAuthed, login } from "../../auth/auth";
import "../styles/login.css";

export default function LoginPage() {
  const handleLogin = ({ username, password }: Credentials) => login(username, password);

  return (
    <Show when={!isAuthed()} fallback={<Navigate href="/dashboard" />}>
      <div class="page">
        <Navbar />
        <main class="page__main">
          <Hero />
          <LoginCard onSubmit={handleLogin} />
        </main>
      </div>
    </Show>
  );
}
