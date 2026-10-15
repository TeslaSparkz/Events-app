import type { ParentProps } from "solid-js";
import AppNav from "./AppNav";
import "../../styles/dashboard.css";

export default function DashLayout(props: ParentProps) {
  return (
    <div class="ds">
      <AppNav />
      <main class="ds-main">{props.children}</main>
    </div>
  );
}
