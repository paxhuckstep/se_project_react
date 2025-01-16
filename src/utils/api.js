const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

//return res.ok ? res.json() : Promise.reject(console.error);

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return checkResponse(res);
  });
}

function addItem({ name, imageUrl, weather }) {
  console.log("API", name);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
}

function deleteItem(itemID) {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
  }).then((res) => {
    return checkResponse(res);
  });
}

export { getItems, addItem, deleteItem };
