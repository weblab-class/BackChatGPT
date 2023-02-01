<script lang="ts">
    import { createGame } from "$lib/components/createGame";
    import { gameData } from "$lib/gameStore";
    import { formatTimeElapsed } from "./formatTimeElapsed";
    import { userData } from "$lib/userStore";
    import { get } from "svelte/store";

    function clearGame() {
        $gameData = null
    }

    let isRecord = false

    function calculateTime(): string | null {
        if ($gameData === null || $gameData === 'loading' || $gameData.timeCompleted === undefined || $gameData.timeCompleted === null) {
            return null
        }

        const timeElapsed = $gameData.timeCompleted.getTime() - $gameData.timeStarted.getTime()

        const currentUserData = get(userData)

        if (currentUserData !== null) {
            if (currentUserData.completedGames === undefined || currentUserData.completedGames === null) {
                currentUserData.completedGames = [$gameData.prompt]
            } else {
                currentUserData.completedGames = [...currentUserData.completedGames, $gameData.prompt]
            }

            if (currentUserData.fastestCompletion === undefined || currentUserData.fastestCompletion === null) {
                currentUserData.fastestCompletion = timeElapsed
            } else if (timeElapsed < currentUserData.fastestCompletion) {
                currentUserData.fastestCompletion = timeElapsed
            }
            
            userData.set(currentUserData)
        }

        return formatTimeElapsed(timeElapsed)
    }

</script>

<div class="flex w-screen h-screen absolute top-0 left-0 items-center justify-center">
    <div class="relative flex flex-col text-white font-mono p-8 h-full w-full md:h-max md:w-[768px] items-center justify-center text-center bg-zinc-900 backdrop-blur-2xl backdrop-brightness-150 bg-opacity-50 md:rounded-[64px] drop-shadow-2xl border-4 border-zinc-700">
        <button on:click={clearGame} class="absolute right-6 top-6 w-12 h-12 hover:backdrop-brightness-200 rounded-lg md:rounded-tr-[32px] flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        
        <h1 class="text-3xl pb-4">Congrats!</h1>

        <p>You successfully decoded the prompt in <span class='text-sky-300 font-bold'>{calculateTime()}</span>.</p>

        {#if $gameData !== null && $gameData !== 'loading'}
        <div class="wrapper m-8 p-4 font-mono bg-zinc-900 text-sm text-white rounded-lg ring-2 ring-zinc-700 whitespace-pre-wrap text-left">
            {$gameData.prompt}
        </div>
        {/if}

        <button on:click={createGame} class="bg-blue-500 shadow-lg shadow-blue-500/40 text-white py-2 px-8 font-semibold text-lg rounded-lg my-4 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50">New Game</button>
    </div>
</div>