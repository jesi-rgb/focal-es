<script>
  // @ts-nocheck

  export let data;

  import { onMount } from "svelte";
  import { fade, crossfade } from "svelte/transition";

  import latinize from "latinize";

  import VirtualList from "svelte-tiny-virtual-list";

  import { X } from "phosphor-svelte";

  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";
  import { Svrollbar } from "svrollbar";

  let viewport;
  let contents;

  //   might be of use: https://github.com/Skayo/svelte-tiny-virtual-list

  let particleOptions = Array.from(new Set(data.map((d) => d.particle)));
  let mediumOptions = Array.from(new Set(data.map((d) => d.medium)));
  let elementOptions = Array.from(new Set(data.map((d) => d.element)));
  let directionOptions = Array.from(new Set(data.map((d) => d.direction)));

  let particleSelected = [];
  let mediumSelected = [];
  let elementSelected = [];
  let directionSelected = [];

  let searchTerm = "";

  // master filter including every aspect
  $: masterFilter = data.filter((item) => {
    return (
      (searchTerm === "" ||
        latinize(item.example.toLowerCase()).indexOf(
          latinize(searchTerm.toLowerCase())
        ) !== -1) &&
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

  let itemSize;

  onMount(() => {
    viewport = document.querySelector(".virtual-list-wrapper");
    contents = document.querySelector(".virtual-list-inner");
    itemSize = window.innerWidth > 1000 ? 130 : 200;
  });
</script>

<div class="flex flex-col items-start space-y-5">
  <div class="flex flex-col gap-4">
    <MultiSelect
      bind:selected={particleSelected}
      placeholder="Filtrar por partícula..."
      options={particleOptions}
      outerDivClass="border-4 ring-1 ring-main"
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />

    <MultiSelect
      bind:selected={mediumSelected}
      placeholder="Filtrar por medio..."
      options={mediumOptions}
      outerDivClass="border-4 ring-1 ring-main"
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
    <MultiSelect
      bind:selected={elementSelected}
      placeholder="Filtrar por elemento..."
      options={elementOptions}
      outerDivClass="border-4 ring-1 ring-main"
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
    <MultiSelect
      bind:selected={directionSelected}
      placeholder="Filtrar por dirección..."
      options={directionOptions}
      outerDivClass="border-4 ring-1 ring-main"
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
  </div>
  <div class="flex flex-col w-full mx-auto">
    <InputSearch bind:value={searchTerm} />
    {#if masterFilter.length == 0}
      <div class="bg-red-200 text-red-900 p-3 rounded-lg my-10">
        <div class="text-md font-bold">
          <p>
            No hay ningún ejemplo que cumpla con los requisitos de búsqueda.
          </p>
        </div>
        <p class="text-sm">
          Prueba a cambiar los filtros o comprueba que la búsqueda por oración
          no contiene erratas.
        </p>
      </div>
    {/if}
    <table class="mb-4">
      <tr class="flex flex-row my-3 px-4 text-main">
        <th
          data-sort="particle"
          class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Partícula</th
        >
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Medio
        </th>
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Elemento
        </th>
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Dirección
        </th>
      </tr>
      <div class="wrapper">
        <div bind:this={viewport} class="viewport">
          <div bind:this={contents} class="contents">
            <Svrollbar {viewport} {contents} />
            <VirtualList
              height={560}
              itemCount={masterFilter.length}
              {itemSize}
            >
              <div
                class="group hover:bg-accent hover:bg-opacity-20 hover:rounded-xl hover:transition-colors inline-block align-middle"
                slot="item"
                let:index
                let:style
                {style}
                on:click={() => (showExample = masterFilter[index].example)}
              >
                <!-- this will be rendered for each currently visible item -->
                <tr
                  class="flex flex-row py-3 px-4 group-hover:text-accent-darker"
                >
                  <td class="w-1/4 text-sm text-left font-semibold"
                    >{masterFilter[index].particle}
                  </td>
                  <td class="w-1/4 text-sm text-left font-semibold"
                    >{masterFilter[index].medium}</td
                  >
                  <td class="w-1/4 text-sm text-left font-semibold"
                    >{masterFilter[index].element}</td
                  >
                  <td class="w-1/4 text-sm text-left font-semibold"
                    >{masterFilter[index].direction}</td
                  >
                </tr>
                <p
                  class="group-hover:text-accent-darker group-hover:text-opacity-60 text-sm text-gray-500 xl:w-1/2 italic mx-5"
                >
                  {masterFilter[index].example}
                </p>
              </div>
            </VirtualList>
          </div>
        </div>
      </div>
    </table>
  </div>
  <div class="text-lg font-light w-full">
    {#if showExample == "" && masterFilter.length > 0}
      <div in:fade={{ duration: 1000 }} class="text-sm">
        Selecciona una fila para consultar su ejemplo.
      </div>
    {:else if searchTerm !== ""}
      <div
        transition:crossfade
        class="bg-main-lighter text-main p-5 rounded-xl flex flex-row w-full"
      >
        <div class="w-4/5">
          {@html showExample.replace(
            searchTerm,
            "<span class='font-bold'>" + searchTerm + "</span>"
          )}
        </div>
        <button
          on:click={() => {
            showExample = "";
          }}
          class="mx-auto mr-10"><X /></button
        >
      </div>
    {:else}
      <div
        transition:fade={{ duration: 300 }}
        class="bg-main-lighter text-main p-5 flex flex-row rounded-xl w-full"
      >
        <div class="w-4/5">
          {showExample}
        </div>
        <button
          on:click={() => {
            showExample = "";
          }}
          class="mx-auto my-auto mr-0 p-5 rounded-full transition-colors hover:bg-main hover:bg-opacity-10"
          ><X /></button
        >
      </div>
    {/if}
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
