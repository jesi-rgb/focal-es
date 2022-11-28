<script>
  // @ts-nocheck

  import { Link } from "phosphor-svelte";

  export let title;
  export let link;
</script>

<a
  class="hover:bg-canary hover:bg-opacity-40 hover:ring-main hover:ring-opacity-30 hover:ring-1 px-2 py-2 rounded-md transition-all duration-200"
  href={link}
>
  <div class="font-xl text-main font-bold md:flex md:flex-row items-center">
    <span>
      <Link class="mr-3" weight="duotone" />
    </span>
    {title}
  </div>
  <div class="text-main text-opacity-60 font-mono text-sm">
    {link}
  </div>
</a>
