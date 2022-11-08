<script>
  // @ts-nocheck

  import SvTable from "../lib/SvTable.svelte";
  import jsonData from "$lib/assets/focalEs.json";
</script>

<div class="flex flex-col">
  <h1 class="text-6xl font-extrabold font-title tracking-wide text-main">
    FOCAL-ES
  </h1>
  <div class="my-4">
    Consulta el uso de las principales partículas focales en diferentes
    contextos.
  </div>
  <div class="my-4">
    Filtra la tabla en función de su uso o busca una frase en el buscador.
  </div>

  <SvTable data={jsonData} />
</div>
