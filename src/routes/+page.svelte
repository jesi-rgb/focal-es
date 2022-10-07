<script>
  import { data } from "$lib/data-xxl";
  import randomData from "$lib/random-data";

  import Table from "../lib/Table.svelte";
  import SvTable from "../lib/SvTable.svelte";
  import VTable from "$lib/VTable.svelte";
  import DTable from "$lib/DTable.svelte";
</script>

<div class="flex flex-col space-y-3">
  <h1 class="text-3xl font-bold">
    Bienvenidos a la base de datos de partículas lingüísticas 👅
  </h1>
  <p>Busca en esta tabla por partícula etc.</p>

  <!-- <Table data={randomData} /> -->
  <!-- <SvTable data={randomData} /> -->
  <DTable {data} />
</div>
