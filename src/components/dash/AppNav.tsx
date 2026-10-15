import { A } from "@solidjs/router";
import { Show } from "solid-js";
import logo from "../../assets/logo.png";
import { currentUser, isAuthed, logout } from "../../../auth/auth";

export default function AppNav() {
  return (
    <header class="ds-nav">
      <A class="ds-brand" href={isAuthed() ? "/dashboard" : "/"}>
        <img src={logo} alt="" height="26" />
        <span>GDG On Campus IIIT Kalyani</span>
      </A>

      <nav class="ds-nav__links" aria-label="Primary">
        <Show
          when={isAuthed()}
          fallback={
            <>
              <A href="/" end activeClass="is-active">Home</A>
              <A href="/login" class="ds-nav__cta">Login</A>
            </>
          }
        >
          <A href="/dashboard" activeClass="is-active">Dashboard</A>
          <A href="/events" activeClass="is-active">Events</A>
          {/* Logging out on a protected page redirects to /login automatically */}
          <button type="button" class="ds-nav__btn" onClick={logout}>
            Logout ({currentUser()})
          </button>
        </Show>
      </nav>
    </header>
  );
}
