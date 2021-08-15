const delPost = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute("id");

    if (postId) {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          document.location.replace("/api/users/dashboard");
        } else {
          alert(response.statusText);
        }
      }
};

const btns = document.querySelectorAll(".deletePost");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", delPost);
};