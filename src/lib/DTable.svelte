<script>
  // @ts-nocheck
  import { Datatable } from "svelte-simple-datatables";

  export let data;

  const settings = {
    sortable: true,
    pagination: false,
    // rowsPerPage: 50,
    columnFilter: true,
  };
  let rows;
</script>

<Datatable {settings} {data} bind:dataRows={rows}>
  <thead>
    <th data-key="particle">Partícula</th>
    <th data-key="medium">Medio</th>
    <th data-key="element">Elemento</th>
    <th data-key="direction">Dirección</th>
  </thead>
  <tbody>
    {#each $rows as row}
      <tr>
        <td>{row.particle}</td>
        <td>{row.medium}</td>
        <td>{row.element}</td>
        <td>{row.direction}</td>
      </tr>
    {/each}
  </tbody>
</Datatable>

<!-- <style>
  th:first-child {
    width: 72px;
  }
  td {
    text-align: center;
    padding: 4px 0;
  }
</style> -->
