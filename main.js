// Select all the elements in the HTML page and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Girls like you",
    artist: "maroon_5 ft Cardi_B",
    image: "Image URL",
    path: "mus/Maroon_5_-_Girls_Like_You_ft_Cardi_B_talkglitz.tv.mp3"
  },
  {
    name: "cheap thrills",
    artist: "Sia ft Sean_Paul",
    image: "Image URL",
    path: "mus/Sia_ft_Sean_Paul_-_Cheap_Thrills_(thinknews.com.ng).mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "Image URL",
    path: "Shipping_Lanes.mp3",
  },
];

// Function to initialize the player
function initPlayer() {
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update the track details
  track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = `PLAYING ${track_index + 1} OF ${track_list.length}`;

  // Reset seek slider and duration
  seek_slider.value = 0;
  curr_time.textContent = "00:00";
  total_duration.textContent = formatTime(curr_track.duration);
  updateTimer = setInterval(updateTime, 1000)
}

// ...

// function initPlayer() {
//   // ...
  
//   clearInterval(updateTimer);
//   updateTimer = setInterval(updateTime, 1000);
// }

// function playpauseTrack() {
//   if (curr_track.paused) {
//     // Play the track
//     curr_track.play();
//     isPlaying = true;
//     playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
//     updateTimer = setInterval(updateTime, 1000);
//   } else {
//     // Pause the track
//     curr_track.pause();
//     isPlaying = false;
//     playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
//     clearInterval(updateTimer);
//     updateTimer = null;
//   }
// }

// ...

// Function to format time in MM:SS format
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Play/Pause button click event
playpause_btn.addEventListener("click", playpauseTrack);

// Function to play or pause the track
function playpauseTrack() {
  if (curr_track.paused) {
    // Play the track
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  } else {
    // Pause the track
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
}



// Previous button click event
prev_btn.addEventListener("click", prevTrack);

// Function to play the previous track
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = track_list.length - 1;
  }
  initPlayer();
  playpauseTrack();
}

// Next button click event
next_btn.addEventListener("click", nextTrack);

// Function to play the next track
function nextTrack() {
  if (track_index < track_list.length - 1) {
    track_index += 1;
  } else {
    track_index = 0;
  }
  initPlayer();
  playpauseTrack();
}

// Seek slider change event
seek_slider.addEventListener("change", seekTo);

// Function to update the current time of the track
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

// Volume slider change event
volume_slider.addEventListener("change", setVolume);

// Function to set the volume level
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Update the current time and seek slider position
function updateTime() {
  curr_time.textContent = formatTime(curr_track.currentTime);
  seek_slider.value = (curr_track.currentTime / curr_track.duration) * 100;
}

// Initialize the player and start playing the first track
initPlayer();
playpauseTrack();

// Add event listener to handle when the audio ends
curr_track.addEventListener('ended', function () {
    nextTrack();
  });
  