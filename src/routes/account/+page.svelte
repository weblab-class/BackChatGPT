<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
    import { userData } from "$lib/userStore";
    import { formatTimeElapsed } from "$lib/components/formatTimeElapsed";

    function username(name: string | null | undefined): string {
        if (name !== undefined && name !== null) {
            let username: string = name.toLowerCase()
            username = username.replaceAll(" ", "-")

            return username
        }

        return "guest-user-1234"
    }

    async function signInUser() {
        console.log("Sign in User")

        let res = await signIn('google')

        console.log("Response: ", res)

        if (res) {
          let json = await res.json()
          console.log(JSON.stringify(json))
        }
    }
</script>



<p class="text-white font-mono text-base pl-8">
    {#if $userData}
      <div class="flex flex-col justify-center items-center mt-16">
        <p class="text-3xl text-center my-2">
          <span class="notSignedInText">Welcome &lt{username($userData.user.name)}&gt</span>
        </p>
        
        <div class="flex gap-8 my-8">
          <div class="flex flex-col bg-zinc-700 w-36 h-44 rounded-2xl justify-center items-center p-6 text-center">
            <p class='text-4xl font-bold pb-2 whitespace-nowrap'>{$userData?.gamesPlayed === undefined ? 0 : $userData.gamesPlayed.length}</p>
            <p>Games Started</p>
          </div>
          <div class="flex flex-col bg-zinc-700 w-36 h-44 rounded-2xl justify-center items-center p-6 text-center">
            <p class='text-4xl font-bold pb-2 whitespace-nowrap'>{$userData?.completedGames === undefined ? 0 : $userData.completedGames.length}</p>
            <p>Games Completed</p>
          </div>
          <div class="flex flex-col bg-zinc-700 w-36 h-44 rounded-2xl justify-center items-center p-6 text-center">
            <p class='text-4xl font-bold pb-2 whitespace-nowrap'>{($userData?.fastestCompletion === undefined) || ($userData?.fastestCompletion === null) ? 'N/A' : formatTimeElapsed($userData?.fastestCompletion)}</p>
            <p>Fastest Completion</p>
          </div>
        </div>

        <button on:click={() => signOut()} class="bg-rose-600 shadow-lg shadow-rose-600/40 text-white font-mono py-2 px-8 text-md rounded-lg hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/50">Log Out</button>
    </div>

    {:else}
      <div class="flex flex-col justify-center items-center mt-16">
        <p class="text-3xl text-center my-2">
          <span class="notSignedInText">Login to Save Data</span>
        </p>
        <!-- <button on:click={() => signIn("google")} class='text-sky-300 hover:text-sky-600 hover:underline my-4 text-lg'>Log In with Google</button> -->
        <button on:click={signInUser} class="bg-blue-500 shadow-lg shadow-blue-500/40 text-white py-2 px-8 font-semibold text-lg rounded-lg my-8 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50">Login With Google</button>

        <p class="w-full lg:w-2/3 text-sm leading-8 opacity-70 text-center pt-2">
          <span>Pro Tip: </span>
          Try typing 
          <kbd class="text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-700">login</kbd>
          into the terminal below instead of clicking the link above.
      </p>
    </div>
      
    {/if}
  </p>