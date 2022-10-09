<script>
  import Footer from "../lib/Footer.svelte";
  import "../app.css";
  import NavBar from "../lib/NavBar.svelte";
</script>

<div
  class="mx-auto max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-5xl font-body"
>
  <NavBar />
  <slot />
  <Footer />
</div>
