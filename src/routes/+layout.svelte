<script lang='ts'>
    import "../app.css";

    import { page } from "$app/stores";
    import Terminal from "$lib/components/Terminal.svelte";
    import Page from "./+page.svelte";

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

    let totalHeight: number
    let headerHeight: number
    let terminalHeight: number
    let contentHeight: number

    $: {
        let remainingHeight = totalHeight - headerHeight - terminalHeight

        if (remainingHeight > 0) {
            contentHeight = remainingHeight
        } else {
            contentHeight = 0
        }
    }

    $: {
        for (const index in routes) {
            if ($page.route.id?.startsWith(routes[index].path)) {
                routes[index].isActive = true
            } else {
                routes[index].isActive = false
            }
        }
    }
</script>

<div bind:clientHeight={totalHeight} class="flex flex-col h-screen w-screen overflow-clip">

    <div bind:clientHeight={headerHeight} class="mb-auto" style="width: {orientation === 'horizontal' ? '100vw' : '50%'};">
        <div class="flex text-white font-mono items-center mt-8">
            <h1 class="text-2xl pl-8 pr-8">BackChatGPT</h1>
            {#each routes as route}
                <a class="text-md pr-6 hover:opacity-100 hover:underline hover:underline-offset-8" style="opacity: {route.isActive ? 1.0 : 0.4};" href={route.path}>{route.name}</a>
            {/each}
        </div>
    </div>


    <div style="height: {contentHeight}px;" class="overflow-auto">
        <slot />
    </div>

    <div bind:clientHeight={terminalHeight} >
        <Terminal bind:orientation={orientation}/>
    </div>
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>