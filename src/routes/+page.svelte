<script>
  import SvTable from "../lib/SvTable.svelte";
  import Table from "../lib/Table.svelte";
  import { data } from "$lib/data-xxl";
</script>

<div class="flex flex-col space-y-3">
  <h1 class="text-3xl font-bold">
    Bienvenidos a la base de datos de partículas ⚗️ lingüísticas 👅
  </h1>
  <p>Busca en esta tabla por partícula etc.</p>

  <SvTable {data} />
</div>
