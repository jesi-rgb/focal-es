<script>
  // @ts-nocheck

  export let data;
  export let length;
  export let xScale;
</script>

<div
  class="bg-main-lighter bg-opacity-30 rounded-xl border border-main px-3 py-1 text-main transition-all"
  style="position: absolute; top:150px; left:{xScale(data.x)}px"
>
  <p class="font-bold mb-3 border-main border-b">{data.data.direction}</p>
  <p>{data.width} ejemplos</p>
  <p class="font-mono">{((data.width / length) * 100).toFixed(2)}%</p>
</div>
