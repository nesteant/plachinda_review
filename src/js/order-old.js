var cart = document.getElementsByClassName("service__cart")[0];
var cartOpened = document.getElementsByClassName("cart-opened")[0];
var iceCreams = document.getElementsByClassName("hit");
var totalPriceElement = document.getElementsByClassName("total__price_number")[0];
// var cartItems = document.getElementsByClassName("x");
var totalPrice = 0;


for (let i = 0; i < 4; i++) {
    iceCreams[i].addEventListener("click", addToCart);
}

// for (let i = 0; i < cartItems.length; i++) {
//     cartItems[i].addEventListener("click", removeFromCart);
// }

var items = [];

cart.addEventListener("click", showCart);

function showCart() {
    if (items.length === 0) return;
    var cartsDisplayProperty = window.getComputedStyle(cartOpened, null).getPropertyValue("display");
    if (cartsDisplayProperty == "block") {
        cartOpened.setAttribute("style", "display: none;");
    } else if (cartsDisplayProperty == "none") {
        cartOpened.setAttribute("style", "display: block;");
    }
}

function addToCart() {
    var parent = this.parentNode;
    var index = Array.prototype.indexOf.call(parent.children, this);
    var picture = 'url("img/small' + (index + 1) + '.png")';
    var priceForOne = Number(this.children[2].firstElementChild.innerText);
    var iceObject = {
        picture: picture,
        kgs: 1,
        sumForOne: priceForOne,
        description: this.lastElementChild.innerText,
        price: priceForOne
    }

    totalPrice += iceObject.price;
    totalPriceElement.innerText = totalPrice;

    for (var i = 0; i < items.length; i++) {
        if (items[i].description === iceObject.description) {
            items[i].kgs++;
            items[i].sumForOne += iceObject.sumForOne;
            cartItems = document.getElementsByClassName("cart-opened__item");
            cartItems[i].children[3].children[0].innerText = items[i].kgs;
            cartItems[i].children[4].children[0].innerText = items[i].sumForOne;
            return;
        }
    }
    var div = document.createElement('div');
    div.className = "cart-opened__item";
    div.innerHTML = `
        <span class="x"></span>
        <span class="ice-picture"></span>
        <span class="ice-description">${iceObject.description}</span>
        <div class="calculations">
            <span class="ice-amount">1</span>
            <span>кг х&nbsp;</span>
            <span>${iceObject.price}</span>
            <span></span>руб.</span>
        </div>
        <div class="sum-for-one">
            <span class="ice-price">${iceObject.price}</span>
            <span>руб.</span>
        </div>
    `;

    div.children[1].style.backgroundImage = iceObject.picture;
    div.children[0].addEventListener("click", removeFromCart);
    cartOpened.insertBefore(div, cartOpened.firstChild);
    items.push(iceObject);
}

function removeFromCart() {
    this.removeEventListener("click", removeFromCart);
    var parent = this.parentNode;
    var index = Array.prototype.indexOf.call(parent.parentNode.children, parent);
    totalPrice -= parent.children[4].children[0].innerText;
    totalPriceElement.innerText = totalPrice;
    parent.parentNode.removeChild(parent);
    items.splice(index, 1);
}

// background-image: url("../img/small1.png");