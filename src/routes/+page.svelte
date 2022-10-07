<script>
  import randomData from "$lib/random-data";

  import Table from "../lib/Table.svelte";
  import SvTable from "../lib/SvTable.svelte";
  import VTable from "$lib/VTable.svelte";
  import DTable from "$lib/DTable.svelte";
</script>

<div class="flex flex-col">
  <h1 class="text-6xl font-extrabold font-title">FOCAL-ES</h1>
  <div class="my-4">
    Consulta el uso de las principales partículas focales en diferentes
    contextos.
  </div>
  <div class="my-4">
    Filtra la tabla en función de su uso o busca una frase en el buscador.
  </div>

  <!-- <Table data={randomData} /> -->
  <SvTable data={randomData} />
  <!-- <VTable data={randomData} /> -->
  <!-- <DTable {data} /> -->
</div>
