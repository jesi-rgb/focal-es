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

  let elementGroups = data.groupBy("element");

  let elementFrequency = [];
  Object.keys(elementGroups).forEach((key) => {
    elementFrequency.push({
      element: key,
      frequency: elementGroups[key].length,
    });
  });

  elementFrequency.sort((b, a) => a.frequency - b.frequency);

  //   chart definition

  let pinXAxis, pinYAxis; // declare pins
  let margin = 30; // declare initial values for margin and svg_height/width
  let svg_height = 500;
  let svg_width = 700;
  $: height = svg_height - margin * 2;
  $: width = svg_width - margin * 5;

  // define generator functions for x and y axes
  $: y = scaleBand()
    .domain(elementFrequency.map((i) => i.element))
    .range([height, 0])
    .padding(0.1);

  $: x = scaleLinear()
    .domain([0, max(elementFrequency.map((i) => i.frequency))])
    .nice()
    .range([0, width - 5 * margin]);

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
  <g transform="translate({6 * margin},{0})">
    <g
      class="xAxis font-mono text-sm lg:text-sm"
      bind:this={pinXAxis}
      transform="translate({margin},{margin + height})"
    />
    <g
      class="yAxis font-body font-semibold text-lg"
      bind:this={pinYAxis}
      transform="translate({margin},{margin})"
    />

    <g transform="translate({margin},{margin})">
      {#each elementFrequency as { element, frequency }}
        <rect
          class="hover:fill-main transition-colors duration-100"
          x={y(0)}
          y={y(element)}
          height={y.bandwidth()}
          width={x(frequency)}
          stroke="#140E78"
          fill="#C7D2F8"
        />
      {/each}
    </g>
  </g>
</svg>
