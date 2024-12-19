const overlay = document.getElementById("videoOverlay");
const video = document.getElementById("videoElement");
const closeBtn = document.getElementById("closeBtn");
const openMainVideoBtn = document.getElementById("openMainVideoBtn");
const hiddenButtons = document.getElementById("hiddenButtons");
const upperLeft = document.getElementById("upperLeftBtn");
const upperRight = document.getElementById("upperRightBtn");
const bottomLeft = document.getElementById("bottomLeftBtn");
const bottomRight = document.getElementById("bottomRightBtn");
const brickscapeT = document.getElementById("brickscape-title");
const playButton = document.getElementById('playButton');
const volumeSlider = document.getElementById("volumeSlider");
const navBar = document.getElementById("navBar");
const userInput = document.getElementById("userInput");
const saveButton = document.getElementById("saveButton");
const reviewInput = document.getElementById("reviewInput");
const emailInput = document.getElementById("emailInput");
const userEmailInput = document.getElementById("userEmailInput");
const subscribeBtn = document.getElementById("subscribeBtn");
const validEmail = document.getElementById("validEmail");


video.volume = volumeSlider.value;

// Function to open video overlay
function openOverlay(videoSrc) {
    overlay.style.display = "flex";
    video.src = videoSrc;
    video.load();
    video.play();
    navBar.style.display = "none";
}

// Function to close video overlay
function closeOverlay() {
    overlay.style.display = "none";
    video.pause();
    video.currentTime = 0;
    navBar.style.display = "flex";
}

// Event: Close overlay when video ends
video.addEventListener("ended", () => {
    closeOverlay();

    // If the main video just ended, reveal the buttons
    if (hiddenButtons.style.display === "none") {
        hiddenButtons.style.display = "flex";
        brickscapeT.style.display = "none";
    }
});

// Manual close button for overlay
closeBtn.addEventListener("click", () => {
    closeOverlay();
    hiddenButtons.style.display = "flex";
    brickscapeT.style.display = "none";
});

// Open the main video overlay
openMainVideoBtn.addEventListener("click", () => {
    openOverlay("videos/brick_1st.mp4");  
    hiddenButtons.style.display = "none";
});

upperLeft.addEventListener("click", () => {
    openOverlay("videos/video-1.mp4"); 
    hiddenButtons.style.display = "none";
});
upperRight.addEventListener("click", () => {
    openOverlay("videos/video-2.mp4");
    hiddenButtons.style.display = "none"; 
});
bottomLeft.addEventListener("click", () => {
    openOverlay("videos/video-3.mp4"); 
    hiddenButtons.style.display = "none"; 
});
bottomRight.addEventListener("click", () => {
    openOverlay("videos/video-4.mp4"); 
    hiddenButtons.style.display = "none";
});

playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.innerHTML = '❚❚'; 
    } else {
        video.pause();
        playButton.innerHTML = '▶'; 
    }
});

volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
    console.log("Volume set to:", video.volume);
});

fetch("reviews.json")
    .then(response => response.json())
    .then(reviewsData => { 
        const reviewsContainer = document.getElementById("reviewss");
        let htmlContent = "";

        reviewsData.forEach(review => {
            htmlContent += `
                <div class="a-review">
                    <h3>${review.title}</h3>
                    <p>${review.post}</p>
                </div>
            `;
        });

        reviewsContainer.innerHTML = htmlContent;
    })
    .catch(error => console.error('Error loading review posts:', error));

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let nextId = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;

saveButton.addEventListener("click", () => {
    saveButton.style.backgroundColor = "#FFB8F5";
    setTimeout(() => {
        saveButton.style.backgroundColor = "#84009E";
    }, 500);
});

function toggleSaveButton() {
    const reviewValue = reviewInput.value.trim();
    const emailValue = emailInput.value.trim();

    saveButton.disabled = !(reviewValue !== "" && emailValue !== "");
}

reviewInput.addEventListener("input", toggleSaveButton);
emailInput.addEventListener("input", toggleSaveButton);

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

subscribeBtn.addEventListener("click", () => {
    const userEmailValue = userEmailInput.value.trim();
    if(isValidEmail(userEmailValue) == false) {
        validEmail.style.display = "block";
        setTimeout(() => {
            validEmail.style.display = "none";
        }, 2000);
    }
    else {
        subscribeBtn.style.backgroundColor = "#FFB8F5";
        setTimeout(() => {
            subscribeBtn.style.backgroundColor = "#84009E";
        }, 500);
        userEmailInput.value = "";
        toggleSubscribeButton();
    }
});
userEmailInput.addEventListener("input", toggleSubscribeButton);