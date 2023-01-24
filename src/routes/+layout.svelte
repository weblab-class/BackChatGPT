<script>
    import "../app.css";
</script>

<div class="flex text-white font-mono items-center mt-8">
    <a class="text-2xl pl-8 pr-8" href="/">BackChatGPT</a>
    <a class="text-md opacity-40 pr-6" href="/output">GPT Output [1]</a>
    <a class="text-md opacity-40 pr-6" href="/progress">Progress [2]</a>
    <a class="text-md opacity-40 pr-6" href="/wiki">Prompt Wiki [3]</a>
    <a class="text-md opacity-40 pr-6" href="/account">Account [4]</a>
</div>

<slot />

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>