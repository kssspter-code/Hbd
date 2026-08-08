/* =========================================
   รายชื่อรูปทั้ง 10 รูป
========================================= */

const images = [
    "IMG_2277.jpeg",
    "IMG_2278.jpeg",
    "IMG_2279.jpeg",
    "IMG_2280.jpeg",
    "IMG_2281.jpeg",
    "IMG_2282.jpeg",
    "IMG_2283.jpeg",
    "IMG_2284.jpeg",
    "IMG_2285.jpeg",
    "IMG_2286.jpeg"
];


/* =========================================
   สร้าง Path รูป
========================================= */

function imagePath(filename) {

    return `./assets/images/${filename}`;

}


/* =========================================
   Element ต่าง ๆ
========================================= */

const countdownScreen =
    document.getElementById("countdownScreen");

const countdown =
    document.getElementById("countdown");

const titleScreen =
    document.getElementById("titleScreen");

const slideshowScreen =
    document.getElementById("slideshowScreen");

const letterScreen =
    document.getElementById("letterScreen");

const endingScreen =
    document.getElementById("endingScreen");

const startSlideshow =
    document.getElementById("startSlideshow");

const openLetter =
    document.getElementById("openLetter");

const showHeart =
    document.getElementById("showHeart");

const slidePhoto =
    document.getElementById("slidePhoto");

const slideCounter =
    document.getElementById("slideCounter");

const slideDots =
    document.getElementById("slideDots");

const prevPhoto =
    document.getElementById("prevPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");

const photoSlider =
    document.getElementById("photoSlider");

const heartGallery =
    document.getElementById("heartGallery");


/* =========================================
   ตัวแปร
========================================= */

let currentImage = 0;

let touchStartX = 0;

let touchEndX = 0;


/* =========================================
   ฟังก์ชันรอเวลา
========================================= */

function wait(time) {

    return new Promise(
        resolve => setTimeout(resolve, time)
    );

}


/* =========================================
   Countdown
========================================= */

async function startCountdown() {

    const numbers = [
        "3",
        "2",
        "1"
    ];


    for (const number of numbers) {

        countdown.textContent =
            number;


        countdown.style.animation =
            "none";

        void countdown.offsetWidth;

        countdown.style.animation =
            "countdownPop .8s ease";


        await wait(1000);

    }


    /* ซ่อน Countdown */

    countdownScreen.classList.add(
        "hidden"
    );


    /* แสดง Happy Birthday */

    titleScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   เปิดหน้าสไลด์
========================================= */

startSlideshow.addEventListener(
    "click",
    function () {

        titleScreen.classList.add(
            "hidden"
        );


        slideshowScreen.classList.remove(
            "hidden"
        );


        currentImage = 0;


        showSlide();

    }
);


/* =========================================
   แสดงรูป
========================================= */

function showSlide() {

    /* เริ่ม Fade Out */

    slidePhoto.classList.remove(
        "show"
    );


    setTimeout(
        function () {

            slidePhoto.src =
                imagePath(
                    images[currentImage]
                );


            slideCounter.textContent =
                `${currentImage + 1} / ${images.length}`;


            slidePhoto.onload =
                function () {

                    slidePhoto.classList.add(
                        "show"
                    );

                };


            createSlideDots();

        },
        180
    );

}


/* =========================================
   จุดด้านล่างรูป
========================================= */

function createSlideDots() {

    slideDots.innerHTML = "";


    images.forEach(
        function (_, index) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "slide-dot";


            if (
                index === currentImage
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                function () {

                    currentImage =
                        index;

                    showSlide();

                }
            );


            slideDots.appendChild(
                dot
            );

        }
    );

}


/* =========================================
   รูปถัดไป
========================================= */

function nextSlide() {

    currentImage++;

    if (
        currentImage >= images.length
    ) {

        currentImage = 0;

    }


    showSlide();

}


/* =========================================
   รูปก่อนหน้า
========================================= */

function previousSlide() {

    currentImage--;

    if (
        currentImage < 0
    ) {

        currentImage =
            images.length - 1;

    }


    showSlide();

}


/* =========================================
   ปุ่มลูกศร
========================================= */

nextPhoto.addEventListener(
    "click",
    function () {

        nextSlide();

    }
);


prevPhoto.addEventListener(
    "click",
    function () {

        previousSlide();

    }
);


/* =========================================
   ระบบปัดรูปบนมือถือ
========================================= */

photoSlider.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


photoSlider.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;


        handleSwipe();

    },
    {
        passive: true
    }
);


/* =========================================
   ตรวจสอบการปัด
========================================= */

function handleSwipe() {

    const distance =
        touchEndX - touchStartX;


    /* ปัดซ้าย */

    if (distance < -50) {

        nextSlide();

    }


    /* ปัดขวา */

    if (distance > 50) {

        previousSlide();

    }

}


/* =========================================
   เปิดหน้าโน้ตคำอวยพร
========================================= */

openLetter.addEventListener(
    "click",
    function () {

        slideshowScreen.classList.add(
            "hidden"
        );


        letterScreen.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   ไปหน้าหัวใจ
========================================= */

showHeart.addEventListener(
    "click",
    function () {

        letterScreen.classList.add(
            "hidden"
        );


        endingScreen.classList.remove(
            "hidden"
        );


        createHeartGallery();

    }
);


/* =========================================
   สร้างรูปหัวใจ
========================================= */

function createHeartGallery() {

    heartGallery.innerHTML = "";


    /*
       ตำแหน่ง 10 รูป
       ให้เป็นรูปหัวใจ

             ❤️ ❤️
           ❤️ ❤️ ❤️
           ❤️ ❤️ ❤️
             ❤️ ❤️
               ❤️
    */


    const positions = [

        {
            x: 108,
            y: 5
        },

        {
            x: 210,
            y: 5
        },

        {
            x: 55,
            y: 75
        },

        {
            x: 160,
            y: 75
        },

        {
            x: 265,
            y: 75
        },

        {
            x: 55,
            y: 160
        },

        {
            x: 160,
            y: 160
        },

        {
            x: 265,
            y: 160
        },

        {
            x: 108,
            y: 245
        },

        {
            x: 210,
            y: 245
        }

    ];


    images.forEach(
        function (
            filename,
            index
        ) {


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                imagePath(
                    filename
                );


            img.alt =
                `รูปที่ ${index + 1}`;


            img.style.left =
                `${positions[index].x}px`;


            img.style.top =
                `${positions[index].y}px`;


            img.style.animationDelay =
                `${index * 0.12}s`;


            heartGallery.appendChild(
                img
            );

        }
    );

}


/* =========================================
   Preload รูปทั้งหมด
========================================= */

function preloadImages() {

    images.forEach(
        function (filename) {

            const img =
                new Image();

            img.src =
                imagePath(filename);

        }
    );

}


/* =========================================
   เริ่มเว็บไซต์
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        preloadImages();

        startCountdown();

    }
);
