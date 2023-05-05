let adminPost = JSON.parse(localStorage.getItem("posts")) || [];
const adminPostMain = document.getElementById("mainPosts");

function renderPostAdmin() {
  for (let i = 0; i < adminPost.length; i++) {
    adminPostMain.innerHTML += ` <div class="main_content_right_post">
        <div class="main_content_right_post_header">
            <a href=""><i class="bi bi-person-circle"></i><span class="name_user">
                   ${adminPost[i].userid} </span></a>
            <a href=""><i class="bi bi-bookmark"></i><i class="bi bi-three-dots-vertical"></i></a>
        </div>
        <div class="main_content_right_post_text">
            <h2>${adminPost[i].title}</h2>
        </div>
        <div class="main_content_right_post_body">
            <img src="${adminPost[i].image}" alt="">
        </div>
        <div class="main_content_right_post_footer">
        <button id="like_user" class="btn_content"><i class="bi bi-hand-thumbs-up"></i><span id='like'>${adminPost[i].like.length}</span></button>
        <button id="dislike_user" class="btn_content"><i class="bi bi-hand-thumbs-down"></i><span>${adminPost[i].dislike}</span></button>
        <button class="btn_content" id="comment-button"><i class="bi bi-chat-dots-fill"></i>
        <span>${adminPost[i].comment}</span></button>
        </div>
    </div>`;
  }
}

renderPostAdmin();

let likeButton = document.getElementById("like_user");
likeButton.addEventListener("click", function () {
  // Lấy giá trị userId từ localStorage
  const userIdString = localStorage.getItem("isLogin");
  if (userIdString) {
    const userId = JSON.parse(userIdString);
    console.log(userId.id);
    // Tăng giá trị like lên 1 hoặc xoá id nếu đã like trước đó
    for (let i = 0; i < adminPost.length; i++) {
      console.log(adminPost[i].like);
      if (adminPost[i]) {
        const index = adminPost[i].like.indexOf(userId.id);
        if (index === -1) {
          // Thêm id của user vào mảng like nếu chưa có
          adminPost[i].like.push(userId.id);
        } else {
          // Xoá id của user khỏi mảng like nếu đã có
          adminPost[i].like.splice(index, 1);
        }
        console.log("adminPost[i].like: ", adminPost[i].like);
        // Lấy phần tử span và cập nhật giá trị mới
        const spanElement = likeButton.querySelector("#like");
        spanElement.innerText = adminPost[i].like.length;
        break;
      }
    }
    // Cập nhật mảng adminPost mới vào localStorage
    localStorage.setItem("adminPost", JSON.stringify(adminPost));
  } else {
    console.log("User chưa đăng nhập!");
    // Thông báo cho người dùng đăng nhập trước khi thực hiện hành động này
    // Ví dụ:
    alert("Bạn cần đăng nhập để thực hiện hành động này!");
  }
});











// // Get the modal
// var modal = document.getElementById("comment-modal");

// // Get the button that opens the modal
// var btn = document.getElementById("comment-button");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// function comment(id) {
//   let textCmt = document.getElementById("comment-textarea").value;
//   let userNameInput = document.getElementById("comment-name");
//   let userName = userNameInput ? userNameInput.value : "Anonymous";
//   console.log(textCmt);
  
//   let adminPost = JSON.parse(localStorage.getItem("adminPost")) || [];
//   console.log(adminPost);
  
//   let postId = id;
//   let postIndex = adminPost.findIndex(post => post.id === postId);
//   if (postIndex === -1) {
//     console.error("Post not found");
//     return;
//   }
  
//   if (!adminPost[postIndex].comments || !Array.isArray(adminPost[postIndex].comments)) {
//     adminPost[postIndex].comments = []; // Nếu thuộc tính không tồn tại hoặc không phải là một mảng, khởi tạo một mảng rỗng để lưu trữ các bình luận.
//   }
  
//   adminPost[postIndex].comments.push({ user: userName, text: textCmt });
  
//   localStorage.setItem("adminPost", JSON.stringify(adminPost));
  
//   let commentList = document.getElementById("comment-list");
//   if (commentList !== null) {
//     let newComment = document.createElement("li");
//     newComment.textContent = textCmt;
//     commentList.appendChild(newComment);
//   } else {
//     console.error("comment-list element not found");
//   }
// }  

