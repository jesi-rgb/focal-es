<script>
  // @ts-nocheck

  import { axisBottom, axisLeft, extent, scaleLinear, scaleOrdinal } from "d3";

  // @ts-nocheck

  // @ts-nocheck

  export let xValues; // an array of (ordinal) x-values
  export let yValues;
  export let title;
  export let width = 640; // the outer width of the chart, in pixels
  export let height = 400; // the outer height of the chart, in pixels
  export let marginRight = 0; // the right margin, in pixels
  export let marginBottom = 30; // the bottom margin, in pixels
  export let marginLeft = 40; // the left margin, in pixels
  export let color;

  // Construct scales, axes, and formats.
  const yScale = scaleLinear()
    .domain(extent(yValues.map((d) => +d)))
    .range([0, innerWidth]);

  const xScale = scaleOrdinal(xValues).range([0, innerWidth]);

  const xAxis = axisBottom(xScale).tickSizeOuter(0);
  const yAxis = axisLeft(yScale).ticks(height / 40);

  //   const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  //   const yScale = yType(yDomain, yRange);
  //   const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  //   const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Compute titles.
  //   if (title === undefined) {
  //     const formatValue = yScale.tickFormat(100, yFormat);
  //     title = (i) => `${X[i]}\n${formatValue(Y[i])}`;
  //   } else {
  //     const O = d3.map(data, (d) => d);
  //     const T = title;
  //     title = (i) => T(O[i], i, data);
  //   }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yLabel)
    );

  const bar = svg
    .append("g")
    .attr("fill", color)
    .selectAll("rect")
    .data(I)
    .join("rect")
    .attr("x", (i) => xScale(X[i]))
    .attr("y", (i) => yScale(Y[i]))
    .attr("height", (i) => yScale(0) - yScale(Y[i]))
    .attr("width", xScale.bandwidth());

  if (title) bar.append("title").text(title);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);
</script>

<svg {width} {height}>
  <g />
</svg>
