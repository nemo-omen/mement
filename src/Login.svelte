<script>
  import { authStore } from "./lib/auth.js";
  let email;
  let password;
  let loginMessage = "";

  async function handleSubmit() {
    const response = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      loginMessage = data.message;
    } else {
      $authStore = data.data;
    }
  }
</script>

<div class="login-section">
  <h2>Login</h2>
  <form action="" on:submit|preventDefault="{handleSubmit}" class="flow">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" bind:value="{email}" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        minlength="8"
        required
        bind:value="{password}" />
    </div>
    <input type="submit" value="Log In" />
  </form>
</div>

<style>
</style>
