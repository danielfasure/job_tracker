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