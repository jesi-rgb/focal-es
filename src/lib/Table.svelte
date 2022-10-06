<script>
  let table = [
    {
      particle: "Todavía",
      medium: "Oral",
      element: "Verbal",
      direction: "Derecha",
    },
    {
      particle: "Todavía",
      medium: "Oral",
      element: "Verbal",
      direction: "Derecha",
    },
    {
      particle: "Todavía",
      medium: "Oral",
      element: "Verbal",
      direction: "Derecha",
    },
    {
      particle: "Todavía",
      medium: "Oral",
      element: "Verbal",
      direction: "Derecha",
    },
  ];
</script>

<div class="">
  <table class="mx-auto max-w-xl divide-y divide-slate-200">
    <tr>
      <th
        class="pr-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Partícula
      </th>
      <th
        class="pr-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Medio
      </th>
      <th
        class="pr-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Elemento
      </th>
      <th
        class="pr-6 py-3 text-left text-xs text-slate-500 uppercase tracking-wider"
        >Dirección
      </th>
    </tr>
    {#each table as { particle, medium, element, direction }}
      <tr>
        <td class="pr-6 py-4 text-sm text-slate-900">{particle}</td>
        <td class="pr-6 py-4 text-sm text-slate-900">{medium}</td>
        <td class="pr-6 py-4 text-sm text-slate-900">{element}</td>
        <td class="pr-6 py-4 text-sm text-slate-900">{direction}</td>
      </tr>
    {/each}
  </table>
</div>
