<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  console.log(data);
</script>

<div class="p-8 text-white font-mono">
  <h1 class="text-lg">Prompt:</h1>

  <p class="whitespace-pre-wrap mt-2 p-2 px-4 bg-zinc-900 rounded-lg">{data.prompt}</p>

  <h1 class="text-lg mt-4">GPT Output:</h1>

  <p class=" whitespace-pre-wrap mt-2 p-2 px-4 bg-zinc-900 rounded-lg">{data.gptOutput}</p>
</div>



