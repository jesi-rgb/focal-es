<script>
  // @ts-nocheck

  import { X } from "phosphor-svelte";

  import { crossfade } from "svelte/transition";
  export let example;
  export let searchTerm;
</script>

<div
  transition:crossfade
  class="bg-main-lighter text-main p-5 rounded-xl flex flex-row w-full select-all selection:bg-main selection:text-white"
>
  <div class="w-4/5">
    {@html example
      .toLowerCase()
      .replace(
        searchTerm.toLowerCase(),
        "<span class='font-bold'>" + searchTerm + "</span>"
      )}
  </div>
  <button
    on:click={() => {
      example = "";
    }}
    class="mx-auto mr-10"><X /></button
  >
</div>
