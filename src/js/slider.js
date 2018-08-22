var pairs = document.getElementsByClassName("pair");
var circles = document.getElementsByClassName("circle");
var wrapper = document.getElementsByClassName("wrapper")[0];
// var buttons = document.getElementsByClassName("btn-top-color");
var centerText = document.getElementsByClassName("center-text")[0];
var presentSlide = 0;
var colors = ["#849d8f", "#8996a6", "#9d8b84"];
// var buttonColors = ['#a0b5a9', '#a9b5c2', '#b5a7a1'];
var insideText = [
    'Крем-брюле и пломбир<br>с малиновым джемом',
    'Шоколадный пломбир<br>и лимонный сорбет',
    'Пломбир с помадкой<br>и клубничный щербет'
];
var backgroundImages = ['url("img/radiation-one.png")', 'url("img/radiation-two.png")', 'url("img/radiation-three.png")'];

showPair(presentSlide);

var timeoutId;

for (let i = 0; i < 3; i++) {
    circles[i].addEventListener("click", function() { showPair(i) });
}

function showPair(n) {
    if (timeoutId) clearInterval(timeoutId);
    wrapper.style.backgroundColor = colors[n];
    wrapper.style.backgroundImage = backgroundImages[n];
    centerText.innerHTML = insideText[n];

    for (var i = 0; i < 3; i++) {
        // buttons[i].style.backgroundColor = buttonColors[0];
        if (i === n) {
            pairs[i].style.display = "block";
            circles[i].classList.add("circle_full");
            circles[i].classList.remove("circle_empty");
        } else {
            pairs[i].style.display = "none";
            circles[i].classList.add("circle_empty");
            circles[i].classList.remove("circle__full");
        }    
    }
    presentSlide = n;
    timeoutId = setInterval(startSlideShow, 5000);
}

function startSlideShow() {
    showPair((presentSlide + 1) % 3);
}