<script>
  // @ts-nocheck

  export let particle;
  export let particleOptions;

  let particleColors = [
    "red",
    "blue",
    "green",
    "purple",
    "lime",
    "fuchsia",
    "amber",
  ];

  let color = particle
    ? particleColors[particleOptions.indexOf(particle)]
    : "slate";

  let tagStyle =
    "py-1 px-2 mr-5 bg-" + color + "-200 rounded-lg text-" + color + "-900";
</script>

<!-- <span class="py-1 px-2 mr-5 bg-red-200 rounded-lg text-red-900">
  {particle}
</span> -->
<span class={tagStyle}>
  {particle}
</span>
