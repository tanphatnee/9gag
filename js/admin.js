const form = document.getElementById("post-form");
const table = document.querySelector("table tbody");
const addButton = document.getElementById("submit-btn");
const sortButton = document.getElementById("sort-btn");
let posts = [];
let idCounter = 1;
const savedPost = localStorage.getItem("posts");
if (savedPost) {
  posts = JSON.parse(savedPost);
  renderPosts();
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const image = form.elements["image"].value;
  const userid = form.elements["post-name"].value;
  const title = form.elements["post-description"].value;
  const id = form.dataset.id;
  const like = form.dataset.like;
  const dislike = form.dataset.dislike;
  const comment = form.dataset.comment;
  if (id) {
    const index = posts.findIndex((post) => post.id == id);
    if (index >= 0) {
      const updatedPost = {
        id,
        image,
       userid,
        title,
        like,
        dislike,
       comment,
      };
      posts[index] = updatedPost;
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
      form.reset();
      addButton.textContent = "Add Post";
      delete form.dataset.id;
    }
  } else {
    const post = {
      id: idCounter,
      image,
     userid,
      title,
      like,
      dislike,
     comment,
    };
    idCounter++;
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    form.reset();
  }
});
function renderPosts() {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  } else {
    posts = [];
  }
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
  posts.forEach((post, index) => {
    post.id = index + 1;
  });
  posts.forEach((post) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${post.id}</td>
    <td><img src="${post.image}" width="100"></td>
    <td>${post.userid}</td>
    <td>${post.title}</td>
    <td>
      <button class="edit-btn" data-id="${post.id}">Edit</button>
      <button class="remove-btn" data-id="${post.id}">Remove</button>
    </td>
  `;
    tbody.appendChild(tr);
  });
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const index = posts.findIndex((post) => post.id == id);
      if (index >= 0) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();renderPostMain();
      }
    });
  });
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const index = posts.findIndex((post) => post.id == id);
      if (index >= 0) {
        const post = posts[index];
        form.dataset.id = id;
        form.elements["image"].value = post.image;
        form.elements["post-name"].value = post.userid;
        form.elements["post-description"].value = post.title;
        form.dataset.like = post.like;
        form.dataset.dislike = post.dislike;
        form.dataset.comment = post.comment;
        addButton.textContent = "Save";
      }
    });
  });

}
function renderPostMain() {
  let posts = JSON.parse(localStorage.getItem("posts_user")) || [];
  let post = JSON.parse(localStorage.getItem("posts")) || [];
  for (let i = 0; i < posts.length; i++) {
    post.push(posts[i]);
    localStorage.setItem("posts", JSON.stringify(post));
  }
}


