<script>
  import "./lib/style/global.css";
  import { Route } from "tinro";

  import Login from "./Login.svelte";
  import Home from "./Home.svelte";

  import { authStore } from "./lib/auth.js";

  let authed = false;

  if ($authStore) {
    authed = true;
  } else {
    authed = false;
  }

  (async function () {
    const response = await fetch("http://localhost:3030/api");
    if (!response.ok) {
      console.error(
        "There was a problem with the response: ",
        response.statusText
      );
    }
    const data = await response.json();
    console.log(data);
  })();
</script>

<header>
  <h1 id="site-head">mement</h1>
</header>

<main>
  {#if authed}
    <!-- <Route path="/"> -->
    <Home />
    <!-- </Route> -->
  {:else}
    <!-- <Route path="/login"> -->
    <Login />
    <!-- </Route> -->
  {/if}
</main>

<style>
  #site-head {
    font-size: var(--size-900);
    font-weight: 900;
  }
</style>
