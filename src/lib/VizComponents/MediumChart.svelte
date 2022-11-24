<script>
  // @ts-nocheck

  import data from "$lib/assets/focal-es.json";
  import { scaleOrdinal } from "d3";

  import { arc, pie } from "d3-shape";
  import { Star } from "phosphor-svelte";

  Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  let particleGroups = data.groupBy("medium");

  let mediumFrequency = [];
  Object.keys(particleGroups).forEach((key) => {
    mediumFrequency.push({
      medium: key,
      frequency: particleGroups[key].length,
    });
  });

  let width = 200;
  let height = 200;

  const colorScale = scaleOrdinal()
    .domain(mediumFrequency.map((m) => m.medium))
    .range(["#C7D2F8", "#D0A2FF"]);

  let pieChartSections = pie()
    .padAngle(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)(mediumFrequency.map((i) => i.frequency));

  let chartData = pieChartSections.map((p, i) => {
    return {
      medium: mediumFrequency[i],
      path: arc()({
        innerRadius: 30,
        outerRadius: 90,
        startAngle: p.startAngle,
        endAngle: p.endAngle,
      }),
    };
  });
</script>

<svg
  class="w-full xl:max-w-xl"
  preserveAspectRatio="xMinYMin"
  style="max-width=100%;"
>
  <g transform="translate({width / 2},{height / 2})">
    {#each chartData as cd}
      <path fill={colorScale(cd.medium)} d={cd.path} />
    {/each}
  </g>
</svg>
