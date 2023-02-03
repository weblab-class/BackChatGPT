<script>
  import { page } from '$app/stores';
</script>

<div class='flex flex-col font-mono text-white w-full justify-center items-center text-center' style="padding-top: 64px;">
<h1 class="text-2xl">{$page.status}</h1>
<p class='text-lg'>{$page.error !== null ? $page.error.message : 'Unknown Error'}</p>
</div>