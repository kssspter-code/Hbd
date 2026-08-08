/* =========================================
   รูปภาพทั้ง 10 รูป
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
   ตัวแปร
========================================= */

let currentImage = 0;
let touchStartX = 0;
let touchEndX = 0;


/* =========================================
   เริ่มต้นเว็บไซต์
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    startCountdown();

    setupButtons();

    setupSwipe();

});


/* =========================================
   COUNTDOWN 3 → 2 → 1
========================================= */

function startCountdown() {

    const countdown =
        document.getElementById("countdown");

    const countdownArea =
        document.getElementById("countdownArea");

    const birthdayContent =
        document.getElementById("birthdayContent");

    let number = 3;

    countdown.textContent = number;


    const timer = setInterval(() => {

        number--;

        if (number > 0) {

            countdown.textContent = number;

            countdown.style.animation = "none";

            void countdown.offsetWidth;

            countdown.style.animation =
                "countdownPop .8s ease";

        } else {

            clearInterval(timer);

            countdownArea.classList.add("hidden");

            birthdayContent.classList.remove("hidden");

        }

    }, 1000);

}


/* =========================================
   ปุ่มทั้งหมด
========================================= */

function setupButtons() {

    const startButton =
        document.getElementById("startSlideshow");

    const letterButton =
        document.getElementById("openLetter");

    const heartButton =
        document.getElementById("showHeart");


    if (startButton) {

        startButton.addEventListener(
            "click",
            openSlideshow
        );

    }


    if (letterButton) {

        letterButton.addEventListener(
            "click",
            openLetter
        );

    }


    if (heartButton) {

        heartButton.addEventListener(
            "click",
            openEnding
        );

    }

}


/* =========================================
   เปลี่ยนหน้า
========================================= */

function changeScreen(current, next) {

    const currentScreen =
        document.getElementById(current);

    const nextScreen =
        document.getElementById(next);


    if (currentScreen) {

        currentScreen.classList.add("hidden");

    }


    if (nextScreen) {

        nextScreen.classList.remove("hidden");

    }

}


/* =========================================
   เปิดสมุดรูป
========================================= */

function openSlideshow() {

    changeScreen(
        "homeScreen",
        "slideshowScreen"
    );


    currentImage = 0;


    showImage(
        currentImage,
        false
    );

}


/* =========================================
   แสดงรูป
========================================= */

function showImage(
    index,
    animate = true,
    direction = "next"
) {

    const image =
        document.getElementById("slidePhoto");

    const counter =
        document.getElementById("slideCounter");

    const slider =
        document.getElementById("photoSlider");


    if (!image || !counter || !slider) {

        return;

    }


    image.classList.remove("show");


    if (animate) {

        slider.classList.remove(
            "page-next",
            "page-prev"
        );


        void slider.offsetWidth;


        if (direction === "next") {

            slider.classList.add("page-next");

        } else {

            slider.classList.add("page-prev");

        }

    }


    setTimeout(() => {

        image.src =
            `assets/images/${images[index]}`;


        image.onload = () => {

            image.classList.add("show");

        };

    }, animate ? 180 : 0);


    counter.textContent =
        `${index + 1} / ${images.length}`;


    updateDots();

}


/* =========================================
   จุดแสดงรูปปัจจุบัน
========================================= */

function updateDots() {

    const dots =
        document.getElementById("slideDots");


    if (!dots) {

        return;

    }


    dots.innerHTML = "";


    images.forEach((_, index) => {

        const dot =
            document.createElement("span");


        dot.className =
            "slide-dot";


        if (index === currentImage) {

            dot.classList.add("active");

        }


        dots.appendChild(dot);

    });

}


/* =========================================
   ระบบปัดรูป
========================================= */

function setupSwipe() {

    const slider =
        document.getElementById("photoSlider");


    if (!slider) {

        return;

    }


    slider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].clientX;

            handleSwipe();

        },
        {
            passive: true
        }
    );


    /* รองรับคอมพิวเตอร์ */

    slider.addEventListener(
        "mousedown",
        event => {

            touchStartX =
                event.clientX;

        }
    );


    slider.addEventListener(
        "mouseup",
        event => {

            touchEndX =
                event.clientX;

            handleSwipe();

        }
    );

}


/* =========================================
   ตรวจการปัด
========================================= */

function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    const minimumSwipe = 45;


    if (
        Math.abs(difference) <
        minimumSwipe
    ) {

        return;

    }


    if (difference > 0) {

        nextImage();

    } else {

        previousImage();

    }

}


/* =========================================
   รูปถัดไป
========================================= */

function nextImage() {

    currentImage++;


    if (
        currentImage >=
        images.length
    ) {

        currentImage = 0;

    }


    showImage(
        currentImage,
        true,
        "next"
    );

}


/* =========================================
   รูปก่อนหน้า
========================================= */

function previousImage() {

    currentImage--;


    if (currentImage < 0) {

        currentImage =
            images.length - 1;

    }


    showImage(
        currentImage,
        true,
        "prev"
    );

}


/* =========================================
   เปิดหน้าโน้ต
========================================= */

function openLetter() {

    changeScreen(
        "slideshowScreen",
        "letterScreen"
    );

}


/* =========================================
   เปิดหน้าหัวใจ
========================================= */

function openEnding() {

    changeScreen(
        "letterScreen",
        "endingScreen"
    );


    createHeartGallery();

}


/* =========================================
   สร้างหัวใจแบบสมมาตร
========================================= */

function createHeartGallery() {

    const container =
        document.getElementById("heartGallery");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    /*
       ตำแหน่งรูปทั้งหมด

       ซ้ายและขวาออกแบบให้เป็นคู่
       เพื่อให้หัวใจสมมาตร
    */

    const positions = [

        /* ===== ส่วนโค้งด้านบน ===== */

        [28, 10],
        [39, 7],

        [61, 7],
        [72, 10],


        /* ===== แถวที่ 2 ===== */

        [21, 20],
        [33, 18],
        [44, 18],

        [56, 18],
        [67, 18],
        [79, 20],


        /* ===== แถวที่ 3 ===== */

        [17, 31],
        [28, 30],
        [39, 29],

        [50, 29],

        [61, 29],
        [72, 30],
        [83, 31],


        /* ===== แถวที่ 4 ===== */

        [21, 42],
        [33, 41],
        [44, 41],

        [56, 41],
        [67, 41],
        [79, 42],


        /* ===== แถวที่ 5 ===== */

        [29, 53],
        [40, 52],

        [50, 52],

        [60, 52],
        [71, 53],


        /* ===== แถวที่ 6 ===== */

        [38, 64],

        [50, 65],

        [62, 64],


        /* ===== ปลายหัวใจ ===== */

        [50, 78]

    ];


    /*
       สร้างรูปทีละรูป
    */

    positions.forEach(
        (position, index) => {

            const img =
                document.createElement("img");


            /*
               ใช้รูปทั้ง 10 รูป
               แล้ววนซ้ำอย่างเป็นระเบียบ
            */

            const imageIndex =
                index % images.length;


            img.src =
                `assets/images/${images[imageIndex]}`;


            img.alt =
                "รูปความทรงจำ";


            /*
               ตำแหน่ง X / Y
            */

            img.style.left =
                `${position[0]}%`;

            img.style.top =
                `${position[1]}%`;


            /*
               ทำให้รูปค่อย ๆ ปรากฏ
            */

            img.style.animationDelay =
                `${index * 0.06}s`;


            container.appendChild(img);

        }
    );

}
