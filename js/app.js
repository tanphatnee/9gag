// Hàm check trùng email
function isValidEmail(Email) {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(Email);
}
// Hàm check trùng mk
function isValidPassword(password) {
  if (password.length < 6) {
    return false;
  }
  return true;
}
// Hàm check mk trùng khớp
function doPasswordsMatch(password, repassword) {
  return password === repassword && isValidPassword(password);
}

//hàm đăng kí , lưu dư liệu lên locatroage
function register() {
  let userName = document.getElementById("username").value;
  let Email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let repassword = document.getElementById("repassword").value;
  let usernameErrorElement = document.getElementById("username_error");
  let emailErrorElement = document.getElementById("email_error");
  let passwordErrorElement = document.getElementById("password_error");
  let repasswordErrorElement = document.getElementById("repassword_error");

  if (userName == "") {
    usernameErrorElement.textContent = "Vui lòng nhập tên đăng nhập.";
    return;
  } else if (userName.length < 6 || userName.length > 20) {
    usernameErrorElement.textContent =
      "Tên đăng nhập phải có từ 6 đến 20 ký tự.";
    return;
  } else {
    usernameErrorElement.textContent = "";
  }

  if (Email == "") {
    emailErrorElement.textContent = "Vui lòng nhập email.";
    return;
  } else if (!isValidEmail(Email)) {
    emailErrorElement.textContent =
      "Email không đúng định dạng. Vui lòng nhập lại!";
    return;
  } else {
    emailErrorElement.textContent = "";
  }

  if (password == "") {
    passwordErrorElement.textContent = "Vui lòng nhập mật khẩu.";
    return;
  } else if (!isValidPassword(password)) {
    passwordErrorElement.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
    return;
  } else {
    passwordErrorElement.textContent = "";
  }

  if (repassword == "") {
    repasswordErrorElement.textContent = "Vui lòng nhập lại mật khẩu.";
    return;
  } else if (!doPasswordsMatch(password, repassword)) {
    repasswordErrorElement.textContent = "Mật khẩu nhập lại không khớp.";
    return;
  } else {
    repasswordErrorElement.textContent = "";
  }
  let user_info = JSON.parse(localStorage.getItem("user_info")) || [];
  let account = {
    userName: userName,
    Email: Email,
    password: password,
    id: user_info.length + 1,
  };
  user_info.push(account);
  localStorage.setItem("user_info", JSON.stringify(user_info));
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("repassword").value = "";
  let modalLogin = document.getElementById("modalLogin");
  let modalSignUp = document.getElementById("modalSignUp");
  modalSignUp.style.display = "none";
  modalLogin.style.display = "block";
}

// Hàm đăng nhập
function handleLogin() {
  const userlogin = JSON.parse(localStorage.getItem("user_info"));
  const username = document.querySelector("#login-form-username").value;
  const password = document.querySelector("#login-form-password").value;
  // let user_name_login_error = document.getElementById("user_name_login_error");
  let password_login_error = document.getElementById("password_login_error");

  // Kiểm tra xem tên đăng nhập và mật khẩu có được nhập vào không
  if (!username || !password) {
    password_login_error.innerText =
      "Vui lòng nhập tên đăng nhập hoặc mật khẩu !";
    return;
  }

  const user = userlogin.find(
    (user) => user.userName === username && user.password === password
  );

  if (!user) {
    password_login_error.innerText =
      "Tên đăng nhập hoặc mật khẩu không chính xác !";
    return;
  }

  if (user) {
    localStorage.setItem("isLogin", JSON.stringify(user));
    document.getElementById("modalLogin").style.display = "none";
    alert("đăng nhập thành công");
    document.getElementById("user_name_login").innerText = user.userName;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
  }
}

let btn_logout = document.getElementById("logout-btn");
document.getElementById("user_name_login").onclick = function () {
  if (btn_logout.style.display === "none") {
    btn_logout.style.display = "block";
  } else {
    btn_logout.style.display = "none";
  }
};

let updateLoginStatus = () => {
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  if (isLogin) {
    // Nếu đã đăng nhập, hiển thị user name và nút đăng xuất, ẩn nút đăng nhập
    document.getElementById("user_name_login").innerText = isLogin.userName;
    document.getElementById("signup-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";
  } else {
    // Ngược lại, ẩn user name và nút đăng xuất, hiển thị nút đăng nhập
    document.getElementById("user_name_login").innerText = "";
    document.getElementById("signup-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
  }
};

// Gọi hàm để cập nhật trạng thái đăng nhập khi trang được tải
updateLoginStatus();

let postBtn = document.getElementById("post-btn");

postBtn.addEventListener("click", () => {
  let isLogin = JSON.parse(localStorage.getItem("isLogin")); // Cập nhật giá trị mới nhất của biến isLogin
  if (isLogin) {
    window.location.href = "./post.html";
  } else {
    alert("Bạn cần đăng nhập trước khi post bài viết");
  }
});

// // Xử lý sự kiện khi người dùng click vào nút đăng xuất

function logout() {
  localStorage.removeItem("isLogin");

  // Ẩn username và nút đăng xuất, hiển thị nút đăng nhập/đăng ký
  document.getElementById("user_name_login").innerText = "";
  document.getElementById("signup-btn").style.display = "block";
  document.getElementById("logout-btn").style.display = "none";

  alert("Đăng xuất thành công!");
}

