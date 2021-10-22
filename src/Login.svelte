<script>
  let email;
  let password;
  async function sendLoginData() {}
</script>

<h2>Login</h2>
<form action="" on:submit|preventDefault="{sendLoginData}" class="flow">
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

<style>
</style>
