<script lang='ts'>
    import "../app.css";

    import { page } from "$app/stores";
    import Terminal from "$lib/components/Terminal.svelte";

    interface Route {
        name: string
        path: string
        isActive: boolean
    }

    let orientation: 'horizontal' | 'vertical' = 'horizontal'

    let routes: Route[] = [
        {name: 'GPT Output [1]', path: '/output', isActive: false},
        {name: 'Progress [2]', path: '/progress', isActive: false},
        {name: 'Prompt Wiki [3]', path: '/wiki', isActive: false},
        {name: 'Account [4]', path: '/account', isActive: false},
    ]

    $: {
        console.log($page)

        for (const index in routes) {
            if ($page.route.id?.startsWith(routes[index].path)) {
                routes[index].isActive = true
            } else {
                routes[index].isActive = false
            }
        }
    }
</script>

<div class="flex flex-col h-screen">

    <div class="h-screen" style="width: {orientation === 'horizontal' ? '100vw' : '50%'};">
        <div class="flex text-white font-mono items-center mt-8">
            <h1 class="text-2xl pl-8 pr-8">BackChatGPT</h1>
            {#each routes as route}
                <a class="text-md pr-6 hover:opacity-100 hover:underline hover:underline-offset-8" style="opacity: {route.isActive ? 1.0 : 0.4};" href={route.path}>{route.name}</a>
            {/each}
        </div>

    <slot />
    
    </div>

    {#if orientation === 'horizontal'}
        <div class="absolute bottom-0 left-0 right-0">
            <Terminal bind:orientation={orientation}/>
        </div>
    {:else}
        <div class="absolute bottom-0 left-1/2 top-0 w-1/2">
            <Terminal bind:orientation={orientation}/>
        </div>
    {/if}

    

</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>