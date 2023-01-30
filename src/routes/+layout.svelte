<script lang='ts'>
    import "../app.css";

    import { page } from "$app/stores";
    import Terminal from "$lib/components/Terminal.svelte";
    import { userInterfaceData } from "$lib/interfaceStore";
    import { gameData } from "$lib/gameStore";
    import GameCompleted from "$lib/components/GameCompleted.svelte";

    interface Route {
        name: string
        path: string
        isActive: boolean
    }

    let routes: Route[] = [
        {name: 'Game [1]', path: '/game', isActive: false},
        {name: 'Prompt Wiki [2]', path: '/wiki', isActive: false},
        {name: 'Account [3]', path: '/account', isActive: false},
    ]

    let totalHeight: number
    let headerHeight: number
    let terminalHeight: number
    let contentHeight: number

    let promptWords: string[]
    let uniquePromptWords: string[]

    $: {
        if ($gameData !== null) {
            promptWords = $gameData.prompt.toLowerCase().split(' ')
            uniquePromptWords = [... new Set(promptWords)]
        }
    }

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

    <div bind:clientHeight={headerHeight} class="mb-auto" style="width: {$userInterfaceData.terminalOrientation === 'horizontal' ? '100vw' : '50%'};">
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
        <Terminal />
    </div>

    <!-- {#if $gameData !== null }
    {#if uniquePromptWords.length === $gameData.correctGuesses.length}
        <GameCompleted />
    {/if}
    {/if} -->
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>