<script>
  // @ts-nocheck

  import { MagnifyingGlass } from "phosphor-svelte";

  export let value;
</script>

<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <MagnifyingGlass weight="duotone" />
  </span>
  <input
    class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
    placeholder="Buscar por oración"
    type="text"
    name="search"
    bind:value
  />
</label>
