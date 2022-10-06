<script>
  import Footer from "../lib/Footer.svelte";
  import "../app.css";
  import NavBar from "../lib/NavBar.svelte";
</script>

<div class="my-10 mx-auto max-w-xl font-body">
  <NavBar />
  <slot />
  <Footer />
</div>
