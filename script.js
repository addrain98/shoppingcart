document.addEventListener('DOMContentLoaded', async function(){

    let product = await fetchProducts();

    console.log(typeof product, product);

    function renderProducts(productList) {
        const cardsContainer = document.getElementById("product-cards");
        
        for (let item of productList) {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
        
            card.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: $${item.price/100}</p>
                <p class="card-text">Quantity: ${item.quantity}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${item.id}">Add To Cart</button>
                </div>
            </div>
            `;
            cardsContainer.appendChild(card);
        }
        document.getElementById("product-cards").addEventListener("click", function(e) {
            if (e.target && e.target.classList.contains("add-to-cart-btn")) {
                const productId = parseInt(e.target.getAttribute("data-id"), 10);
                addToCart(productId);
            }
        });
        
    } 

    function addToCart(itemID){
        let selectedProduct = null;
        let cartItem = null;

        for (let i = 0; i < product.length; i++){
            if (product[i].id === itemID){
                selectedProduct = product[i];
                break;
            }
        }

        if (product) {
            let cartItem = null;
            for (let i = 0; i < shoppingCart.length; i++) {
                if (shoppingCart[i].id === itemID) {
                    cartItem = shoppingCart[i];
                    break
                }
            }
        }

        if (cartItem) {
            cartItem.quantity += 1;
        }

        else {
            shoppingCart.push({...selectedProduct, quantity: 1 });
        }
        updateDisplayCart(shoppingCart);
    }
    function calculateTotal(shoppingCart){
        let total = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            total += shoppingCart[i].price * shoppingCart[i].quantity;
        }
        return total;
    }

    function updateDisplayCart(shoppingCart) {
        const cartItemsContainer = document.getElementById('cartItems');
        cartItemsContainer.innerHTML = '';
        for (let i = 0; i < shoppingCart.length; i++) {
            let item = shoppingCart[i];
            const card = document.createElement('div');
            card.className = 'mb-3'; 

            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Price: ${item.price/100}</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Quantity</span>
                            <input type="number" class="form-control" value="${item.quantity}" data-id="${item.id}" />
                        </div>
                        <button class="btn btn-danger remove-item-btn" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(card);
            
            const removeButton = card.querySelector(".remove-item-btn");
            removeButton.addEventListener("click", function() {
                const itemId = parseInt(removeButton.getAttribute("data-id"), 10);
                deleteItem(shoppingCart, itemId);
                updateDisplayCart(shoppingCart);
                });

            const quantityInput = card.querySelector("input[type='number']");
            quantityInput.addEventListener("change", function() {
                const itemId = parseInt(quantityInput.getAttribute("data-id"), 10);
                const newQuantity = parseInt(quantityInput.value, 10);
                let item;
                for (let i = 0; i < shoppingCart.length; i++) {
                    if (shoppingCart[i].id === itemId) {
                        item = shoppingCart[i];
                        break;
                    }
                }
            
                if (item) {
                    updateItem(shoppingCart, itemId, item.name, newQuantity, item.price);
                    updateDisplayCart(shoppingCart);
                }
            });

        }
        
        const totalPrice = calculateTotal(shoppingCart);
        document.getElementById('total-price').textContent = (totalPrice.toFixed(2) / 100).toString();
        document.querySelector("#purchase-button").addEventListener('click', async function(){
            alert('Thank you for your purchase!')
            await savetoJSONBin(shoppingCart);
            shoppingCart.length = 0;
            updateDisplayCart(shoppingCart);
        })
    }

    renderProducts(product)       
    
})

