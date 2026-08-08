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
   สร้าง Path ของรูป
========================================= */

function imagePath(filename) {
    return `./assets/images/${filename}`;
}


/* =========================================
   ดึง Element จาก HTML
========================================= */

const countdownScreen =
    document.getElementById("countdownScreen");

const countdown =
    document.getElementById("countdown");

const titleScreen =
    document.getElementById("titleScreen");

const bookScreen =
    document.getElementById("bookScreen");

const endingScreen =
    document.getElementById("endingScreen");

const openBook =
    document.getElementById("openBook");

const nextPhoto =
    document.getElementById("nextPhoto");

const bookPhoto =
    document.getElementById("bookPhoto");

const pageCounter =
    document.getElementById("pageCounter");

const dots =
    document.getElementById("dots");

const heartGallery =
    document.getElementById("heartGallery");


/* =========================================
   ตัวแปร
========================================= */

let currentPage = 0;

let isOpening = false;


/* =========================================
   รอเวลา
========================================= */

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


/* =========================================
   Countdown
   3 → 2 → 1
========================================= */

async function startCountdown() {

    const numbers = [
        "3",
        "2",
        "1"
    ];


    for (
        let i = 0;
        i < numbers.length;
        i++
    ) {

        countdown.textContent =
            numbers[i];


        /* รีเซ็ต Animation */

        countdown.style.animation =
            "none";

        void countdown.offsetWidth;


        countdown.style.animation =
            "countdownPop 0.8s ease";


        await wait(1000);

    }


    /* ซ่อนหน้า Countdown */

    countdownScreen.classList.add(
        "hidden"
    );


    /* แสดง Happy Birthday */

    titleScreen.classList.remove(
        "hidden"
    );

}


/* =========================================
   เปิดสมุด
========================================= */

openBook.addEventListener(
    "click",
    function () {

        if (isOpening) {
            return;
        }

        isOpening = true;


        /* ซ่อนหน้า Happy Birthday */

        titleScreen.classList.add(
            "hidden"
        );


        /* แสดงสมุด */

        bookScreen.classList.remove(
            "hidden"
        );


        /* เริ่มจากรูปแรก */

        currentPage = 0;


        showPhoto();


        /* ปลดล็อก */

        setTimeout(
            () => {
                isOpening = false;
            },
            500
        );

    }
);


/* =========================================
   แสดงรูปในสมุด
========================================= */

function showPhoto() {

    /* ซ่อนรูปก่อน */

    bookPhoto.classList.remove(
        "show"
    );


    setTimeout(
        function () {


            /* เปลี่ยนรูป */

            bookPhoto.src =
                imagePath(
                    images[currentPage]
                );


            /* เปลี่ยนเลขหน้า */

            pageCounter.textContent =
                `${currentPage + 1} / ${images.length}`;


            /* เมื่อรูปโหลดเสร็จ */

            bookPhoto.onload =
                function () {

                    bookPhoto.classList.add(
                        "show"
                    );

                };


        },
        200
    );


    /* สร้างจุด */

    createDots();

}


/* =========================================
   จุดแสดงหน้าปัจจุบัน
========================================= */

function createDots() {

    dots.innerHTML = "";


    images.forEach(
        function (_, index) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "dot";


            if (
                index === currentPage
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
   ปุ่มหน้าถัดไป
========================================= */

nextPhoto.addEventListener(
    "click",
    function () {


        /* ถ้ายังมีรูปถัดไป */

        if (
            currentPage <
            images.length - 1
        ) {

            currentPage++;

            showPhoto();

            return;

        }


        /* =================================
           รูปสุดท้ายแล้ว
           ไปหน้ารูปหัวใจ
        ================================= */

        bookScreen.classList.add(
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
       ตำแหน่งรูปทั้ง 10 รูป

       ❤️
    */

    const positions = [

        /* รูปบนซ้าย */

        {
            x: 112,
            y: 5
        },


        /* รูปบนขวา */

        {
            x: 215,
            y: 5
        },


        /* แถวที่ 2 */

        {
            x: 58,
            y: 75
        },

        {
            x: 165,
            y: 75
        },

        {
            x: 272,
            y: 75
        },


        /* แถวที่ 3 */

        {
            x: 58,
            y: 157
        },

        {
            x: 165,
            y: 157
        },

        {
            x: 272,
            y: 157
        },


        /* ปลายหัวใจ */

        {
            x: 112,
            y: 240
        },

        {
            x: 215,
            y: 240
        }

    ];


    images.forEach(
        function (
            filename,
            index
        ) {


            const image =
                document.createElement(
                    "img"
                );


            /* Path */

            image.src =
                imagePath(
                    filename
                );


            /* Alt */

            image.alt =
                `ความทรงจำ ${index + 1}`;


            /* ตำแหน่ง */

            image.style.left =
                `${positions[index].x}px`;


            image.style.top =
                `${positions[index].y}px`;


            /* ให้รูปปรากฏทีละรูป */

            image.style.animationDelay =
                `${index * 0.15}s`;


            /* เพิ่มรูป */

            heartGallery.appendChild(
                image
            );

        }
    );

}


/* =========================================
   Preload รูปทั้ง 10 รูป
   ช่วยให้รูปเปลี่ยนได้ลื่นขึ้น
========================================= */

function preloadImages() {

    images.forEach(
        function (filename) {

            const image =
                new Image();


            image.src =
                imagePath(
                    filename
                );

        }
    );

}


/* =========================================
   เริ่มต้นเว็บไซต์
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        preloadImages();

        startCountdown();

    }
);
