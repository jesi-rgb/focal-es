<script>
  // @ts-nocheck

  export let data;

  import { marked } from "marked";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";

  const particleOptions = [`todavía`, `tampoco`, `ni aun`];
  let selected = [];

  let searchTerm = "";

  // master filter including every aspect
  $: masterFilter = data.filter((item) => {
    return (
      (searchTerm === "" ||
        item.example.toLowerCase().indexOf(searchTerm) !== -1) &&
      (selected.length === 0 || selected.includes(item.particle))
    );
  });

  $: showExample = "";

  console.log(masterFilter);

  let start;
  let end;
</script>

<div class="flex flex-col items-start space-y-5">
  <div class="flex flex-col xl:flex-row space-x-8 w-full mx-auto">
    <MultiSelect bind:selected options={particleOptions} />
    <table class="mb-4 xl:w-3/4">
      <InputSearch bind:value={searchTerm} />
      <tr class="flex flex-row my-3">
        <th
          data-sort="particle"
          class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
          >Partícula
        </th>
        <th
          class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
          >Medio
        </th>
        <th
          class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
          >Elemento
        </th>
        <th
          class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
          >Dirección
        </th>
      </tr>
      <VirtualList
        height="500px"
        items={masterFilter}
        bind:start
        bind:end
        let:item
      >
        <!-- this will be rendered for each currently visible item -->
        <tr
          class="flex flex-row hover:bg-slate-100 py-4 "
          on:click={() => (showExample = item.example)}
        >
          <td class="w-1/4 text-sm text-left font-medium text-slate-900"
            >{item.particle}</td
          >
          <td class="w-1/4 text-sm text-left font-medium text-slate-900"
            >{item.medium}</td
          >
          <td class="w-1/4 text-sm text-left font-medium text-slate-900"
            >{item.element}</td
          >
          <td class="w-1/4 text-sm text-left font-medium text-slate-900"
            >{item.direction}</td
          >
        </tr>
      </VirtualList>
    </table>
    <div class="text-left xl:w-1/4">
      {#if showExample == ""}
        <div>Selecciona una fila para consultar su ejemplo</div>
      {:else if searchTerm !== ""}
        <div>
          {@html marked(
            showExample.replace(searchTerm, "**" + searchTerm + "**")
          )}
        </div>
      {:else}
        <div>{showExample}</div>
      {/if}
    </div>
  </div>
  <div class="text-sm">
    Mostrando elementos en el rango <b>{start} — {end}</b>
  </div>
</div>
