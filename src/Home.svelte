<script>
  import { authStore } from "./lib/auth.js";

  const { email, name, userName, token } = $authStore;
</script>

<h2>Home</h2>

{name}
{userName}
{email}
{token}

<style>
</style>
