const deleteComment = async (event) => {
    const commentId = event.target.getAttribute("id");
  
    if (commentId) {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          document.location.replace("/api/users/dashboard");
        } else {
          alert(response.statusText);
        }
    }
};

const delBtns = document.querySelectorAll(".delete");
for (let i = 0; i < delBtns.length; i++) {
  delBtns[i].addEventListener("click", deleteComment);
};