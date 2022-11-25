<script>
  // @ts-nocheck

  import data from "$lib/assets/focal-es.json";
  import { scaleOrdinal } from "d3";

  import { arc, pie } from "d3-shape";

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

  let width = 300;
  let height = 300;
  let outerRadius = 150;
  let innerRadius = outerRadius / 3;

  let margin = { top: 20, bottom: 30, left: 30, right: 30 };

  const colorScale = scaleOrdinal()
    .domain(mediumFrequency.map((m) => m.medium))
    .range(["#C7D2F8", "#D0A2FF"]);

  let pieChartSections = pie()
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)(mediumFrequency.map((i) => i.frequency));

  let chartData = pieChartSections.map((p, i) => {
    let sector = arc()({
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    });
    let centroid = arc().centroid({
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    });
    return {
      medium: mediumFrequency[i],
      path: sector,
      centroid: centroid,
    };
  });
</script>

<div class="gauge-container" bind:clientWidth={width}>
  <svg viewBox="0 0 {width} {height}">
    <g
      transform="translate({margin.left + outerRadius},{height / 2 +
        outerRadius / 2})"
    >
      {#each chartData as cd}
        <g class="group fill-main">
          <path
            class="hover:fill-main"
            fill={colorScale(cd.medium)}
            d={cd.path}
            stroke="#140E78"
            stroke-width="2"
          />

          <g class="group-hover:fill-white">
            <text
              x={cd.centroid[0]}
              y={cd.centroid[1]}
              dx="-20"
              class="font-bold">{cd.medium.medium}</text
            >
            <text
              x={cd.centroid[0]}
              y={cd.centroid[1]}
              dx="-20"
              dy="5"
              dominant-baseline="hanging"
              class="font-mono"
              >{((cd.medium.frequency / data.length) * 100).toFixed(2) +
                "%"}</text
            >
            <text
              x={cd.centroid[0]}
              y={cd.centroid[1]}
              dx="-20"
              dy="20"
              dominant-baseline="hanging"
              class="font-mono text-sm opacity-40 group-hover:opacity-80"
              >{cd.medium.frequency}</text
            >
          </g>
        </g>
      {/each}
    </g>
  </svg>
</div>
