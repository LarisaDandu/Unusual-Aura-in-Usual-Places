const userEmailInput = document.getElementById("userEmailInput");
const subscribeBtn = document.getElementById("subscribeBtn");
const validEmail = document.getElementById("validEmail");

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