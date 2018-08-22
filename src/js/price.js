window.onresize

window.addEventListener("resize", adjustPrice);
window.onload = adjustPrice;

var prices = document.querySelectorAll('.price');

function adjustPrice() {
    for(var i = 0; i < 4; i++) {
        if(window.innerWidth > 900 && window.innerWidth < 1200) {
            prices[i].style.top = 140 + (window.innerWidth - 900)/4 + 'px';
        } else if(window.innerWidth <= 900) {
            prices[i].style.top = 140 + 'px';
        } else {
            prices[i].style.top = 215 + 'px';
        }
    }
}

