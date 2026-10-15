export default function Hero() {
  return (
    <section class="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" class="hero__title">Welcome!</h1>
      <p class="hero__tagline">Building Better Together.</p>
      <div class="hero__dots" aria-hidden="true">
        <span style={{ background: "var(--g-blue)" }} />
        <span style={{ background: "var(--g-red)" }} />
        <span style={{ background: "var(--g-yellow)" }} />
        <span style={{ background: "var(--g-green)" }} />
      </div>
    </section>
  );
}
