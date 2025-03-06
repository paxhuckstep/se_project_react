import { checkResponse } from "./api";

const Base_Url = "http://localhost:3002";

export const register = (name, avatar, email, password) => {
  return fetch(`${Base_Url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${Base_Url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${Base_Url}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
