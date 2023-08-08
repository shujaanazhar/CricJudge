const selectVideoButton = document.getElementById('select-video-button');
const videoInput = document.getElementById('video-input');
const videoContainer = document.getElementById('video-container');
const resultContainer = document.getElementById('result-container');
const loader = document.getElementById('loader');


let selectedFile = null;

selectVideoButton.addEventListener('click', function() {
  videoInput.click();
 
});

videoInput.addEventListener('change', function(event) {
  // Remove previous results
  resultContainer.innerHTML = '';

  selectedFile = event.target.files[0];
  const video = document.createElement('video');
  video.src = URL.createObjectURL(selectedFile);
  video.controls = true;
  video.style.width = '60%'; // Adjust the video width as desired
  video.style.height = '500px'; // Adjust the video height as desired
  videoContainer.innerHTML = '';
  videoContainer.appendChild(video);

  // Submit the form
  document.getElementById('video-form').submit();
  loader.style.display = 'block';
  setTimeout(function() {
    alert('Processing the file, please wait, this may take few seconds !!!');
  }, 3000); // Delay of 2 seconds (2000 milliseconds)


});

// Handle the response
document.getElementById('video-form').addEventListener('submit', function(event) {
  event.preventDefault();
  if (!selectedFile) {
    return;
  }

  loader.style.display = 'block';
  const formData = new FormData();
  formData.append('video', selectedFile);

  fetch('/', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      
      resultContainer.innerHTML = data;
      if (selectedFile) {
        scrollToResults(); // Scroll to the results section if a video is selected
      }
    })
    .catch(error => {
      console.error(error);
    });
});

function scrollToResults() {
  const resultContainer = document.getElementById('result-container');
  const offset = 145; // Adjust the offset value as desired

  // Scroll to the results section with an offset
  window.scrollTo({
    top: resultContainer.offsetTop + offset,
    behavior: 'smooth'
  });
}
