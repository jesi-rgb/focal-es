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

  let particleFrequency = [];
  Object.keys(particleGroups).forEach((key) => {
    particleFrequency.push({
      particle: key,
      frequency: particleGroups[key].length,
    });
  });

  particleFrequency.sort((a, b) => b.frequency - a.frequency);

  //   chart definition

  let pinXAxis, pinYAxis; // declare pins
  let margin = 30; // declare initial values for margin and svg_height/width
  let svg_height = 300;
  let svg_width = 600;
  $: height = svg_height - margin * 2;
  $: width = svg_width - margin * 2;

  // define generator functions for x and y axes
  $: x = scaleBand()
    .domain(particleFrequency.map((i) => i.particle))
    .range([0, width])
    .padding(0.1);

  $: y = scaleLinear()
    .domain([0, max(particleFrequency.map((i) => i.frequency))])
    .range([height, 0]);

  // call axis generators on the scale and pin the SVG pins.
  $: if (pinXAxis) {
    select(pinXAxis).call(axisBottom(x));
  }
  $: if (pinYAxis) {
    select(pinYAxis).call(axisLeft(y));
  }
</script>

<svg
  class="w-full xl:max-w-xl"
  viewBox="0 0 {svg_width} {svg_height}"
  preserveAspectRatio="xMinYMin"
  style="max-width=100%;"
>
  <g transform="translate({5},{0})">
    <g
      class="xAxis font-body text-sm"
      bind:this={pinXAxis}
      transform="translate({margin},{margin + height})"
    />
    <g
      class="yAxis font-mono text-sm tabular-nums"
      bind:this={pinYAxis}
      transform="translate({margin},{margin})"
    />

    <g transform="translate({margin},{margin})">
      {#each particleFrequency as { particle, frequency }}
        <g class="group">
          <rect
            class=" group-hover:fill-canary hover:cursor-pointer transition-colors duration-100"
            x={x(particle)}
            y={y(frequency)}
            height={y(0) - y(frequency)}
            width={x.bandwidth()}
            stroke="#140E78"
            fill="#C7D2F8"
          />
          <text
            x={x(particle) + x.bandwidth() / 4}
            y={y(10)}
            class="fill-main font-bold font-mono"
          >
            {frequency}
          </text>
        </g>
      {/each}
    </g>
  </g>
</svg>
