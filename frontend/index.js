
let login_portal = document.querySelector(".login_div");
let register_portal = document.querySelector(".register_div");



let button_change_register = document.querySelector(".change_register_button");
button_change_register.addEventListener("click",()=>{

    register_portal.classList.remove("hidden")
      login_portal.classList.add("hidden")
});


let button_change_login = document.querySelector(".change_login_button");
button_change_login.addEventListener("click",()=>{
    

  register_portal.classList.add("hidden")
 login_portal.classList.remove("hidden")
});