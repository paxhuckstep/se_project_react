const baseUrl = "http://localhost:3001";

function  handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Error: ${res.status}`);
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
            imageUrl: name.imageUrl,
        }),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(console.error);
      })
}


function deleteItem(item) {
    
}

export { getItems };
