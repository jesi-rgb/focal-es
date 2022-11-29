<script>
  // @ts-nocheck

  export let data;
  let MAX_LENGTH_EXAMPLE = 230;

  import { onMount } from "svelte";

  import latinize from "latinize";

  import VirtualList from "svelte-tiny-virtual-list";

  import { Warning } from "phosphor-svelte";

  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";
  import { Svrollbar } from "svrollbar";
  import ShowExample from "./ShowExample.svelte";

  let viewport;
  let contents;

  let particleOptions = Array.from(new Set(data.map((d) => d.particle))).sort();
  let mediumOptions = Array.from(new Set(data.map((d) => d.medium))).sort();
  let elementOptions = Array.from(new Set(data.map((d) => d.element))).sort();
  let directionOptions = Array.from(new Set(data.map((d) => d.direction)));

  let particleSelected = [];
  let mediumSelected = [];
  let elementSelected = [];
  let directionSelected = [];

  let searchTerm = "";
  let showExample = "";

  let itemSize;

  // truncate the examples since some are very long.
  // for this, we append "truncatedExample" to each object
  // so we have both the full and truncated examples to work with
  data = data.map((item) => {
    if (item.example.length > MAX_LENGTH_EXAMPLE) {
      let truncated = item.example.slice(0, MAX_LENGTH_EXAMPLE - 3);
      truncated += "...";
      item.truncatedExample = truncated;
    } else {
      item.truncatedExample = item.example;
    }
    return item;
  });

  $: noSelection =
    particleSelected.length === 0 &&
    mediumSelected.length === 0 &&
    elementSelected.length === 0 &&
    directionSelected.length === 0 &&
    searchTerm === "";

  $: isSearchEmpty = searchTerm === "";
  $: isParticleSelectEmpty = particleSelected.length === 0;
  $: isMediumSelectEmpty = mediumSelected.length === 0;
  $: isElementSelectEmpty = elementSelected.length === 0;
  $: isDirectionSelectEmpty = directionSelected.length === 0;

  let isFoundOnSearch = (item, search) =>
    latinize(item.example.toLowerCase()).indexOf(
      latinize(search.toLowerCase())
    ) !== -1;

  let belongsTo = (item, property, set) => {
    return set.includes(item[property]);
  };

  $: masterFilter = data.filter((i) => {
    return (
      (belongsTo(i, "particle", particleSelected) || isParticleSelectEmpty) &&
      (belongsTo(i, "medium", mediumSelected) || isMediumSelectEmpty) &&
      (belongsTo(i, "element", elementSelected) || isElementSelectEmpty) &&
      (belongsTo(i, "direction", directionSelected) ||
        isDirectionSelectEmpty) &&
      (isFoundOnSearch(i, searchTerm) || isSearchEmpty) &&
      !noSelection
    );
  });

  onMount(() => {
    viewport = document.querySelector(".virtual-list-wrapper");
    contents = document.querySelector(".virtual-list-inner");
    itemSize = window.innerWidth < 600 ? 180 : 120;
  });
</script>

<div class="flex flex-col items-start space-y-5">
  <div class="flex flex-col w-full 2xl:flex-row 2xl:w-auto gap-4">
    <MultiSelect
      bind:selected={particleSelected}
      placeholder="Filtrar por partícula..."
      options={particleOptions}
      outerDivClass=""
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />

    <MultiSelect
      bind:selected={mediumSelected}
      placeholder="Filtrar por medio..."
      options={mediumOptions}
      outerDivClass=""
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
    <MultiSelect
      bind:selected={elementSelected}
      placeholder="Filtrar por elemento..."
      options={elementOptions}
      outerDivClass=""
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
    <MultiSelect
      bind:selected={directionSelected}
      placeholder="Filtrar por dirección..."
      options={directionOptions}
      outerDivClass=""
      ulSelectedClass="text-main"
      liOptionClass="text-main"
    />
  </div>
  <div class="flex flex-col w-full mx-auto">
    <InputSearch bind:value={searchTerm} />
    {#if masterFilter.length == 0 && noSelection}
      <div class="bg-main-lighter text-main p-3 rounded-lg my-10">
        <div class="text-md font-semibold">
          <p>
            ¡Busca alguna palabra o filtra la tabla por alguno de los criterios
            de arriba!
          </p>
        </div>
      </div>
    {:else if masterFilter.length == 0 && !noSelection}
      <div class="bg-red-200 text-red-900 p-3 rounded-lg my-10">
        <div class="text-md font-bold flex items-center">
          <Warning class="mr-3" weight="regular" />
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
    <table class="mb-4 shadow-md shadow-main-lighter rounded-md">
      <tr class="flex flex-row my-2 pb-2 px-4 text-main border-b-2 border-main">
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Partícula</th
        >
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Medio
        </th>
        <th class="w-1/4 text-left text-xs md:text-sm uppercase tracking-wider"
          >Elemento focalizado
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
              height={masterFilter.length === 0 ? 0 : 560}
              itemCount={masterFilter.length}
              {itemSize}
            >
              <div
                class="group hover:bg-accent hover:bg-opacity-20 hover:rounded-xl hover:transition-colors inline-block align-middle"
                slot="item"
                let:index
                let:style
                {style}
                on:click={() => {
                  showExample = masterFilter[index].example;
                }}
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
                  class="group-hover:text-accent-darker group-hover:text-opacity-60 text-sm text-gray-500 italic mx-5"
                >
                  {masterFilter[index].truncatedExample}
                </p>
              </div>
            </VirtualList>
          </div>
        </div>
      </div>
    </table>
  </div>
  <div class="text-lg font-light w-full">
    {#if showExample !== ""}
      <ShowExample bind:example={showExample} {searchTerm} />
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

  :root {
    --main: #140e78;

    --white: #fff;
    --main-lighter: #c7d2f8;
    --accent: #d0a2ff;
    --accent-darker: #7300ed;
    --text-color: #fff;

    --sms-active-color: var(--main-lighter);

    --sms-border: 1px solid var(--main-lighter);
    --sms-options-bg: #fff;
    --sms-selected-bg: var(--main);
    --sms-text-color: var(--white);
    --sms-placeholder-color: var(--main);
  }

  :global(div.multiselect > svg) {
    /* top-level wrapper div */
    color: #140e78;
  }
  :global(.remove-all > svg) {
    /* top-level wrapper div */
    color: #140e78;
  }
</style>
