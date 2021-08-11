const commentFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#newComment').value.trim();
    const postId = document.querySelector("#postId").textContent;
  
    if (text) {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ text, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
};

document
.querySelector('#comment-form')
.addEventListener('click', commentFormHandler);


  