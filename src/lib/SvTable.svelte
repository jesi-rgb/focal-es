<script>
  // @ts-nocheck

  export let data;

  import { onMount } from "svelte";

  import latinize from "latinize";

  //   import VirtualList from "@sveltejs/svelte-virtual-list";
  import VirtualList from "svelte-tiny-virtual-list";

  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";
  import ParticleTag from "./ParticleTag.svelte";
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
    itemSize = window.innerWidth > 1000 ? 130 : 230;
  });
</script>

<div class="flex flex-col items-start space-y-5">
  <div class="flex flex-col gap-4">
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
              height={560}
              itemCount={masterFilter.length}
              {itemSize}
            >
              <div
                class="hover:bg-slate-100 h-10"
                slot="item"
                let:index
                let:style
                {style}
                on:click={() => (showExample = masterFilter[index].example)}
              >
                <!-- this will be rendered for each currently visible item -->
                <tr class="flex flex-row py-4">
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
                <p class="text-sm w-1/2 text-gray-500">
                  {masterFilter[index].example}
                </p>
              </div>
            </VirtualList>
          </div>
        </div>
      </div>
    </table>
  </div>
  <div class="text-lg font-light">
    {#if showExample == "" && masterFilter.length > 0}
      <div class="text-sm">Selecciona una fila para consultar su ejemplo.</div>
    {:else if searchTerm !== ""}
      <div class="bg-blue-200 text-blue-800 p-5 rounded-xl">
        {@html showExample.replace(
          searchTerm,
          "<span class='font-bold'>" + searchTerm + "</span>"
        )}
      </div>
    {:else}
      <div class="bg-blue-200 text-blue-800 p-5 rounded-xl">{showExample}</div>
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
