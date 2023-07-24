console.log(`
   dMMMMMP .aMMMb  dMMMMb  .aMMMb  dMP dMP .aMMMb  dMMMMb        .dMMMb    
      dMP dMP"dMP dMP dMP dMP"dMP dMP.dMP dMP"dMP dMP dMP       dMP" VP    
     dMP dMMMMMP dMP dMP dMMMMMP dMMMMK" dMMMMMP dMP dMP        VMMMb      
dK .dMP dMP dMP dMP dMP dMP dMP dMP"AMF dMP dMP dMP dMP       dP .dMP  amr 
VMMMP" dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP        VMMMP"  dMP

~ Let's go somewhere new.
`);

// Perform McKean-Vlasov process to randomly choose the video
function getRandomVideo() {
  const videoOptions = ["resources/circuits.mp4", "resources/landscape.mp4"];

  const alpha = 0.01; // Step size

  // Get Gaussian random number
  function gaussianRandom() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // Initialize the current video index randomly
  let currentIndex = Math.floor(Math.random() * videoOptions.length);

  // Simulate the process for a few steps
  for (let i = 0; i < 100; i++) {
    const drift = gaussianRandom();
    currentIndex = Math.max(0, Math.min(videoOptions.length - 1, currentIndex + alpha * drift));
  }

  // Get final video index
  const randomIndex = Math.round(currentIndex);

  return videoOptions[randomIndex];
}

function setVideoSource() {
  const videoElement = document.getElementById("background-video");
  const videoSourceElement = document.getElementById("video-source");
  const randomVideo = getRandomVideo();
  videoSourceElement.setAttribute("src", randomVideo);
  videoElement.load();
  videoElement.play();
}

window.onload = setVideoSource;
