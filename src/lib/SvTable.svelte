<script>
  // @ts-nocheck

  export let data;
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import InputSearch from "./InputSearch.svelte";

  let searchTerm = "";
  $: filteredList = data.filter(
    (item) => item.particle.toLowerCase().indexOf(searchTerm) !== -1
  );

  let start;
  let end;
</script>

<div>
  <InputSearch bind:value={searchTerm} />

  <table class="w-full divide-y divide-slate-200 scrollbar-hide">
    <tr class="flex flex-row my-3">
      <th class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
        >Partícula
      </th>
      <th class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
        >Medio
      </th>
      <th class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
        >Elemento
      </th>
      <th class="w-1/4 text-left text-sm text-gray-500 uppercase tracking-wider"
        >Dirección
      </th>
    </tr>
    <VirtualList
      height="500px"
      items={filteredList}
      class="scrollbar-hide"
      bind:start
      bind:end
      let:item
    >
      <!-- this will be rendered for each currently visible item -->
      <tr class="flex flex-row my-3 hover:bg-slate-100 scrollbar-hide">
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
  <p>Mostrando elementos en el rango <b>{start} — {end}</b></p>
</div>
