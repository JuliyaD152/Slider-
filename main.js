let container = document.querySelector("#carousel");
let slidesLi = document.querySelectorAll(".slide");
let playBtn = document.querySelector("#pausePlay");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let indicatorsEl = document.querySelector(".indicators");
let indicator = document.querySelectorAll(".indicator")
let btnEl = document.querySelector(".btn");


let currentSlide = 0;
let timerId = null;
let isPlaying = true;
let slideLength = slidesLi.length

const leftArrow = "ArrowLeft";
const rightArrow = "ArrowRight";
const spaCe = " ";

let startSwipeX = null;
let endSwipeX = null;

function nextSlide(n) {
    slidesLi[currentSlide].classList.toggle("active");
    indicator[currentSlide].classList.toggle("active");
   /* if (currentSlide === 4) {
        currentSlide = 0;
    } else {
        currentSlide++;
    } */
    currentSlide = (slideLength + n) % slideLength;
    slidesLi[currentSlide].classList.toggle("active");
    indicator[currentSlide].classList.toggle("active");
}

function goToNextSlide() {
    nextSlide(currentSlide + 1);
}

function goToPrevSlide() {
    nextSlide(currentSlide - 1);
}

timerId = setInterval(goToNextSlide, 2000);

function play() {
    timerId = setInterval(goToNextSlide, 2000);
    playBtn.value = "Pause";
    isPlaying = !isPlaying
};

function pause() {
    if (isPlaying) {
        clearInterval(timerId);
        playBtn.value = "Play";
        isPlaying = !isPlaying
    }  
}

function pausePlay() {
    if (isPlaying) {
        pause()
    } else {
        play()
    }
}

function prevS() {
    pause();
    goToPrevSlide();
}

function nextS() {
    pause();
    goToNextSlide()
}

function indicate(e) {
    let target = e.target;
    if (target.classList.contains("indicator")) {
        pause();
        nextSlide(+target.getAttribute("data-slide-to"));
    }
}

function pressKey(e) {
    switch (e.key) {
        case leftArrow: prevS();
            break;
        case rightArrow: nextS();
            break;
        case spaCe: pausePlay();
            break;
    }
}

function swipeStart(e) {
    startSwipeX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
    endSwipeX = e.changedTouches[0].pageX;

    if (startSwipeX - endSwipeX < -100) prevS();
    if (startSwipeX - endSwipeX > 100) nextS();
}

indicatorsEl.style.display = 'flex';
btnEl.style.display = "inherit";

playBtn.addEventListener("click", pausePlay);
nextBtn.addEventListener("click", nextS);
prevBtn.addEventListener("click", prevS);
indicatorsEl.addEventListener('click', indicate);
document.addEventListener("keydown", pressKey);
container.addEventListener("touchstart", swipeStart);
container.addEventListener("touchend", swipeEnd);