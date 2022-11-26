<script>
  // @ts-nocheck
  import data from "$lib/assets/focal-es.json";
  import DirectionChart from "$lib/VizComponents/DirectionChart.svelte";
  import ElementBarchart from "$lib/VizComponents/ElementBarchart.svelte";
  import MediumChart from "$lib/VizComponents/MediumChart.svelte";
  import ParticleBarchart from "$lib/VizComponents/ParticleBarchart.svelte";
  import {
    ArrowCircleRight,
    BookOpen,
    CirclesThree,
    Crosshair,
  } from "phosphor-svelte";

  Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  let particleGroups = data.groupBy("particle");
  let elementGroups = data.groupBy("element");

  let particleFrequency = [];
  Object.keys(particleGroups).forEach((key) => {
    particleFrequency.push({
      particle: key,
      frequency: particleGroups[key].length,
    });
  });
  particleFrequency.sort((a, b) => a.frequency - b.frequency);

  let minParticleFreq = particleFrequency[0];
  let maxParticleFreq = particleFrequency[particleFrequency.length - 1];

  let elementFrequency = [];
  Object.keys(elementGroups).forEach((key) => {
    elementFrequency.push({
      element: key,
      frequency: elementGroups[key].length,
    });
  });

  elementFrequency.sort((a, b) => a.frequency - b.frequency);

  let minElementFreq = elementFrequency[0];
  let maxElementFreq = elementFrequency[elementFrequency.length - 1];
</script>

<h1 class="text-3xl text-main font-title mb-10">Algunas estadísticas</h1>

<div class="flex flex-col space-y-20">
  <div class="text-lg max-w-md">
    <p>
      En total, el corpus presenta <b>{data.length}</b> ejemplos clasificados por
      partícula, medio, elemento focalizado y dirección. Se puede comprobar la distribución
      de dichos ejemplos en las siguientes gráficas.
    </p>
  </div>
  <div>
    <h2 class="text-2xl font-semibold lg:flex lg:gap-3 items-center">
      <span> <CirclesThree weight="duotone" class="text-main text-2xl" /></span>
      Distribución de partículas
    </h2>

    <p class="max-w-md">
      Se observa el número de oraciones que contiene cada partícula. {minParticleFreq.particle}
      destaca por ser la menos común con <b>{minParticleFreq.frequency}</b>
      ejemplos, aunque no está muy lejos de {maxParticleFreq.particle}, con un
      total de <b>{maxParticleFreq.frequency}</b>
      ejemplos.
    </p>
    <ParticleBarchart />
  </div>

  <div>
    <h2
      class="text-2xl font-semibold lg:flex lg:flex-row lg:gap-3 items-center"
    >
      <span>
        <Crosshair weight="duotone" class="text-main text-2xl" />
      </span>
      Distribución de elementos focalizados
    </h2>
    <p class="max-w-md">
      En este caso, vemos la clasificación de los elementos modificados. Aquí,
      la proporción sí es más exagerada, habiendo únicamente <b
        >{minElementFreq.frequency}</b
      >
      ejemplos de {minElementFreq.element}, mientras que hay
      <b>{maxElementFreq.frequency}</b> elementos de {maxElementFreq.element}.
    </p>
    <ElementBarchart />
  </div>
  <div>
    <h2
      class="text-2xl font-semibold lg:flex lg:flex-row lg:gap-3 items-center"
    >
      <span>
        <BookOpen weight="duotone" class="text-main text-2xl" />
      </span>
      Distribución de medio
    </h2>
    <p class="max-w-md">
      Se aprecia que hay ligeramente más ejemplos de medios escritos que de
      medios orales, pero esta distribución no está particularmente
      desbalanceada.
    </p>
    <MediumChart />
  </div>
  <div>
    <h2
      class="text-2xl font-semibold lg:flex lg:flex-row lg:gap-3 items-center"
    >
      <span>
        <ArrowCircleRight weight="duotone" class="text-main text-2xl" />
      </span>
      Distribución de dirección
    </h2>
    <p class="max-w-md">
      Por último, la distribución del atributo de dirección es claramente
      favorable a ser hacia la derecha, lo que indica que es la forma más común
      de focalizar un elemento. Se puede pasar el ratón por las diferentes
      secciones del gráfico para obtener más información.
    </p>
    <DirectionChart />
  </div>
</div>
