import { Route, Router } from "@solidjs/router";
import { protect } from "../auth/protect";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import PublicHome from "./pages/PublicHome";

export default function App() {
  return (
    <Router>
      <Route path="/" component={PublicHome} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={protect(DashboardPage)} />
      <Route path="/events" component={protect(EventsPage)} />
    </Router>
  );
}
