// Get the modal elements
let modalSignUp = document.getElementById("modalSignUp");
let modalLogin = document.getElementById("modalLogin");

// Get the button elements
let signUpBtn = document.getElementById("signup-btn");
let loginBtn = document.getElementById("login_btn");
let signUpModalBtn = document.querySelector(".signup_btn");

// When the user clicks the sign up/login button, show the corresponding modal
signUpBtn.onclick = function() {
  modalSignUp.style.display = "block";
  modalLogin.style.display = "none";
};

loginBtn.onclick = function() {
  modalSignUp.style.display = "none";
  modalLogin.style.display = "block";
};

// When the user clicks the close button, hide the modal
let closeBtns = document.getElementsByClassName("close");
for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].onclick = function() {
    modalSignUp.style.display = "none";
    modalLogin.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalSignUp || event.target == modalLogin) {
    modalSignUp.style.display = "none";
    modalLogin.style.display = "none";
  }
};

// When the user clicks the sign up modal button, hide the login modal and show the sign up modal
signUpModalBtn.onclick = function() {
  modalLogin.style.display = "none";
  modalSignUp.style.display = "block";
};
