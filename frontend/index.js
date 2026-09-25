let login_portal = document.querySelector(".login_div");
let register_portal = document.querySelector(".register_div");

let button_change_register =
    document.querySelector(".change_register_button");

if (button_change_register) {
    button_change_register.addEventListener("click", () => {
        register_portal.classList.toggle("hidden");
        login_portal.classList.toggle("hidden");
    });
}


let button_change_login =
    document.querySelector(".change_login_button");

if (button_change_login) {
    button_change_login.addEventListener("click", () => {
        register_portal.classList.toggle("hidden");
        login_portal.classList.toggle("hidden");
    });
}


console.log("APPLICATION JS LOADED");

const viewApplicationButton =
    document.getElementById("viewApplicationbutton");

const viewApplication =
    document.getElementById("viewApplication");

console.log(viewApplicationButton);
console.log(viewApplication);

if (viewApplicationButton && viewApplication) {
    viewApplicationButton.addEventListener("click", () => {
        console.log("BUTTON CLICKED");

        viewApplication.classList.toggle("hidden");
        
    });
}


const applicationHeaders = document.querySelectorAll(".application-header");

applicationHeaders.forEach(header => {

    header.addEventListener("click", () => {

        const card = header.closest(".application-card");

        card.classList.toggle("active");

    });

});


// SETTINGS
const editPasswordButton = document.querySelector("#edit_password_button");
const editEmailButton = document.querySelector("#edit_email_button");

const passwordDisplay = document.querySelector("#password_display");
const passwordInput = document.querySelector("#password_input");

const emailDisplay = document.querySelector("#email_display");
const emailInput = document.querySelector("#email_input");


if (editPasswordButton) {

    editPasswordButton.addEventListener("click", () => {

        const editing = !passwordInput.classList.contains("hidden");

        if (editing) {

            // CANCEL
            passwordInput.value = "";

            passwordInput.classList.add("hidden");
            passwordDisplay.classList.remove("hidden");

            editPasswordButton.innerHTML =
                `<i class="bi bi-pencil-square"></i> Edit`;

        } else {

            // EDIT
            passwordInput.classList.remove("hidden");
            passwordDisplay.classList.add("hidden");

            editPasswordButton.innerHTML =
                `<i class="bi bi-x-circle"></i> Cancel`;

            passwordInput.focus();
        }

    });

}


if (editEmailButton) {

    editEmailButton.addEventListener("click", () => {

        const editing = !emailInput.classList.contains("hidden");

        if (editing) {

            // CANCEL
            emailInput.value = emailDisplay.textContent.trim();

            emailInput.classList.add("hidden");
            emailDisplay.classList.remove("hidden");

            editEmailButton.innerHTML =
                `<i class="bi bi-pencil-square"></i> Edit`;

        } else {

            // EDIT
            emailInput.classList.remove("hidden");
            emailDisplay.classList.add("hidden");

            editEmailButton.innerHTML =
                `<i class="bi bi-x-circle"></i> Cancel`;

            emailInput.focus();
        }

    });

}