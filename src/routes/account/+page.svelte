<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
</script>

<h1 class="text-white font-mono text-lg pl-8 pt-8 pb-4">Account</h1>

<p class="text-white font-mono text-base pl-8">
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <span
          style="background-image: url('{$page.data.session.user.image}')"
          class="avatar"
        />
      {/if}

      <p>
      <span class="signedInText">
        <small>Signed in as</small>
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
      </span>
      </p>

      <button on:click={() => signOut()} class="button text-red-400">Sign out</button>

    {:else}

      <p>
        <span class="notSignedInText">You are not signed in</span>
      </p>
      <button on:click={() => signIn("google")} class='text-sky-300'>Sign In with Google</button>
      
    {/if}
  </p>