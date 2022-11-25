<script>
  // @ts-nocheck

  import data from "$lib/assets/focal-es.json";
  import { scaleLinear, scaleOrdinal, sum } from "d3";

  import { stack, stackOrderDescending } from "d3-shape";

  Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  let particleGroups = data.groupBy("direction");

  let directionFrequency = [];
  Object.keys(particleGroups).forEach((key) => {
    directionFrequency.push({
      direction: key,
      frequency: particleGroups[key].length,
    });
  });

  let width = 300;
  let height = 300;
  let rectHeight = 80;

  let margin = { top: 20, bottom: 30, left: 5, right: 30 };

  const xScale = scaleLinear()
    .domain([0, sum(directionFrequency.map((i) => i.frequency))])
    .range([margin.left, width - margin.right]);

  const colorScale = scaleOrdinal()
    .domain(directionFrequency.map((m) => m.direction))
    .range(["#C7D2F8", "#D0A2FF", "#140E78"]);

  let stackConfig = stack().keys(["frequency"]).order(stackOrderDescending);

  // we take the first one because we only have one category
  let series = stackConfig(directionFrequency)[0];

  let rectData = [];
  let widthAcc = 0;
  let padding = 100;
  for (let i = 0; i < series.length; i++) {
    // let x = i > 0 ? series[i][1] + series[i - 1][1] : 0;

    let x;
    if (i == 0) x = 0;
    else {
      x = series[i - 1][1] + widthAcc + padding;
      widthAcc += series[i - 1][1] + padding;
    }

    rectData.push({
      x: x,
      width: series[i][1],
      data: series[i].data,
    });
  }
</script>

<div class="gauge-container" bind:clientWidth={width}>
  <svg viewBox="0 0 {width} {height}">
    {#each rectData as s}
      <rect
        x={xScale(s.x)}
        y={height / 2 - rectHeight / 2}
        width={xScale(s.width)}
        height={rectHeight}
        fill={colorScale(s.data.direction)}
        stroke="#140E78"
        stroke-width="2"
      />
      <text
        x={xScale(s.x + s.width / 2)}
        y={height / 2}
        text-anchor="middle"
        dominant-baseline="middle"
        style=""
        fill="#140E78">{s.data.direction}</text
      >
    {/each}
  </svg>
</div>
