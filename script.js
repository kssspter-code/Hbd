/* =========================
   รายชื่อรูปทั้งหมด
========================= */

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


let currentImage = 0;
let slideshowStarted = false;


/* =========================
   สร้าง URL ของรูป
========================= */

function imagePath(filename) {

    return `./assets/images/${filename}`;

}


/* =========================
   เริ่มเซอร์ไพรส์
========================= */

function startSurprise() {

    const welcome =
        document.getElementById("welcome");

    const surprise =
        document.getElementById("surprise");


    welcome.style.display = "none";

    surprise.style.display = "block";


    /* สร้างรูปหัวใจ */

    createHeartGallery();


    /* เริ่ม slideshow ครั้งเดียว */

    if (!slideshowStarted) {

        slideshowStarted = true;

        startSlideshow();

    }


    /* เลื่อนลงไปยัง slideshow */

    setTimeout(() => {

        document.querySelector(".slideshow")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

    }, 300);

}


/* =========================
   Slideshow
========================= */

function startSlideshow() {

    setInterval(() => {


        const image =
            document.getElementById("slideImage");

        const number =
            document.getElementById("currentSlide");


        if (!image) {
            return;
        }


        /* เอฟเฟกต์ค่อย ๆ หาย */

        image.classList.add("fade");


        setTimeout(() => {


            currentImage++;


            if (
                currentImage >= images.length
            ) {

                currentImage = 0;

            }


            /* เปลี่ยนรูป */

            image.src =
                imagePath(
                    images[currentImage]
                );


            /* เปลี่ยนเลข */

            if (number) {

                number.textContent =
                    currentImage + 1;

            }


            /* ตรวจว่ารูปโหลดได้หรือไม่ */

            image.onload = () => {

                image.classList.remove("fade");

            };


            image.onerror = () => {

                console.error(
                    "ไม่สามารถโหลดรูป:",
                    image.src
                );

                image.classList.remove("fade");

            };


        }, 800);


    }, 3000);

}


/* =========================
   สร้างรูปหัวใจ
========================= */

function createHeartGallery() {


    const container =
        document.getElementById(
            "heartGallery"
        );


    if (!container) {
        return;
    }


    /* ล้างของเดิม */

    container.innerHTML = "";


    images.forEach(
        (filename, index) => {


            const img =
                document.createElement("img");


            /* Path รูป */

            img.src =
                imagePath(filename);


            /* คำอธิบาย */

            img.alt =
                `ความทรงจำ ${index + 1}`;


            /* เอฟเฟกต์ปรากฏทีละรูป */

            img.style.animationDelay =
                `${index * 0.15}s`;


            /* ตรวจรูป */

            img.onerror = () => {

                console.error(
                    "ไม่สามารถโหลดรูปหัวใจ:",
                    img.src
                );

            };


            container.appendChild(img);

        }
    );

}


/* =========================
   ตรวจสอบรูปตอนเปิดเว็บ
========================= */

function preloadImages() {


    images.forEach(
        (filename) => {


            const img =
                new Image();


            img.src =
                imagePath(filename);


            img.onload = () => {

                console.log(
                    "โหลดรูปสำเร็จ:",
                    filename
                );

            };


            img.onerror = () => {

                console.error(
                    "โหลดรูปไม่สำเร็จ:",
                    imagePath(filename)
                );

            };

        }
    );

}


/* =========================
   เริ่มโหลดรูป
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        preloadImages();

    }
);
