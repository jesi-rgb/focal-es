<script>
  // @ts-nocheck

  import VirtualTable from "svelte-virtual-table";
  import InputSearch from "./InputSearch.svelte";

  export let data;

  let searchTerm = "";

  $: filteredList = data.filter(
    (item) =>
      item.example.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  // TWO variables that can be bound to the VirtualTable
  let start; // the index of the first visible item
  let end; // the index of the last visible item
</script>

<div class="flex flex-col space-y-4">
  <InputSearch bind:value={searchTerm} />

  <VirtualTable height="800px" items={filteredList} bind:start bind:end>
    <tr slot="thead" class="text-left">
      <th data-sort="key">i</th>
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
