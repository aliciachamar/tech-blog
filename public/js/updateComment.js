const updateComment = async (event) => {
  event.preventDefault();

  const commentId = event.target.getAttribute("id");
  const text = document.querySelector("#text").value.trim();

    if (commentId) {
      response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace("/api/users/dashboard");
      } else {
        alert(response.statusText);
      }
    }
};

const updateBtns = document.querySelectorAll(".update");
for (let i = 0; i < updateBtns.length; i++) {
  updateBtns[i].addEventListener("click", updateComment);
};

