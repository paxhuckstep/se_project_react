const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather, token }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
    }),
  }).then(checkResponse);
}

function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(checkResponse);
}



function editCurrentUser({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newName: name, newAvatar: avatar }),
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem, editCurrentUser };
