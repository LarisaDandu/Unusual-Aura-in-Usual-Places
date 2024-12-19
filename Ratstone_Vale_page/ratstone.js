const overlay = document.getElementById("videoOverlay");
const video = document.getElementById("videoElement");
const closeBtn = document.getElementById("closeBtn");
const arrowBtn = document.getElementById("arrowBtn");
const openMainVideoBtn = document.getElementById("openMainVideoBtn");
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

//Function to open video overlay
function openOverlay(videoSrc) {
    overlay.style.display = "flex";
    video.src = videoSrc;
    video.load();
    video.play();
    navBar.style.display = "none";
}

//Function to close video overlay
function closeOverlay() {
    overlay.style.display = "none";
    video.pause();
    video.currentTime = 0;
    navBar.style.display = "flex";
}

//Close overlay when video ends
video.addEventListener("ended", () => {
    closeOverlay();
});

//Close button for overlay
closeBtn.addEventListener("click", () => {
    closeOverlay();
    hiddenButtons.style.display = "flex";
    brickscapeT.style.display = "none";
});

//Function to open video over;ay when button is pressed
openMainVideoBtn.addEventListener("click", () => {
    openOverlay("videos/rat_first.mp4");  
});

const targetTimestamp = 2;
        let actionTriggered = false;

        video.addEventListener('timeupdate', () => {
                if (video.src.includes("rat_first.mp4")) {
                    if (Math.floor(video.currentTime) === targetTimestamp && !actionTriggered) {
                        actionTriggered = true;
                        console.log(`The video reached ${targetTimestamp} seconds!`);
                        arrowBtn.style.display = "block";
                        arrowBtn.addEventListener('click', () => {
                            closeOverlay();
                            openOverlay("videos/rat_second.mp4");
                            arrowBtn.style.display = "none";

                            const targetTimestamp1 = 6;
                            let actionTriggered1 = false;

                            video.addEventListener('timeupdate', () => {
                                if (video.src.includes("rat_second.mp4")) {
                                    if (Math.floor(video.currentTime) === targetTimestamp1 && !actionTriggered1) {
                                        actionTriggered1 = true;
                                        console.log(`The video reached ${targetTimestamp1} seconds!`);
                                        arrowBtn.style.display = "block";
                                        arrowBtn.addEventListener('click', () => {
                                            closeOverlay();
                                            openOverlay("videos/rat_last.mp4");
                                            arrowBtn.style.display = "none";
                                            
                                        });
                                    }
                                }
                            });

                        });
                    }
                }
        });

video.addEventListener('ended', () => {
    if (video.src.includes("rat_last.mp4")) {
        arrowBtn.style.display = "none";
    }
});

video.addEventListener('play', () => {
    if (video.src.includes("rat_last.mp4")) {
        arrowBtn.style.display = "none";
    }
});
arrowBtn.style.display = "none";
       
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