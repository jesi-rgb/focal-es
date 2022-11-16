<script>
  // @ts-nocheck

  import { MagnifyingGlass } from "phosphor-svelte";

  export let value;
</script>

<label class="relative block my-3">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-main">
    <MagnifyingGlass weight="duotone" />
  </span>
  <input
    class="placeholder:italic placeholder:text-main placeholder:text-opacity-50 block bg-white w-full border border-main-lighter rounded-md py-2 pl-9 pr-3 shadow-sm shadow-main-lighter focus:outline-none focus:border-main focus:ring-main focus:ring-1 sm:text-sm"
    placeholder="Buscar por palabra(s)"
    type="text"
    name="search"
    bind:value
  />
</label>
