<script>
  import "./lib/style/reset.css";
  import "./lib/style/global.css";
  // import { Route } from "tinro";

  import Login from "./Login.svelte";
  import Home from "./Home.svelte";

  import { authStore } from "./lib/auth.js";
</script>

<header>
  <h1 id="site-head">mement.to</h1>
</header>

<main>
  {#if $authStore !== null}
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
