const baseUrl = "http://localhost:3001";

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(console.error);
}

//   function getItems() {
//     return fetch(`${baseUrl}/items`).then((res) => {handleServerResponse(res)});
//   }
// ---------------------------------------------------------------------
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(console.error);
  });
}
//------------------
function addItem({ name, imageUrl, weather }) {
  console.log("API", name);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      weather: weather,
      imageUrl: imageUrl,
      //does the server add a unique _id automatically?
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(console.error);
  });
}

function deleteItem(itemID) {
  //pass in itemID ??
  return fetch(`${baseUrl}/items/${itemID}`, {
    // items/itemID, does this go to the right item?
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(console.error);
  });
}

export { getItems, addItem, deleteItem };
