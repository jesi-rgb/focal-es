<script>
  // @ts-nocheck

  import { select } from "d3-selection";
  import { scaleBand, scaleLinear } from "d3-scale";

  import data from "$lib/assets/focal-es.json";
  import { axisBottom, axisLeft } from "d3-axis";
  import { extent, max } from "d3";

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
  let partFreqDict = [];
  Object.keys(particleGroups).forEach((key) => {
    particles.push(key);
    frequencies.push(particleGroups[key].length);
    partFreqDict.push({ particle: key, frequency: particleGroups[key].length });
  });

  //   chart definition

  let pinXAxis, pinYAxis; // declare pins
  let margin = 30; // declare initial values for margin and svg_height/width
  let svg_height = 300;
  let svg_width = 700;
  $: height = svg_height - margin * 2;
  $: width = svg_width - margin * 2;

  // define generator functions for x and y axes
  $: x = scaleBand().domain(particles).range([0, width]).padding(0.1);
  $: y = scaleLinear()
    .domain([0, max(frequencies)])
    .range([height, 0]);

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinXAxis) {
    select(pinXAxis).call(axisBottom(x));
  }
  $: if (pinYAxis) {
    select(pinYAxis).call(axisLeft(y));
  }
</script>

<svg width={svg_width} height={svg_height}>
  <g
    class="xAxis font-body text-sm"
    bind:this={pinXAxis}
    transform="translate({margin},{margin + height})"
  />
  <g
    class="yAxis font-mono font-semibold tabular-nums"
    bind:this={pinYAxis}
    transform="translate({margin},{margin})"
  />

  <g transform="translate({margin},{margin})">
    {#each partFreqDict as { particle, frequency }}
      <rect
        x={x(particle)}
        y={y(frequency)}
        height={y(0) - y(frequency)}
        width={x.bandwidth()}
        stroke="#140E78"
        stroke-width="3"
        fill="#C7D2F8"
      />
    {/each}
  </g>
</svg>
