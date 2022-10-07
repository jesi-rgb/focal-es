<script>
  // @ts-nocheck

  export let data;

  let searchTerm = "";
  $: filteredList = data.filter(
    (item) => item.particle.toLowerCase().indexOf(searchTerm) !== -1
  );
</script>

<div class="overflow-y-scroll h-96">
  Filter: <input bind:value={searchTerm} />
  {searchTerm}
  <table class="mx-auto max-w-xl divide-y divide-slate-200 ">
    <tr>
      <th
        class="pr-20 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Partícula
      </th>
      <th
        class="pr-20 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Medio
      </th>
      <th
        class="pr-20 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Elemento
      </th>
      <th class="py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Dirección
      </th>
    </tr>
    {#each filteredList as { particle, medium, element, direction }}
      <tr class="hover:bg-slate-100">
        <td class="pr-20 py-4 text-sm font-medium text-slate-900">{particle}</td
        >
        <td class="pr-20 py-4 text-sm font-medium text-slate-900">{medium}</td>
        <td class="pr-20 py-4 text-sm font-medium text-slate-900">{element}</td>
        <td class="py-4 text-sm font-medium text-slate-900">{direction}</td>
      </tr>
    {/each}
  </table>
</div>
