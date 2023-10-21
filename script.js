document.addEventListener('DOMContentLoaded', function(){

    const addItemButton = document.querySelector("#addItem");
    addItemButton.addEventListener('click',function() {
        const itemNameInput = item.name;
        const itemQuantityInput = item.quantity;
        const itemPriceInput = item.price;
        const itemTotalPriceInput = item.total;
    })
    
    function renderItems(shoppingCart) {
        const container = document.getElementById("product-cards");
        
        for (let item of shoppingCart) {
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