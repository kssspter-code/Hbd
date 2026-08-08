const totalImages = 10;

let currentImage = 1;

let slideshowStarted = false;


/* --------------------
   เริ่มเซอร์ไพรส์
-------------------- */

function startSurprise() {

    const welcome =
        document.getElementById("welcome");

    const surprise =
        document.getElementById("surprise");


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

        const image =
            document.getElementById("slideImage");

        const number =
            document.getElementById("currentSlide");


        image.classList.add("fade");


        setTimeout(() => {

            currentImage++;

            if (currentImage > totalImages) {

                currentImage = 1;

            }


            image.src =
                `assets/images/${currentImage}.jpg`;


            number.textContent =
                currentImage;


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


    for (let i = 1; i <= totalImages; i++) {

        const img =
            document.createElement("img");


        img.src =
            `assets/images/${i}.jpg`;


        img.style.animationDelay =
            `${i * 0.15}s`;


        container.appendChild(img);

    }

}
