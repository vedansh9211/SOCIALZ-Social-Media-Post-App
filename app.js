document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const content = document.getElementById('content').value;
  
    const platforms = Array.from(document.getElementsByName('platform'))
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    const postData = {
      content,
      platforms
    };
  
    // Send the data to the server for posting
    fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      const responseDiv = document.getElementById('response');
      responseDiv.textContent = data.message;
      responseDiv.style.backgroundColor = '#c6efce';
    })
    .catch(error => {
      const responseDiv = document.getElementById('response');
      responseDiv.textContent = 'Error: ' + error.message;
      responseDiv.style.backgroundColor = '#ffc0c0';
    });
  });
  