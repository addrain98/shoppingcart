const prompt = require('prompt-sync')();

const shoppingCart = [];

function showCartMenu() {
  while (true) {
    console.log("===== Shopping Cart Menu =====");
    console.log("1. View Cart");
    console.log("2. Add item to cart");
    console.log("3. Update item in cart");
    console.log("4. Delete item in cart");
    console.log("5. Exit cart");
    let choice = parseInt(prompt("Enter your choice: "));


    if (choice == 1) {
      displayCart(shoppingCart);
    }
    else if (choice == 2) {
      let itemName = prompt('Enter item name:');
      let quantityOfitem = parseInt(prompt('Enter item quantity:'));
      let price = parseInt(prompt('Enter price:')); 
      addItem(shoppingCart, itemName, quantityOfitem, price);
      console.log('Item added successfully');
    }
    else if (choice == 3) {
      let id = parseInt(prompt('Enter the ID of the item required for update:'))
      let newItemName = prompt('Enter the new name for the item:')
      let newQuantity = parseInt(prompt('Enter the new quantity:'))
      let newPrice = parseInt(prompt('Enter the new price:'));
      updateItem(shoppingCart, id, newItemName, newQuantity, newPrice); 
    }

    else if (choice == 4) {
      let id = parseInt(prompt("Enter the  item ID to delete: "))
      deleteItem(shoppingCart, id)
      console.log("Item deleted successfully!")
    }

    else if (choice == 5) {
      console.log("Exiting the shopping cart...");
      break;
    }

    else {
      console.log("Invalid choice. Please select a number between 1 and 5.")
    }
  }
}

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

function updateItem(shoppingCart, id, newItemName, newQuantity, newPrice) {
  let item = null;
  for (let i of shoppingCart) {
    if (i.id == id) {
      item = i;
    }
  }
  if (item) {
    item.name = newItemName;
    item.quantity = newQuantity;
    item.price = newPrice
    item.total = newPrice * newQuantity
    console.log("Item updated successfully!")
  }
  else {
    console.log("Item not found.")
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
    console.log(`ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`);
  }
}

showCartMenu();