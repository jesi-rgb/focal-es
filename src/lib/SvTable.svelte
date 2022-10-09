<script>
  // @ts-nocheck

  export let data;

  import { marked } from "marked";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import InputSearch from "./InputSearch.svelte";
  import MultiSelect from "svelte-multiselect";

  const particleOptions = [
    "inclusive",
    "incluso",
    "ni aun",
    "ni siquiera",
    "también",
    "tampoco",
    "todavía",
  ];
  const mediumOptions = ["Oral", "Escrito"];
  const elementOptions = [
    "Sintagma verbal",
    "Sintagma nominal",
    "Sintagma pronominal",
    "Sintagma adjetival",
    "Sintagma adverbial",
    "Sintagma preposicional",
    "Oración",
    "Oración subordinada",
    "Cláusula de infinitivo",
    "Cláusula de gerundio",
    "Cláusula de participio",
    "Dentro de una perífrasis",
  ];
  const directionOptions = ["Derecha", "Izquierda"];

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
  <div class="flex flex-row gap-4">
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
    <table class="mb-4 xl:w-3/4">
      <InputSearch bind:value={searchTerm} />
      <tr class="flex flex-row my-3">
        <th
          data-sort="particle"
          class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
          >Partícula</th
        >
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
