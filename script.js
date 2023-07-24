console.log(`
   dMMMMMP .aMMMb  dMMMMb  .aMMMb  dMP dMP .aMMMb  dMMMMb        .dMMMb    
      dMP dMP"dMP dMP dMP dMP"dMP dMP.dMP dMP"dMP dMP dMP       dMP" VP    
     dMP dMMMMMP dMP dMP dMMMMMP dMMMMK" dMMMMMP dMP dMP        VMMMb      
dK .dMP dMP dMP dMP dMP dMP dMP dMP"AMF dMP dMP dMP dMP       dP .dMP  amr 
VMMMP" dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP dMP        VMMMP"  dMP

Let's go somewhere new
github.com/janakan2466
`);

// Perform McKean-Vlasov process to randomly choose the video
function getRandomVideo() {
  const videoOptions = ["resources/circuits.mp4", "resources/landscape.mp4"];

  const alpha = 0.01;

  // Get Gaussian random number
  function gaussianRandom() {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  let currentIndex = Math.floor(Math.random() * videoOptions.length);

  // Simulate the process in iterations
  for (let i = 0; i < 100; i++) {
    const drift = gaussianRandom();
    currentIndex = Math.max(0, Math.min(videoOptions.length - 1, currentIndex + alpha * drift));
  }

  const randomIndex = Math.round(currentIndex);

  return videoOptions[randomIndex];
}

function setVideoSource() {
  const videoElement = document.getElementById("background-video");
  const videoSourceElement = document.getElementById("video-source");
  const randomVideo = getRandomVideo();
  const isLandscapeVideo = randomVideo.includes("landscape.mp4");
  if (isLandscapeVideo) {
    videoElement.classList.add("landscape");
  }
  videoSourceElement.setAttribute("src", randomVideo);
  videoElement.load();
  videoElement.play();
}

window.onload = function () {
  document.body.classList.remove("loading");
  const videoElement = document.getElementById("background-video");
  videoElement.onerror = function () {
    document.body.style.backgroundColor = "#000000";
    videoElement.style.display = "none";
  };
  setVideoSource();
  document.addEventListener("visibilitychange", handleVisibilityChange);
  function handleVisibilityChange() {
    if (document.hidden) {
      document.body.style.backgroundColor = "#000000";
    } else {
      document.body.style.backgroundColor = "";
    }
  }
};







