

// RainLetters Effect
let mainCanv = document.getElementById("mycanvas");
let canvtx = mainCanv.getContext("2d");
let conHeight = document.querySelector('.header').clientHeight;

//making the canvas full screen
// if (window.innerHeight > conHeight) {
//     mainCanv.height = window.innerHeight;
// } else {
//     mainCanv.height = conHeight;
// }
mainCanv.height = conHeight;
mainCanv.width = window.innerWidth;
//letters characters - taken from the unicode charset
let letters = "абвгдеж013579hijkl";
//converting the string into an array of single characters
letters = letters.split("");

let font_size = 10;
let columns = mainCanv.width / font_size; //number of columns for the rain
// //an array of drops - one per column
let drops = [];
// //x below is the x coordinate
// //1 = y co-ordinate of the drop(same for every drop initially)
for (let x = 0; x < columns; x++)
    drops[x] = 1;

//Adjust the cascade to the size of the window
function reportWindowSize() {
    mainCanv.width = window.innerWidth;
    mainCanv.height = conHeight;

    columns = mainCanv.width / font_size;
    drops = [];
    for (let x = 0; x < columns; x++)
        drops[x] = 1;
}

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    canvtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    canvtx.fillRect(0, 0, mainCanv.width, mainCanv.height);

    canvtx.fillStyle = "#0F0"; //green text
    canvtx.font = font_size + "px arial";
    //looping over drops
    for (let i = 0; i < drops.length; i++) {
        //a random letters character to print
        let text = letters[Math.floor(Math.random() * letters.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        canvtx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > mainCanv.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

if (mainCanv.width > 576) {
    window.addEventListener('resize', reportWindowSize);
}

setInterval(draw, 50);
// End Rainletters effect

//Animation
(function () {
    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-element');
                element.classList.remove('hidden');
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
})();

