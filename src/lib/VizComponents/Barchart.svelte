<script>
  // @ts-nocheck

  import { select } from "d3-selection";
  import { extent, bisector, max } from "d3-array";
  import { scaleLinear, scaleTime } from "d3-scale";
  import { line, area, curveBasis } from "d3-shape";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

  import data from "$lib/assets/focal-es.json";

  import { onMount } from "svelte";

  Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  let particleFreq = data.groupBy("particle");
  console.log(particleFreq);

  //   chart definition

  let width, height;
  onMount(() => {
    width = window.innerWidth - 100;
    console.log(width);
    height = 100;
  });

  const margin = { top: 30, right: 0, bottom: 10, left: 30 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleTime()
    .domain(extent(hours.map((d) => new Date(d.dt * 1000 + timeOffset))))
    .range([0, innerWidth]);

  console.log(xScale);

  const yScale = scaleLinear()
    .domain(
      padExtent(
        hours.map((d) => d.temp),
        5
      ).map((d) => Math.round(d))
    )
    .range([innerHeight, 0])
    .interpolate(interpolateRound);
</script>

<svg>
  <g>
    <Axis
      {innerHeight}
      tickNumber={6}
      {margin}
      scale={xScale}
      position="bottom"
    />
    <Axis
      {innerHeight}
      tickNumber={2}
      {margin}
      scale={yScale}
      position="left"
    />
  </g>
</svg>
