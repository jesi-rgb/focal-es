<script>
  // @ts-nocheck

  export let data;

  import { marked } from "marked";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";
  import ParticleTag from "./ParticleTag.svelte";
  import { Svrollbar } from "svrollbar";

  import {
    particleOptions,
    mediumOptions,
    elementOptions,
    directionOptions,
  } from "./utils";

  let viewport;
  let contents;

  //   might be of use: https://github.com/Skayo/svelte-tiny-virtual-list

  let particleSelected = [];
  let mediumSelected = [];
  let elementSelected = [];
  let directionSelected = [];

  let searchTerm = "";

  // master filter including every aspect
  $: masterFilter = data.filter((item) => {
    return (
      (searchTerm === "" ||
        item.example.toLowerCase().indexOf(searchTerm) !== -1) &&
      (particleSelected.length === 0 ||
        particleSelected.includes(item.particle)) &&
      (mediumSelected.length === 0 || mediumSelected.includes(item.medium)) &&
      (elementSelected.length === 0 ||
        elementSelected.includes(item.element)) &&
      (directionSelected.length === 0 ||
        directionSelected.includes(item.direction))
    );
  });

  $: showExample = "";

  let start;
  let end;
</script>

<div class="flex flex-col items-start space-y-5">
  <div class="flex flex-col w-full xl:grid xl:grid-cols-2 gap-4">
    <MultiSelect
      bind:selected={particleSelected}
      placeholder="Filtrar por partícula..."
      options={particleOptions}
    />
    <MultiSelect
      bind:selected={mediumSelected}
      placeholder="Filtrar por medio..."
      options={mediumOptions}
    />
    <MultiSelect
      bind:selected={elementSelected}
      placeholder="Filtrar por elemento..."
      options={elementOptions}
    />
    <MultiSelect
      bind:selected={directionSelected}
      placeholder="Filtrar por dirección..."
      options={directionOptions}
    />
  </div>
  <div class="flex flex-col xl:flex-row space-x-8 w-full mx-auto">
    <table class="mb-4">
      <InputSearch bind:value={searchTerm} />
      <tr class="flex flex-row my-3">
        <th
          data-sort="particle"
          class="w-1/4 text-left text-xs md:text-sm text-gray-500 uppercase tracking-wider"
          >Partícula</th
        >
        <th
          class="w-1/4 text-left text-xs md:text-sm text-gray-500 uppercase tracking-wider"
          >Medio
        </th>
        <th
          class="w-1/4 text-left text-xs md:text-sm text-gray-500 uppercase tracking-wider"
          >Elemento
        </th>
        <th
          class="w-1/4 text-left text-xs md:text-sm text-gray-500 uppercase tracking-wider"
          >Dirección
        </th>
      </tr>
      <div class="wrapper">
        <div bind:this={viewport} class="viewport">
          <div bind:this={contents} class="contents">
            <Svrollbar {viewport} {contents} />
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
                <td class="w-1/4 text-sm text-left font-medium"
                  ><ParticleTag particle={item.particle} /></td
                >
                <td class="w-1/4 text-sm text-left font-medium"
                  >{item.medium}</td
                >
                <td class="w-1/4 text-sm text-left font-medium"
                  >{item.element}</td
                >
                <td class="w-1/4 text-sm text-left font-medium"
                  >{item.direction}</td
                >
              </tr>
            </VirtualList>
          </div>
        </div>
      </div>
    </table>
  </div>
  <div class="text-lg font-light">
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
  <div class="text-xs">
    Mostrando elementos en el rango <b>{start} — {end}</b>
  </div>
</div>

<style>
  :global(.virtual-list-wrapper) {
    /* hide scrollbar */
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  :global(.virtual-list-wrapper::-webkit-scrollbar) {
    /* hide scrollbar */
    display: none !important;
  }

  .wrapper {
    position: relative;
  }
</style>
