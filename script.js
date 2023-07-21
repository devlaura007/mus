// Select all the elements in the HTML page
// and assign them to a variable
const now_playing = document.querySelector(".now-playing");
const track_art = document.querySelector(".track-art");
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next-track");
const prev_btn = document.querySelector(".prev-track");

const seek_slider = document.querySelector(".seek_slider");
const volume_slider = document.querySelector(".volume_slider");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
const curr_track = new Audio();

// Define the list of tracks that have to be played
const track_list = [
  {
    name: "Night Owl",
    artist: "Broke For Free",
    image: "pix2.JPG",
    path: "mus/Maroon_5_-_Girls_Like_You_ft_Cardi_B_talkglitz.tv.mp3"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    image: "pix3.JPG",
    path: "mus/Sia_ft_Sean_Paul_-_Cheap_Thrills_(thinknews.com.ng).mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "pix5.JPG",
    path: "Shipping_Lanes.mp3"
  }
];

// Function to load and play the current track
function playTrack() {
  const track = track_list[track_index];
  curr_track.src = track.path;
  track_name.textContent = track.name;
  track_artist.textContent = track.artist;
  track_art.src = track.image;
  now_playing.textContent = `PLAYING ${track.name} - ${track.artist}`;
  curr_track.load();
  curr_track.play();
  isPlaying = true;
}

// Event listener for the play/pause button
playpause_btn.addEventListener("click", function () {
  if (isPlaying) {
    curr_track.pause();
    isPlaying = false;
  } else {
    curr_track.play();
    isPlaying = true;
  }
});

// Event listener for the next button
next_btn.addEventListener("click", function () {
  if (track_index === track_list.length - 1) {
    track_index = 0;
  } else {
    track_index++;
  }
  playTrack();
});

// Event listener for the previous button
prev_btn.addEventListener("click", function () {
  if (track_index === 0) {
    track_index = track_list.length - 1;
  } else {
    track_index--;
  }
  playTrack();
});

// Load and play the first track
playTrack();