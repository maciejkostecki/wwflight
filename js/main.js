"use strict";

const canvas = document.querySelector('#canvas');
const arrow = document.querySelector('#arrow');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let spotArray= [];

// zmienne dla wiggle() - animacja strzałki
const arrowX = document.documentElement.clientWidth / 4;
const arrowY = document.documentElement.clientHeight;
let wiggleX = arrowX;
let wiggleY = arrowY;
let targetX = arrowX;
let targetY = arrowY;
let arrowInt, distX, distY, initDistX, initDistY, initWiggleX, initWiggleY;

let wiggleSpeed = 20; // prędkość wiggle()
let globalSpeed = 0.7; // prędkość cząstek

// Animacja strzałki
function randomizeX() {
    targetX = arrowX + Math.round(Math.random() * 100 - 50);
    initDistX = Math.abs(targetX - wiggleX);
    initWiggleX = wiggleX;
};
function randomizeY() {
    targetY = arrowY + Math.round(Math.random() * 100 - 50);
    initDistY = Math.abs(targetY - wiggleY);
    initWiggleY = wiggleY;
};

function wiggle() {
    
    // ------ x ------ //
    distX = Math.abs(targetX - wiggleX);
    if (distX > 2 && distX <= initDistX / 2) {
        wiggleX += (targetX - wiggleX) / wiggleSpeed;
    } else if (distX == initDistX) {
        wiggleX += (targetX - wiggleX) / 100;
    } else if (distX > 2 && distX > initDistX / 2) {
        wiggleX += ((targetX - initWiggleX) - (targetX - wiggleX)) / wiggleSpeed;
    } else if (distX <= 2) {
        randomizeX();
    }
    arrow.style.left = wiggleX + 'px';
    
    // ------ y ------ //
    distY = Math.abs(targetY - wiggleY);
    if (distY > 2 && distY <= initDistY / 2) {
        wiggleY += (targetY - wiggleY) / wiggleSpeed;
    } else if (distY == initDistY) {
        wiggleY += (targetY - wiggleY) / 100;
    } else if (distY > 2 && distY > initDistY / 2) {
        wiggleY += ((targetY - initWiggleY) - (targetY - wiggleY)) / wiggleSpeed;
    } else if (distY <= 2) {
        randomizeY();
    }
    arrow.style.bottom = wiggleY + 'px';
};

function animateArrow() {
    arrowInt = setInterval(wiggle, 16);
}
animateArrow();


// Generowanie i animacja cząstek
function Spot() {
    const thisIndex = spotArray.length;
    const width = Math.round(Math.random() * 50);
    const height = 1 + width /8;
    const initX = window.innerWidth + Math.round(Math.random() * window.innerWidth);
    let x = initX;
    const initY = - Math.round(Math.random() * window.innerHeight);
    let y = initY;
    let interval;
    let speed = 5 + width /2 * globalSpeed; 
    const div = document.createElement('div');
    let thisSpot = this;
    

    function draw() {
        canvas.appendChild(div);
        const cssString = 'left:' + x + 'px; top:' + y + 'px; width:' + width + 'px; height:' + height + 'px;';
        div.style.cssText = cssString;
    }
    draw();

    function redraw() {
        const cssString = 'left:' + x + 'px; top:' + y + 'px; width:' + width + 'px; height:' + height + 'px;';
        div.style.cssText = cssString;
    }

    function update() {
        function sideways() {
            if (x > - 50) {
                x -= speed * globalSpeed;
            } else if ( x <= -50 ) {
                x = initX + Math.round(Math.random() * 50 -25);
            }
        }
        function downwards() {
            if (y < window.innerHeight + 50) {
                y += speed * globalSpeed;
            } else if ( y >= window.innerHeight +50 ) {
                y = initY + Math.round(Math.random() * 50 -25);
            }
        }
        sideways();
        downwards();
        redraw();
    }

    function animate() {
        interval = setInterval(update, 16);
    }
    animate();
}

function generateSpots() {
    let spotCount = 15;
    for (let i = 0; i < spotCount; i++) {
        setTimeout( () => spotArray[i]= new Spot(), Math.random() * 7000 );   
    }
}
generateSpots();


// interakcja
function speedUp() {
    wiggleSpeed = 50;
    globalSpeed = 2;
    arrow.style.transform = 'rotate(-45deg) translate(-100%, -100%) scale(0.8)';
}

function slowDown() {
    wiggleSpeed = 20;
    globalSpeed = 0.6;
    arrow.style.transform = 'rotate(-45deg) translate(-100%, -100%) scale(1)';
}

document.addEventListener('touchstart', speedUp, false);
document.addEventListener('touchend', slowDown, false);
document.addEventListener('mousedown', speedUp, false);
document.addEventListener('mouseup', slowDown, false);