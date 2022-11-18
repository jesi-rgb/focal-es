<script>
  // @ts-nocheck

  import SvTable from "$lib/SvTable.svelte";
  import jsonData from "$lib/assets/focal-es.json";
</script>

<div class="flex flex-col mt-10 space-y-3 mb-10">
  <h1 class="text-3xl font-extrabold font-title tracking-wide text-main ">
    Búsqueda
  </h1>
  <div class="">
    Consulta el uso de las principales partículas focales en diferentes
    contextos.
  </div>
  <div class="">
    Filtra la tabla en función de su uso o busca una frase en el buscador.
  </div>
</div>

<SvTable data={jsonData} />
