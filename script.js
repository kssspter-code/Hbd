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
   เริ่มต้น
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startCountdown();

        setupButtons();

        setupSwipe();

    }
);


/* =========================================
   Countdown 3 2 1
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
   ปุ่ม
========================================= */

function setupButtons() {

    document
        .getElementById("startSlideshow")
        .addEventListener(
            "click",
            openSlideshow
        );


    document
        .getElementById("openLetter")
        .addEventListener(
            "click",
            openLetter
        );


    document
        .getElementById("showHeart")
        .addEventListener(
            "click",
            openEnding
        );

}


/* =========================================
   เปลี่ยนหน้า
========================================= */

function changeScreen(current, next) {

    document
        .getElementById(current)
        .classList.add("hidden");

    document
        .getElementById(next)
        .classList.remove("hidden");

}


/* =========================================
   เปิด Slideshow
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
        document.getElementById(
            "slidePhoto"
        );

    const counter =
        document.getElementById(
            "slideCounter"
        );

    const slider =
        document.getElementById(
            "photoSlider"
        );


    image.classList.remove("show");


    if (animate) {

        slider.classList.remove(
            "page-next",
            "page-prev"
        );

        void slider.offsetWidth;


        if (direction === "next") {

            slider.classList.add(
                "page-next"
            );

        } else {

            slider.classList.add(
                "page-prev"
            );

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
   จุดบอกจำนวนรูป
========================================= */

function updateDots() {

    const dots =
        document.getElementById(
            "slideDots"
        );

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
   Swipe
========================================= */

function setupSwipe() {

    const slider =
        document.getElementById(
            "photoSlider"
        );


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


    /* รองรับเมาส์ */

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
   เปิดโน้ต
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
   สร้างหัวใจจากรูป
========================================= */

function createHeartGallery() {

    const container =
        document.getElementById(
            "heartGallery"
        );

    container.innerHTML = "";


    /*
       ตำแหน่งหัวใจ

       จุดทั้งหมดถูกจัดแบบ
       ซ้าย = ขวา
       เพื่อให้หัวใจสมมาตร
    */

    const positions = [

        /* ===== แถวบน ===== */

        [28, 10],
        [39, 7],

        [61, 7],
        [72, 10],


        /* ===== แถวที่ 2 ===== */

        [21, 20],
        [32, 18],
        [44, 18],

        [56, 18],
        [68, 18],
        [79, 20],


        /* ===== แถวที่ 3 ===== */

        [17, 32],
        [28, 31],
        [39, 30],

        [50, 30],

        [61, 30],
        [72, 31],
        [83, 32],


        /* ===== แถวที่ 4 ===== */

        [22, 43],
        [34, 42],
        [45, 42],

        [55, 42],
        [66, 42],
        [78, 43],


        /* ===== แถวที่ 5 ===== */

        [29, 54],
        [40, 53],

        [50, 53],

        [60, 53],
        [71, 54],


        /* ===== แถวล่าง ===== */

        [38, 65],
        [50, 66],
        [62, 65],


        /* ===== ปลายหัวใจ ===== */

        [50, 78]

    ];


    /*
       ใช้รูปทั้ง 10 รูป
       วนซ้ำอย่างเป็นระเบียบ
    */

    positions.forEach(
        (position, index) => {

            const img =
                document.createElement(
                    "img"
                );


            const imageIndex =
                index %
                images.length;


            img.src =
                `assets/images/${images[imageIndex]}`;


            img.alt =
                "รูปความทรงจำ";


            /*
               ตำแหน่ง
            */

            img.style.left =
                `${position[0]}%`;

            img.style.top =
                `${position[1]}%`;


            /*
               จัดกึ่งกลาง
            */

            img.style.transform =
                "translate(-50%, -50%)";


            /*
               รูปค่อย ๆ ปรากฏ
            */

            img.style.animationDelay =
                `${index * 0.06}s`;


            container.appendChild(img);

        }
    );

}
