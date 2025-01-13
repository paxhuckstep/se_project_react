const baseUrl = "http://localhost:3001";

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
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
function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: item.name,
      imageUrl: item.imageUrl,
      //does the server add a unique _id automatically?
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(console.error);
  });
}

function deleteItem(item) {
  //pass in itemID ??
  return fetch(`${baseUrl}/items`, {
    // items/itemID, does this go to the right item?
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(console.error);
  });
}

export { getItems, addItem, deleteItem };
