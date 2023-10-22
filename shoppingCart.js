const BASE_JSON_BIN_URL1 = "https://api.jsonbin.io/v3";
const BIN_ID1 = "6534bf6254105e766fc575dc";
const BASE_JSON_BIN_URL2 = "https://api.jsonbin.io/v3";
const BIN_ID2 = "65351ecc0574da7622bc2c3b";
const MASTER_KEY = "$2a$10$6Fs0GKpcqE71Y2wRNZL1PuFWjB/jpVg35Fyn6v3.1dEvBvqH9P9nu"
let shoppingCart = [];

  function addItem(shoppingCart, itemName, quantityOfitem, price) {

    let newItem = {
      id: Math.floor(Math.random() * 100 + 1),
      name: itemName,
      quantity: quantityOfitem,
      price: price,
      total: price * quantityOfitem,
    };
    shoppingCart.push(newItem);

  }

  function updateItem(shoppingCart, itemId, newItemName, newQuantity, newPrice) {
    let item;
    for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].id === itemId) {
            item = shoppingCart[i];
            break;
        }
    }
    if (item) {
        item.name = newItemName;
        item.quantity = newQuantity;
        item.price = newPrice;
        item.total = newPrice * newQuantity; // Fixed the calculation
        console.log("Item updated successfully!");
    } else {
        console.log("Item not found.");
    }
}

  function deleteItem(shoppingCart, id) {
    let indexToDelete = null;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].id == id) {
        indexToDelete = i;
        break;
      }
    }
    if (indexToDelete !== null) {
      shoppingCart.splice(indexToDelete, 1);
    }
    else {
      console.log("Item not found")
    }
  }

  function displayCart(shoppingCart) {
    if (shoppingCart.length === 0) {
      console.log("There is no items in the cart.");
      return;
    }
    console.log("===== Items =====");
    for (let item of shoppingCart) {
      console.log(`ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}, Total: ${item.total}`);
    }
  }


  async function fetchProducts() {
    const response = await axios.get(BASE_JSON_BIN_URL1 + "/b/" + BIN_ID1 + "/latest");
    return response.data.record;
  }

  async function savetoJSONBin(shoppingCart) {
    const response2 = await axios.put(`${BASE_JSON_BIN_URL2}/b/${BIN_ID2}`, shoppingCart, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    return response2.data
  }
  