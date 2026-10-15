import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <header class="nav">
      <a class="nav__brand" href="/" aria-label="GDG On Campus home">
        <img class="nav__logo" src={logo} alt="" width="44" height="29" />
        <span class="nav__title">GDG On Campus IIIT Kalyani</span>
      </a>

      <nav class="nav__links" aria-label="Primary">
        <a class="nav__link" href="/">Home</a>
      </nav>
    </header>
  );
}
