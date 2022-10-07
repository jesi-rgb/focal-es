<script>
  import Footer from "../lib/Footer.svelte";
  import "../app.css";
  import NavBar from "../lib/NavBar.svelte";
</script>

<div class="mx-auto max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-2xl font-body">
  <NavBar />
  <slot />
  <Footer />
</div>

<style>
  *::-webkit-scrollbar {
    display: none;
  }

  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
