const write_card = document.getElementById("write_card");

function addPost(e) {
  e.preventDefault();

  // Kiểm tra người dùng đã đăng nhập hay chưa
  const userid = JSON.parse(localStorage.getItem("isLogin"));
  if (!userid) {
    alert("Vui lòng đăng nhập trước khi đăng bài viết");
    return;
  }

  // Lấy giá trị các trường input
  const title = document.getElementById("post-name").value;
  const image = document.getElementById("post-image").value;

  // Kiểm tra các trường input có rỗng không
  if (!title || !image) {
    alert("Vui lòng nhập đủ thông tin");
    return;
  }

  // Lấy dữ liệu lưu trữ trong localStorage
  const savePost = JSON.parse(localStorage.getItem("posts")) || [];

  // Tạo object mới để lưu trữ thông tin bài viết
  const post = {
    id: savePost.length + 1,
    image: image,
    title: title,
    userid: userid.userName,
    like: [],
    dislike: [],
    comment: [],
  };

  // Thêm object mới vào danh sách bài viết và lưu vào localStorage
  savePost.push(post);
  localStorage.setItem("posts", JSON.stringify(savePost));

  // Hiển thị alert thành công và chuyển hướng về trang chủ
  alert("Đăng bài thành công");
  window.location.href = "./index.html";
}


function renderPosts() {
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const mainPosts = document.getElementById("mainPosts");
  mainPosts.innerHTML = "";
  savedPosts.forEach((post, index) => {
    post.id = index + 1;
    mainPosts.innerHTML += ` <div class="main_content_right_post">
          <div class="main_content_right_post_header">
              <a href=""><i class="bi bi-person-circle"></i><span class="name_user">
                     ${post.userid} </span></a>
              <a href=""><i class="bi bi-bookmark"></i><i class="bi bi-three-dots-vertical"></i></a>
          </div>
          <div class="main_content_right_post_text">
              <h2>${post.title}</h2>
          </div>
          <div class="main_content_right_post_body">
              <img src="${post.image}" alt="">
          </div>
          <div class="main_content_right_post_footer">
          <button id="like_user" class="btn_content"><i class="bi bi-hand-thumbs-up"></i><span>${post.like}</span></button>
          <button id="dislike_user" class="btn_content"><i class="bi bi-hand-thumbs-down"></i><span>${post.dislike}</span></button>
          <button class="btn_content" id="comment-button"><i class="bi bi-chat-dots-fill"></i>
          <span>${post.comment  }</span></button>

      </div>

      </div>`;
  });
}

let isLogin = JSON.parse(localStorage.getItem("isLogin"));
if (isLogin) {
  document.getElementById("nameUser").innerText = isLogin.userName;
} else {
  document.getElementById("user_name_login").innerText = "";

}

function logout() {
  localStorage.removeItem("isLogin");
  document.getElementById("user_name_login").innerText = "";
  document.getElementById("signup-btn").style.display = "block";
  document.getElementById("logout-btn").style.display = "none";

  alert("Đăng xuất thành công!");
}
