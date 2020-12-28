const cartContainer = document.querySelector(".cart-container");
const cartItem = document.querySelector(".cart-item");
const cartTotal = document.querySelector(".total-amount");
let totalAmount = 0;
let itemNameInLocal = JSON.parse(localStorage.getItem("PRODUCT NAME"));
let itemPriceInLocal = JSON.parse(localStorage.getItem("PRODUCT PRICE"));
let itemThumbInLocal = JSON.parse(localStorage.getItem("PRODUCT THUMB"));

for(var i=0; i<itemNameInLocal.length; i++) {

    if(localStorage.getItem("PRODUCT NAME") != null ) {

        let cartItemEach = document.createElement("div");
        cartItemEach.classList.add("cart-item-each");
        
        let productThumb = document.createElement("div");
        productThumb.classList.add("product-thumb");
        let productThumbImage = document.createElement("img");
        productThumbImage.src = itemThumbInLocal[i];
        productThumb.appendChild(productThumbImage);
        cartItemEach.appendChild(productThumb);
        
        let cartProductInfo = document.createElement("div");
        cartProductInfo.classList.add("cart-product-info");
        
        let ProductNameHeader = document.createElement("header");
        let ProductName = document.createElement("h4");
        ProductName.innerText = itemNameInLocal[i];
        ProductNameHeader.appendChild(ProductName);
        cartProductInfo.appendChild(ProductNameHeader);

        let quantity = document.createElement("div");
        quantity.classList.add("quantity");
        let quantityDiv = document.createElement("div");
        quantityDiv.innerText = "Qty: ";
        let quantityInput = document.createElement("input");
        quantityInput.classList.add("quantity-number");
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("value", "1");
        quantityDiv.appendChild(quantityInput);
        quantity.appendChild(quantityDiv);
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        quantity.appendChild(deleteButton);
        cartProductInfo.appendChild(quantity);

        cartItemEach.appendChild(cartProductInfo);

        let productPrice = document.createElement("div");
        productPrice.classList.add("product-price");
        productPrice.innerText = itemPriceInLocal[i];
        cartItemEach.appendChild(productPrice);

        cartItem.appendChild(cartItemEach);
    }
}

document.querySelectorAll(".cart-item-each").forEach( cartItems => {
    let quantityEach = cartItems.querySelector("input").value;
    let priceEach = parseFloat(cartItems.querySelector(".product-price").innerText.replace("$ ", ""));
    totalAmount += quantityEach * priceEach;
});
cartTotal.innerText = "$ " + totalAmount;

document.querySelectorAll(".delete-button").forEach( button => {
    button.addEventListener('click', clickedButton => {
        var targetName = clickedButton.target.parentElement.parentElement.querySelector("h4").innerText;
        for(var i=0; i<itemNameInLocal.length; i++) {
            if(targetName === itemNameInLocal[i]) {
                itemNameInLocal.splice(i, 1);
                itemPriceInLocal.splice(i, 1);
                itemThumbInLocal.splice(i, 1);
                console.log(itemNameInLocal);
                localStorage.setItem("PRODUCT NAME", JSON.stringify(itemNameInLocal));
                localStorage.setItem("PRODUCT PRICE", JSON.stringify(itemPriceInLocal));
                localStorage.setItem("PRODUCT THUMB", JSON.stringify(itemThumbInLocal));
                clickedButton.target.parentElement.parentElement.parentElement.remove();
                location.reload();
            }
        }               
    });
});

document.querySelector("#checkout-btn").addEventListener('click', checkOut => {
        itemNameInLocal.splice(0, itemNameInLocal.length);
        itemPriceInLocal.splice(0, itemPriceInLocal.length);
        itemThumbInLocal.splice(0, itemThumbInLocal.length);
        localStorage.setItem("PRODUCT NAME", JSON.stringify(itemNameInLocal));
        localStorage.setItem("PRODUCT PRICE", JSON.stringify(itemPriceInLocal));
        localStorage.setItem("PRODUCT THUMB", JSON.stringify(itemThumbInLocal));
        document.querySelectorAll(".cart-item-each").forEach( item => {
            item.remove();
        });
        alert("Your purchase is complete.Thank You");
        location.reload();
});