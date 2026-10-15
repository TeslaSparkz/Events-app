import { createSignal } from "solid-js";


const DEMO_USER = { username: "admin", password: "123" };
const KEY = "gdg-user";

const read = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const [user, setUser] = createSignal<string | null>(read());

export const currentUser = user;
export const isAuthed = () => user() !== null;

export async function login(username: string, password: string) {
  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    throw new Error("Incorrect username or password.");
  }
  try {
    localStorage.setItem(KEY, username);
  } catch {}
  setUser(username);
}

export function logout() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  setUser(null);
}
