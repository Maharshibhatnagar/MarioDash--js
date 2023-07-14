// for light/dark mode


score = 0;
cross = true;

audio = new Audio('Mpiano.mp3');
audiogo = new Audio('mariofail.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}



var circle = document.querySelector("#circle");
var frame = document.querySelector(".frame");
// lerp eqn
const lerp = (x, y, a)=> x*(1-a)+y*a;

window.addEventListener("mousemove", function(dets){
    gsap.to(circle, {
        x: dets.clientX,
        y: dets.clientY,
        duration: .2,
        ease: Expo
    })
})


frame.addEventListener("mousemove", function(dets){

    // to find dimensions
    var dims = frame.getBoundingClientRect();
    console.log(dims);//console mein dimensions

    var xstart = dims.x;
    var xend = dims.x + dims.width;
    // iski explanation neeche hain 

    // gsap.utils.mapRange(0, 1, 100, 200, 0); // means 0 and 1 ko map kardo 100 and 200 se aur 0 pe jo value hai woh dedo
   var zeroone= gsap.utils.mapRange(xstart, xend, 0, 1, dets.clientX);

    lerp(-50, 50, zeroone);// 0 aaya toh -50 one aaya toh +50

    gsap.to(circle, {
        scale: 5,
        // duration: .4
    }) 
    gsap.to(".frame span", {
        color: "#fff",
        duration: .4,
        y: "-5vw"
    })

    gsap.to(".frame span", {
        x:  lerp(-50, 50, zeroone),
        duration: .3
    })
})

frame.addEventListener("mouseleave", function(dets){
    gsap.to(circle, {
        scale: 1,
        
    })
    gsap.to(".frame span", {
        color: "#000",
        duration: .4,
        y: 0
    })
    
    gsap.to(".frame span", {
        x: 0,
        duration: .3
    })
})