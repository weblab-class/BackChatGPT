<script lang='ts'>
    import "../app.css";

    import { page } from "$app/stores";
    import Terminal from "$lib/components/Terminal.svelte";
    import { userInterfaceData } from "$lib/interfaceStore";
    import { gameData, prompt } from "$lib/gameStore";
    import GameCompleted from "$lib/components/GameCompleted.svelte";
    import { userData, type UserData } from "$lib/userStore";

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

    async function retrieveUserData(userId: string): Promise<UserData | null> {
        if (typeof window !== 'undefined') {
            let data = await fetch(`/api/user/${userId}`)
            let json = await data.json()

            if (json) {
                console.log("Returned JSON", json)
                return {
                    user: {
                        name: json.user.name,
                        email: json.user.email,
                        id: json.user.id
                    },
                    gamesPlayed: json.gamesPlayed,
                    completedGames: json.completedGames,
                    loginMethod: json.loginMethod,
                    fastestCompletion: json.fastestCompletion
                }
            }
        }

        return null
    }

    $: {
        if (($page.data.session?.user?.id) && (typeof window !== 'undefined')) {
            retrieveUserData($page.data.session?.user?.id).then((value) => {
                $userData = value
            })
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

    {#if $gameData !== null && $gameData !== 'loading' && $prompt !== null}
    {#if ($prompt.uniqueWords.length === $gameData.correctGuesses.length) && ($gameData.timeCompleted !== null) && ($gameData.timeCompleted !== undefined)}
        <GameCompleted />
    {/if}
    {/if}
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.zinc.800);
    }
</style>