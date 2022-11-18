<script>
  import Footer from "../lib/Footer.svelte";
  import "../app.css";
  import NavBar from "../lib/NavBar.svelte";
</script>

<div
  class="mx-auto max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl font-body font-normal"
>
  <NavBar />
  <slot />
  <Footer />
</div>
