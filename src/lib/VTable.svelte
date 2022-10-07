<script>
  // @ts-nocheck

  import VirtualTable from "svelte-virtual-table";

  export let data;

  let searchTerm = "";

  $: filteredList = data.filter(
    (item) =>
      item.particle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  // TWO variables that can be bound to the VirtualTable
  let start; // the index of the first visible item
  let end; // the index of the last visible item
</script>

<div class="flex flex-col space-y-4">
  <input
    class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
    placeholder="Filtrar por partícula..."
    bind:value={searchTerm}
  />

  <VirtualTable
    class="divide-y "
    height="500px"
    items={filteredList}
    bind:start
    bind:end
  >
    <tr slot="thead" class="text-left">
      <th data-sort="key">Índice</th>
      <th data-sort="particle">Partícula</th>
      <th data-sort="medium">Medio</th>
      <th data-sort="element">Elemento</th>
      <th data-sort="direction">Dirección</th>
    </tr>
    <tr slot="tbody" let:item class="hover:bg-gray-100">
      <td>{item.key}</td>
      <td>{item.particle}</td>
      <td>{item.medium}</td>
      <td>{item.element}</td>
      <td>{item.direction}</td>
    </tr>
  </VirtualTable>

  <p>Mostrando elementos en el rango <b>{start} — {end}</b></p>
</div>
