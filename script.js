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


/* --------------------
   เริ่มเซอร์ไพรส์
-------------------- */

function startSurprise() {

    const welcome = document.getElementById("welcome");
    const surprise = document.getElementById("surprise");

    welcome.style.display = "none";
    surprise.style.display = "block";

    createHeartGallery();

    if (!slideshowStarted) {
        slideshowStarted = true;
        startSlideshow();
    }
}


/* --------------------
   Slideshow
-------------------- */

function startSlideshow() {

    setInterval(() => {

        const image = document.getElementById("slideImage");
        const number = document.getElementById("currentSlide");

        image.classList.add("fade");

        setTimeout(() => {

            currentImage++;

            if (currentImage >= images.length) {
                currentImage = 0;
            }

            image.src =
                `assets/images/${images[currentImage]}`;

            number.textContent =
                currentImage + 1;

            image.classList.remove("fade");

        }, 800);

    }, 3000);
}


/* --------------------
   สร้างรูปหัวใจ
-------------------- */

function createHeartGallery() {

    const container =
        document.getElementById("heartGallery");

    container.innerHTML = "";

    images.forEach((filename, index) => {

        const img =
            document.createElement("img");

        img.src =
            `assets/images/${filename}`;

        img.style.animationDelay =
            `${(index + 1) * 0.15}s`;

        container.appendChild(img);

    });
}
