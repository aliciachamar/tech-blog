const newPostFormHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#text').value.trim();
  
    if (title && text) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, text }),
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
.querySelector('#submit')
.addEventListener('click', newPostFormHandler);


  