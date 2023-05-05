const form = document.querySelector('form');
const errorMessage = document.querySelector('#error-message');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "" || password === "") {
        errorMessage.textContent = "Không được để trống tài khoản hoặc mật khẩu !";
    } else if (username === "admin" && password === "admin123") {
      window.location.href = "./admin.html";
    } else {
        errorMessage.textContent = "Tài khoản hoặc mật khẩu không đúng !";
    }
});

  