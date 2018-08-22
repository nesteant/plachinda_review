function IceCream(price, description) {
    this.price = price;
    this.description = description;
    this.bigElement = IceCream.hits[IceCream.iterator];
    this.index = IceCream.iterator++;
    this.inCart = false;
    this.quantity = 0;
    this.sumForOneType = 0;
    this.pictureUrl = 'url("img/small' + (this.index + 1) + '.png")';
}

IceCream.cart = document.querySelector('.cart-opened');
IceCream.hits = document.querySelectorAll('.hit');
IceCream.total = document.querySelector('.total__price_number');
IceCream.numberInCart = 0;
IceCream.iterator = 0;
IceCream.finalPrice = 0;

IceCream.prototype.addToCart = function() {
    if(this.inCart) {
        this.updateCart();
    } else {
        var iceInCart = document.createElement('div');
        iceInCart.className = "cart-opened__item";
        iceInCart.innerHTML = `
            <span class="x pointer"></span>
            <span class="ice-picture"></span>
            <span class="ice-description">${this.description}</span>
            <div class="calculations">
                <span class="ice-amount">1</span>
                <span>кг x ${this.price} руб.</span>
            </div>
            <div class="sum-for-one">
                <span class="ice-price">${this.price}руб.</span>
            </div>
        `;
        iceInCart.classList.add('i' + this.index);
        var self = this;
        iceInCart.querySelector('.x').addEventListener('click', function removeIce() {
            self.removeFromCart(removeIce);
        })
        iceInCart.querySelector('.ice-picture').style.backgroundImage = this.pictureUrl;
        iceInCart.querySelector('.ice-picture').classList.add('service__cart_full');
        IceCream.cart.insertBefore(iceInCart, IceCream.cart.firstChild);
        IceCream.total.innerHTML = (IceCream.finalPrice += this.price);
        this.quantity = 1;
        this.sumForOneType = this.price;
        this.inCart = true;
        cartButton.innerHTML = (IceCream.numberInCart += 1) + '<span>&nbsp;товара</span>';
        cartButton.style.backgroundImage = 'url("img/full-cart.png")';
        cartButton.removeEventListener("mouseover", cartOnMouse);
        cartButton.removeEventListener("mouseout", cartFromMouse);
        cartButton.classList.add("btn-cart-full");
        toggle();
        toggle();
    }
}

IceCream.prototype.updateCart = function() {
    var itemToUpdate = IceCream.cart.querySelector('.i' + this.index);
    itemToUpdate.querySelector('.ice-amount').innerText = (this.quantity += 1);
    itemToUpdate.querySelector('.ice-price').innerHTML = (this.sumForOneType += this.price);
    IceCream.total.innerHTML = (IceCream.finalPrice += this.price);
}

IceCream.prototype.addOnClick = function() {
    var self = this;
    this.bigElement.addEventListener("click", function() {
        self.addToCart();
    });
}

IceCream.prototype.removeFromCart = function(removeIce) {
    var itemToRemove = IceCream.cart.querySelector('.i' + this.index);
    IceCream.total.innerHTML = (IceCream.finalPrice -= this.sumForOneType);
    itemToRemove.removeEventListener("click", removeIce);
    itemToRemove.parentNode.removeChild(itemToRemove);
    this.inCart = false;
    if(IceCream.numberInCart -= 1) {
        cartButton.innerHTML = (IceCream.numberInCart) + '<span>&nbsp;товара</span>';
    } else {
        cartButton.innerHTML = 'Пусто';
        IceCream.cart.setAttribute("style", "display: none;");
        cartButton.style.backgroundImage = 'url("img/cart.png")';
        cartButton.addEventListener("mouseover", cartOnMouse);
        cartButton.addEventListener("mouseout", cartFromMouse);
        cartButton.classList.add("btn-cart-stb");
        cartButton.classList.remove("btn-cart-full");
    }
}

function cartOnMouse() {
    cartButton.style.backgroundImage = 'url("img/cart-black.png")';
    cartButton.classList.add("btn-cart-active");
    cartButton.classList.remove("btn-cart-stb");
}

function cartFromMouse() {
    cartButton.style.backgroundImage = 'url("img/cart.png")';
    cartButton.classList.add("btn-cart-stb");
    cartButton.classList.remove("btn-cart-active");
}

var ice1 = new IceCream(310, "Сливочное с апельсиновым джемом и цитрусовой стружкой");
var ice2 = new IceCream(380, "Сливочно-кофейное с кусочками шоколада");
var ice3 = new IceCream(355, "Сливочно-клубничное с присыпкой из белого шоколада");
var ice4 = new IceCream(415, "Сливочное крем-брюле с карамельной подливкой");

var icecreams = [ice1, ice2, ice3, ice4];

icecreams.forEach(function(ice) { 
    ice.addOnClick();
});

var cartButton = document.querySelector('.service__cart');
cartButton.addEventListener("click", function() {
    toggle();
});

cartButton.addEventListener("mouseover", cartOnMouse);
cartButton.addEventListener("mouseout", cartFromMouse);
cartButton.style.backgroundImage = 'url("img/cart.png")';


function toggle() {
    var cartDisplayProperty = window.getComputedStyle(IceCream.cart, null).getPropertyValue("display");
    if (cartDisplayProperty == "block") {
        IceCream.cart.setAttribute("style", "display: none;");
        if(IceCream.numberInCart) {
            cartButton.style.backgroundImage = 'url("img/full-cart.png")';
            cartButton.classList.add("btn-cart-full");
        } else {
            cartButton.style.backgroundImage = 'url("img/cart-black.png")';
            cartButton.addEventListener("mouseover", cartOnMouse);
            cartButton.addEventListener("mouseout", cartFromMouse);
        }
        

    } else if (cartDisplayProperty == "none") {
        IceCream.cart.setAttribute("style", "display: block;");
        if(IceCream.numberInCart) {
            cartButton.style.backgroundImage = 'url("img/full-cart.png")';
        } else {
            cartButton.style.backgroundImage = 'url("img/cart-black.png")';
        }
        cartButton.removeEventListener("mouseover", cartOnMouse);
        cartButton.removeEventListener("mouseout", cartFromMouse);
        cartButton.classList.add("btn-cart-active");
        cartButton.classList.remove("btn-cart-stb");
        cartButton.classList.remove("btn-cart-full");
        
    }
}

var orderButton = document.querySelector('.btn__order');

orderButton.addEventListener("click", function() {
    console.log("it's only " + IceCream.finalPrice + " руб.");
});

