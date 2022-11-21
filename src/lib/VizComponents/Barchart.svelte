<script>
  // @ts-nocheck

  import { select } from "d3-selection";
  import { extent, bisector, max } from "d3-array";
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { interpolateRound } from "d3-interpolate";
  import Axis from "./Axis.svelte";

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
  console.log(frequencies, particles);

  //   chart definition

  const width = 600;
  const height = 100;

  const margin = { top: 30, right: 0, bottom: 10, left: 30 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear()
    .domain(extent(frequencies.map((d) => +d)))
    .range([0, innerWidth]);

  const xScale = scaleOrdinal(particles).range([0, innerWidth]);
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.bottom})`}>
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
