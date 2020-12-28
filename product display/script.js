const carousalSlider = document.querySelector(".carousel-slider");
const carousalImages = document.querySelectorAll(".carousel-slider img");
const bubbleBtns = document.querySelectorAll(".btn");
const favoriteIcon = document.querySelectorAll(".fa-heart");
const addToCart = document.querySelectorAll(".add-to-cart");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
let counter = 0;
const imageSize = carousalImages[0].clientWidth;

nextBtn.addEventListener('click', () => {
    if (counter >= carousalImages.length-1) {
        return;
    }
    bubbleBtns.forEach((btn,index) => {
        if(index === counter || (index==0 && counter==carousalImages.length-2)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    carousalSlider.style.transition = "0.8s ease-in-out";
    counter++;
    carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
});

prevBtn.addEventListener('click', () => {     
    carousalSlider.style.transition = "0.8s ease-in-out";
    counter--;
    bubbleBtns.forEach((btn,index) => {
        if(index === counter-1 || (counter==0 && index==bubbleBtns.length-1)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    if (counter <0) {
        counter=0; 
        return; 
    }
    carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
});

carousalSlider.addEventListener('transitionend', () => {
    if (carousalImages[counter].id === 'lastCopy') {
        carousalSlider.style.transition = 'none';
        counter = carousalImages.length - 2;
        carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
    }

    if (carousalImages[counter].id === 'firstCopy') {
        carousalSlider.style.transition = 'none';
        counter = 1;
        carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
    }
});

setInterval(() => {
    if (counter >= carousalImages.length-1) {
        return;
    }
    bubbleBtns.forEach((btn,index) => {
        if(index === counter || (index==0 && counter==carousalImages.length-2)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    carousalSlider.style.transition = "1.5s ease-in-out";
    counter++;
    carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
}, 3000);

    /* the data-item method
    bubbleBtns.forEach(btn => {
    btn.addEventListener('click', clickedBtn => {
        console.log(clickedBtn.dataset.index);
    });
});*/

bubbleBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        bubbleBtns.forEach(btn => {
            if(btn.classList.contains('active')) {
                btn.classList.remove('active');
            }
        });
        btn.classList.add('active');
        counter = index + 1;
        carousalSlider.style.transition = "0.8s ease-in-out";
        carousalSlider.style.transform = 'translateX(' + counter * -imageSize + 'px)';
    });
});

//to add image to favorite
favoriteIcon.forEach( icon => {
    icon.addEventListener('click', iconClicked => {
        if(iconClicked.target.style.opacity != 1) {
            iconClicked.target.style.opacity = 1;
        } else {
            iconClicked.target.style.opacity = 0.2;
        }
    });
});

if(localStorage.getItem("PRODUCT NAME") == null) {    
    localStorage.setItem("PRODUCT NAME", '[]');
    localStorage.setItem("PRODUCT PRICE", '[]');
    localStorage.setItem("PRODUCT THUMB", '[]');
}

addToCart.forEach( cartItem => {
    cartItem.addEventListener('click', ClickedCartItem => {    
        let productName = ClickedCartItem.target.parentElement.parentElement.querySelector(".product-name").innerText;
        let productPrice = ClickedCartItem.target.parentElement.parentElement.querySelector(".cart-buttons .priceOfItem").innerText;
        let productThumb = ClickedCartItem.target.parentElement.parentElement.parentElement.querySelector(".product-thumb").src;

        var ExistingProductName = JSON.parse(localStorage.getItem("PRODUCT NAME"));
        ExistingProductName.push(productName);
        localStorage.setItem("PRODUCT NAME", JSON.stringify(ExistingProductName));

        var ExistingProductPrice = JSON.parse(localStorage.getItem("PRODUCT PRICE"));
        ExistingProductPrice.push(productPrice);
        localStorage.setItem("PRODUCT PRICE", JSON.stringify(ExistingProductPrice));

        var ExistingProductThumb = JSON.parse(localStorage.getItem("PRODUCT THUMB"));
        ExistingProductThumb.push(productThumb);
        localStorage.setItem("PRODUCT THUMB", JSON.stringify(ExistingProductThumb));
    }, {once : true});
});

