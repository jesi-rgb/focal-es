<script>
  // @ts-nocheck
  import data from "$lib/assets/focal-es.json";
  import ElementBarchart from "$lib/VizComponents/ElementBarchart.svelte";
  import ParticleBarchart from "$lib/VizComponents/ParticleBarchart.svelte";

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

<h1 class="text-3xl text-main font-title mb-10">Algunas estadísticas</h1>

<div class="flex flex-col space-y-20">
  <div>
    <h2 class="text-2xl font-semibold">
      Distribución de partículas en el corpus
    </h2>
    <ParticleBarchart />
  </div>

  <div>
    <h2 class="text-2xl font-semibold">
      Distribución de elementos en el corpus
    </h2>
    <ElementBarchart />
  </div>
</div>
