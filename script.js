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

let slideshowOpened = false;



/* =========================================
   เริ่ม Countdown
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
   Countdown
========================================= */

function startCountdown() {

    const countdown =
        document.getElementById(
            "countdown"
        );

    const countdownArea =
        document.getElementById(
            "countdownArea"
        );

    const birthdayContent =
        document.getElementById(
            "birthdayContent"
        );


    let number = 3;


    countdown.textContent =
        number;


    const timer =
        setInterval(
            () => {

                number--;


                if (number > 0) {

                    countdown.textContent =
                        number;


                    /* restart animation */

                    countdown.style.animation =
                        "none";

                    void countdown.offsetWidth;

                    countdown.style.animation =
                        "countdownPop .8s ease";

                }


                else {

                    clearInterval(timer);


                    countdownArea.classList.add(
                        "hidden"
                    );


                    birthdayContent.classList.remove(
                        "hidden"
                    );

                }

            },
            1000
        );
}



/* =========================================
   ปุ่มต่าง ๆ
========================================= */

function setupButtons() {


    /* เปิดสมุด */

    const bookButton =
        document.getElementById(
            "startSlideshow"
        );


    bookButton.addEventListener(
        "click",
        openSlideshow
    );



    /* เปิดจดหมาย */

    const letterButton =
        document.getElementById(
            "openLetter"
        );


    letterButton.addEventListener(
        "click",
        openLetter
    );



    /* เปิดหน้าหัวใจ */

    const heartButton =
        document.getElementById(
            "showHeart"
        );


    heartButton.addEventListener(
        "click",
        openEnding
    );

}



/* =========================================
   เปลี่ยนหน้า
========================================= */

function changeScreen(
    current,
    next
) {

    const currentElement =
        document.getElementById(
            current
        );

    const nextElement =
        document.getElementById(
            next
        );


    currentElement.classList.add(
        "hidden"
    );

    nextElement.classList.remove(
        "hidden"
    );

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


    image.classList.remove(
        "show"
    );


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

        }

        else {

            slider.classList.add(
                "page-prev"
            );

        }

    }


    setTimeout(
        () => {

            image.src =
                `assets/images/${images[index]}`;


            image.onload =
                () => {

                    image.classList.add(
                        "show"
                    );

                };

        },
        animate ? 180 : 0
    );


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


    images.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "slide-dot";


            if (
                index ===
                currentImage
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dots.appendChild(
                dot
            );

        }
    );

}



/* =========================================
   ระบบ Swipe
========================================= */

function setupSwipe() {

    const slider =
        document.getElementById(
            "photoSlider"
        );


    slider.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].clientX;


            handleSwipe();

        },
        {
            passive: true
        }
    );



    /* รองรับเมาส์ด้วย */

    slider.addEventListener(
        "mousedown",
        (event) => {

            touchStartX =
                event.clientX;

        }
    );


    slider.addEventListener(
        "mouseup",
        (event) => {

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
        touchStartX -
        touchEndX;


    const minimumSwipe =
        45;


    if (
        Math.abs(difference) <
        minimumSwipe
    ) {

        return;

    }


    /* ปัดซ้าย */

    if (difference > 0) {

        nextImage();

    }


    /* ปัดขวา */

    else {

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


    if (
        currentImage < 0
    ) {

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
   เปิดหน้าสุดท้าย
========================================= */

function openEnding() {

    changeScreen(
        "letterScreen",
        "endingScreen"
    );


    createHeartGallery();

}



/* =========================================
   สร้างรูปหัวใจ
========================================= */

function createHeartGallery() {

    const container =
        document.getElementById(
            "heartGallery"
        );


    container.innerHTML = "";


    /*
       ตำแหน่งหัวใจ
       ใช้รูปซ้ำได้เพื่อให้หัวใจ
       ดูเต็มและสมมาตรมากขึ้น
    */

    const positions = [

        /* ด้านบนซ้าย */

        [23, 10],
        [38, 5],

        /* ด้านบนขวา */

        [62, 5],
        [77, 10],

        /* ขอบซ้าย */

        [14, 21],
        [9, 34],
        [12, 48],

        /* ขอบขวา */

        [86, 21],
        [91, 34],
        [88, 48],

        /* ด้านใน */

        [29, 22],
        [42, 20],
        [58, 20],
        [71, 22],

        [24, 35],
        [38, 34],
        [52, 34],
        [66, 34],
        [76, 35],

        /* กลางล่าง */

        [32, 48],
        [46, 48],
        [60, 48],
        [68, 48],

        /* ปลายหัวใจ */

        [39, 61],
        [50, 62],
        [58, 61],

        [50, 75]

    ];


    positions.forEach(
        (position, index) => {


            /*
               สุ่มรูปจากทั้ง 10 รูป
            */

            const randomIndex =
                Math.floor(
                    Math.random() *
                    images.length
                );


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                `assets/images/${images[randomIndex]}`;


            img.alt =
                "ความทรงจำ";


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
               ให้รูปค่อย ๆ ปรากฏ
            */

            img.style.animationDelay =
                `${index * 0.08}s`;


            container.appendChild(
                img
            );

        }
    );

}
