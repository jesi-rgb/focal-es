<script>
  // @ts-nocheck

  import { Link } from "phosphor-svelte";

  export let title;
  export let link;
</script>

<a
  class="hover:bg-accent hover:bg-opacity-30 px-2 py-2 w-max rounded-md transition-colors"
  href={link}
>
  <div class="font-xl text-main font-bold flex flex-row items-center">
    <span>
      <Link class="mr-3" weight="duotone" />
    </span>

    {title}
  </div>
  <div class="text-main text-opacity-60 font-mono text-sm">
    {link}
  </div>
</a>
