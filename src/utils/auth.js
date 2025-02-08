// export const Base_Url = "https://localhost:3001";
import baseUrl from "./api"

export const register = ( name, avatar, email, password ) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
    //   Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
};

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  };

  export const checkTokenValid = (token) => {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
  };