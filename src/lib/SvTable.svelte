<script>
  // @ts-nocheck

  export let data;
  let MAX_LENGTH_EXAMPLE = 230;

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

  let particleOptions = Array.from(new Set(data.map((d) => d.particle))).sort();
  let mediumOptions = Array.from(new Set(data.map((d) => d.medium))).sort();
  let elementOptions = Array.from(new Set(data.map((d) => d.element))).sort();
  let directionOptions = Array.from(new Set(data.map((d) => d.direction)));

  let particleSelected = [];
  let mediumSelected = [];
  let elementSelected = [];
  let directionSelected = [];

  let searchTerm = "";

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

  $: nothingSelected =
    particleSelected.length !== 0 &&
    mediumSelected.length !== 0 &&
    elementSelected.length !== 0 &&
    directionSelected.length !== 0 &&
    searchTerm !== "";

  $: isSearchEmpty = searchTerm === "";
  $: isParticleSelectEmpty = particleSelected.length === 0;
  $: isMediumSelectEmpty = mediumSelected.length === 0;
  $: isElementSelectEmpty = elementSelected.length === 0;
  $: isDirectionSelectEmpty = directionSelected.length === 0;

  //   let belongsToSearch = (item) =>
  //     latinize(item.example.toLowerCase()).indexOf(
  //       latinize(searchTerm.toLowerCase())
  //     ) !== -1;

  let belongsToParticleSelect = (item) =>
    particleSelected.includes(item.particle);

  let belongsToMediumSelect = (item) => mediumSelected.includes(item.medium);

  let belongsToElementSelect = (item) => elementSelected.includes(item.element);

  let belongsToDirectionSelect = (item) =>
    directionSelected.includes(item.direction);

  //   master filter including every aspect
  $: masterFilter = data.filter((item) => {
    return (
      (isSearchEmpty ||
        latinize(item.example.toLowerCase()).indexOf(
          latinize(searchTerm.toLowerCase())
        ) !== -1) &&
      (isParticleSelectEmpty || belongsToParticleSelect(item)) &&
      (isMediumSelectEmpty || belongsToMediumSelect(item)) &&
      (isElementSelectEmpty || belongsToElementSelect(item)) &&
      (isDirectionSelectEmpty || belongsToDirectionSelect(item))
    );
  });

  let showExample = "";
  let currentParticle = "";

  let itemSize;

  onMount(() => {
    viewport = document.querySelector(".virtual-list-wrapper");
    contents = document.querySelector(".virtual-list-inner");
    itemSize = window.innerWidth > 1500 ? 130 : 150;
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
    <table class="mb-4 shadow-md shadow-main-lighter rounded-xl">
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
                on:click={() => {
                  showExample = masterFilter[index].example;
                  currentParticle = masterFilter[index].particle;
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
    {#if showExample == "" && masterFilter.length > 0}
      <div in:fade={{ duration: 1000 }} class="text-sm">
        Selecciona una fila para consultar su ejemplo.
      </div>
    {:else if searchTerm !== ""}
      <div
        transition:crossfade
        class="bg-main-lighter text-main p-5 rounded-xl flex flex-row w-full select-all selection:bg-main selection:text-white"
      >
        <div class="w-4/5">
          {@html showExample
            .toLowerCase()
            .replace(
              searchTerm.toLowerCase(),
              "<span class='font-bold'>" + searchTerm + "</span>"
            )
            .replace(
              currentParticle.toLowerCase(),
              "<span class='font-bold'>" +
                currentParticle.toLowerCase() +
                "</span>"
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
        class="bg-main-lighter text-main p-5 flex flex-row rounded-xl w-full select-all selection:bg-main selection:text-white"
      >
        <div class="w-4/5">
          {@html showExample.replace(
            currentParticle.toLowerCase(),
            "<span class='font-bold'>" +
              currentParticle.toLowerCase() +
              "</span>"
          )}
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
