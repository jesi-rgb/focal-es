<script>
  // @ts-nocheck

  import { Link } from "phosphor-svelte";

  export let title;
  export let link;
</script>

<a href={link}>
  <div class="font-xl text-main font-bold flex flex-row items-center">
    <span>
      <Link class="mr-3" weight="duotone" />
    </span>

    {title}
  </div>
  <div class="text-accent-darker">{link}</div>
</a>
