document.addEventListener('DOMContentLoaded', function(){

    function addToCart(itemID){
        let product = null;

        for (let i = 0; i < product.length; i++){
            if (product[i].id === itemID){
                product = product[i];
                break;
            }
        }

        if (product) {
            let cartItem = null;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === itemID) {
                    cartItem = cart[i];
                    break
                }
            }
        }

        if (cartItem) {
            cartItem.quantity += 1;
        }

        else {
            cart.push({...product, quantity: 1 })
        }

        
    }

    function updateDisplayCart() {
        const cartContainer = document.getElementById("purchase-cart");
        cartContainer.innerhtml = '';
        for (let item of cart) {
            const listItem = document.createElement('li');
            
            console.log(`Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`)
        }
    }
    
    function renderProducts(items) {
        const cardsContainer = document.getElementById("product-cards");
        
        for (let item of items) {
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4");
        
            card.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: $${item.price/100}</p>
                <p class="card-text">Quantity: ${item.quantity}</p>
                <button id = "addItem" class="btn btn-primary">Add To Cart</a>
                </div>
            </div>
            `;
            container.appendChild(card);
        }
        

    }    
    
})