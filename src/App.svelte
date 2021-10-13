<script>
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

<h1>Hello, Svelte and Express!</h1>
