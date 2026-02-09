
let index = 0;
let currentImage = 0;
let canvas=null;
let ctx=null;

const images = [
    "static/images/pic1.jpg",
    "static/images/pic2.jpg",
    "static/images/pic3.jpg",
    "static/images/pic4.jpg",
    "static/images/pic5.jpg",
    "static/images/pic6.jpg",
    "static/images/pic7.jpg",
    "static/images/pic8.jpg",
    "static/images/pic9.jpg",
    "static/images/pic10.jpg"

];

const captions = [
    "There's my asthetic Angu",
    "Cutie on my hands",
    "My sleeping Beauty",
    "Look who it is",
    "Achodaa Cute ayitt ind mwuahh",
    "Bossy Girl",
    "Cutiepie",
    "My hottie wifey",
    "Aren't we the best",
    "You say hehehe"
];

function openEnvelope() {
    document.getElementById("envelope").style.display = "none";
    document.getElementById("letter").classList.remove("hidden");

    const music=document.getElementById("bgMusic");
    music.volume=0.4;
    music.play().catch(err=>console.log("Blocked:",err));

    
    initCanvas();
    startSparkles();
    typeLetter();
}
;

function showPhotos() {
    document.getElementById("letter").classList.add("hidden");
    document.getElementById("gallery").classList.remove("hidden");

    currentImage=0;

    updateSlide();

    document.getElementById("bgMusic").play();
}

function heartBurst() {
    document.getElementById("gallery").classList.add("hidden");
    const heart = document.getElementById("heart");
    heart.classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("gallery").classList.remove("hidden");
    }, 1200);
}

function initCanvas() {
    canvas = document.getElementById("sparkles");
    if (!canvas) return;   
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function startSparkles() {
    for (let i = 0; i < 120; i++) {
        setTimeout(createSparkle, i * 15);
    }
}

function createSparkle() {
    if (!canvas) return; 
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "rgba(255,105,180,0.8)";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
}

const letterText = `
Hey love ❤️

Happy Birthday to my favorite person.
You make everything softer, warmer, better.
I’m really lucky to have you.

Always yours 💕
`;



function typeLetter() {
    if (index < letterText.length) {
        document.getElementById("typedText").innerText += letterText.charAt(index);
        index++;
        setTimeout(typeLetter, 40);
    }
}

function openEnvelope() {
    document.getElementById("envelope").style.display = "none";
    document.getElementById("letter").classList.remove("hidden");
    startSparkles();
    typeLetter();
}




function showPhotos() {
    document.getElementById("letter").classList.add("hidden");
    document.getElementById("gallery").classList.remove("hidden");
    currentImage = 0;
    document.getElementById("heartBtn").disabled = true;

    document.getElementById("hint").classList.add("hidden");

    updateSlide();
}

function nextImage() {
    currentImage++;

    // Show hint on second-last image
    if (currentImage === images.length - 2) {
        document.getElementById("hint").classList.remove("hidden");
    } else {
        document.getElementById("hint").classList.add("hidden");
    }

    // Last image → unlock heart
    if (currentImage >= images.length) {
        currentImage = images.length - 1;
        document.getElementById("heartBtn").disabled = false;
        document.getElementById("hint").classList.add("hidden");
    }

    updateSlide();
}

function updateSlide() {
    const slide = document.getElementById("slideshow");
    const caption = document.getElementById("caption");

    slide.style.animation = "none";
    slide.offsetHeight; // force reflow
    slide.style.animation = "fade 1.5s ease-in-out";

    slide.src = images[currentImage];
    caption.innerText = captions[currentImage];
}

const envelope = document.getElementById("envelope");
const music = document.getElementById("bgMusic");

envelope.addEventListener("pointerdown", () => {
    music.muted = false;
    music.volume = 0.4;
    music.currentTime = 0;

    music.play()
        .then(() => console.log("🎵 Music started"))
        .catch(err => console.log("Blocked:", err));

    openEnvelope(); // call visuals AFTER play
});

