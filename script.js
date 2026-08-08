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
   MY MELODY STYLE DECORATIONS
========================================= */

const melodyTypes = [
    "🎀🐰",
    "🐰💗",
    "🎀🐰✨",
    "🐰🌸",
    "💗🐰",
    "🐰🎀💗",
    "✨🐰",
    "🐰💕"
];

function createMelodyCharacters() {

    // ลบของเดิมก่อน
    const old = document.querySelector(".melody-decoration");

    if (old) {
        old.remove();
    }

    const container =
        document.createElement("div");

    container.className =
        "melody-decoration";

    /*
      ตัวละคร 12 ตัว
      กระจายรอบหน้าจอ
    */

    const positions = [
        [3, 12],
        [88, 10],

        [7, 29],
        [92, 30],

        [2, 50],
        [90, 51],

        [5, 70],
        [93, 69],

        [12, 87],
        [82, 87],

        [25, 9],
        [72, 8]
    ];

    positions.forEach((position, index) => {

        const character =
            document.createElement("div");

        character.className =
            "melody-character";

        /*
          สุ่มตัวละคร
        */

        character.textContent =
            melodyTypes[
                Math.floor(
                    Math.random() *
                    melodyTypes.length
                )
            ];

        /*
          ตำแหน่ง
        */

        character.style.left =
            `${position[0]}%`;

        character.style.top =
            `${position[1]}%`;

        /*
          สุ่มขนาด
        */

        const size =
            0.75 +
            Math.random() * 0.35;

        character.style.setProperty(
            "--melody-scale",
            size
        );

        /*
          แต่ละตัวขยับไม่พร้อมกัน
        */

        character.style.animationDelay =
            `${Math.random() * 2.5}s`;

        character.style.animationDuration =
            `${3 + Math.random() * 2}s`;

        container.appendChild(
            character
        );

    });

    document.body.appendChild(
        container
    );
}


/* =========================================
   HEART GALLERY
========================================= */

function createHeartGallery() {

    const container =
        document.getElementById(
            "heartGallery"
        );

    if (!container) return;

    container.innerHTML = "";

    /*
       ตำแหน่งหัวใจแบบสมมาตร

       10 รูป
    */

    const heartPositions = [

        // บน
        [34, 8],
        [66, 8],

        // ไหล่
        [22, 25],
        [78, 25],

        // กลาง
        [28, 43],
        [72, 43],

        // ล่าง
        [38, 61],
        [62, 61],

        [45, 78],
        [55, 78]

    ];

    images.forEach(
        (filename, index) => {

            const img =
                document.createElement("img");

            img.src =
                `assets/images/${filename}`;

            img.className =
                "heart-photo";

            /*
              ใช้รูปซ้ำถ้าจำเป็น
            */

            img.style.left =
                `${heartPositions[index][0]}%`;

            img.style.top =
                `${heartPositions[index][1]}%`;

            img.style.animationDelay =
                `${index * 0.12}s`;

            container.appendChild(img);

        }
    );
}


/* =========================================
   เริ่มหน้าเว็บ
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createMelodyCharacters();

        /*
          ถ้ามี heartGallery อยู่แล้ว
        */

        createHeartGallery();

    }
);
