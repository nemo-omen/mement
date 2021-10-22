import { writable } from "svelte/store";

export const authStore = writable(null);


export const logout = () => authStore.set(null);

export const login = async (email, password) => {
  const response = await fetch('http://localhost:3030/login', {
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

  if(!response.ok) {
    return {ok: false, message: data.message};
  } else {
    authStore.set(data.data);
    return {ok: true, message: data.data};
  }
} ;