import { Base_Url } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function getItems() {
  return fetch(`${Base_Url}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather, token }) {
  return fetch(`${Base_Url}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
    }),
  }).then(checkResponse);
}

function deleteItem(itemId, token) {
  return fetch(`${Base_Url}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(itemId, token) {
  return fetch(`${Base_Url}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(itemId, token) {
  return fetch(`${Base_Url}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function editCurrentUser({ name, avatar }, token) {
  return fetch(`${Base_Url}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newName: name, newAvatar: avatar }),
  }).then(checkResponse);
}

export {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  editCurrentUser,
  checkResponse,
};
