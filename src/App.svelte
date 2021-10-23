<script>
  import "./lib/style/reset.css";
  import "./lib/style/global.css";
  import { onMount } from "svelte";
  // import { Route } from "tinro";

  import Login from "./Login.svelte";
  import Home from "./Home.svelte";
  import { isVerified } from "./lib/verify.js";
  import { authStore } from "./lib/auth.js";

  onMount(async () => {
    // pre-auth user
    if ($authStore !== null) {
      const authResponse = await fetch(
        `http://localhost:3030/user/${$authStore.id}/auth`,
        {
          credentials: "include",
          headers: {
            Authorization: $authStore.token,
          },
        }
      );

      if (!authResponse.ok) {
        $isVerified = false;
      } else {
        const authData = await authResponse.json();
      }
    }
  });
</script>

<header>
  <h1 id="site-head">mement.to</h1>
</header>

<main>
  {#if $isVerified === true}
    <Home />
  {:else}
    <Login />
  {/if}
</main>

<style>
  #site-head {
    font-size: var(--size-900);
    font-weight: 900;
  }
</style>
