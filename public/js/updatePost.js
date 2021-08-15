const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
    const postId = document.querySelector("#postId").textContent;

    console.log(postId);
  
    if (title && text) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
  
      if (response.ok) {
        document.location.replace("/api/users/dashboard");
      } else {
        alert(response.statusText);
      }
    }
};

document
.querySelector('#submit')
.addEventListener('click', updatePostFormHandler);


  