<script>
  // @ts-nocheck

  import { X } from "phosphor-svelte";

  export let example;
  export let searchTerm;
</script>

<div
  class="bg-main-lighter text-main p-5 rounded-xl flex flex-row w-full select-all selection:bg-main selection:text-white"
>
  <div class="w-4/5 text-justify">
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
    class="my-auto mx-auto rounded-full p-4 mr-0 mt-0 hover:bg-main hover:bg-opacity-40"
    ><X /></button
  >
</div>
