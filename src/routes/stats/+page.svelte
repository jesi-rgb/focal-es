<script>
  // @ts-nocheck
  import Barchart from "$lib/VizComponents/Barchart.svelte";
  import BarchartObvbl from "$lib/VizComponents/BarchartObvbl.svelte";
  import data from "$lib/assets/focal-es.json";

  Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  let particleGroups = data.groupBy("particle");

  let particles = [];
  let frequencies = [];
  Object.keys(particleGroups).forEach((key) => {
    particles.push(key);
    frequencies.push(particleGroups[key].length);
  });
</script>

<main>
  <h1 class="text-3xl text-main font-title">Algunas estadísticas</h1>
  <div>hola</div>
  <div>hola</div>
</main>

<BarchartObvbl
  {data}
  title={"Número de partículas"}
  xDomain={particles}
  yDomain={frequencies}
/>
