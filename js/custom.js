let source, animationId;
const audioContext = new AudioContext;

let analyser = audioContext.createAnalyser();
analyser.fftSize = 128;
analyser.connect(audioContext.destination);

let gainNode = audioContext.createGain();
gainNode.connect(analyser); 

let audioTag = document.getElementById('usermusic');
let pausebtn = document.getElementById('mplaypause')
//pausebtn.style.display ="none";

source = audioContext.createMediaElementSource(audioTag);
source.connect(gainNode);

function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

function execDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  let files = e.dataTransfer.files;
  let mimecheck = files[0].type;

  if (mimecheck.startsWith('audio')) {
    pausebtn.style.display = "inline";
    document.getElementById('output').innerHTML = files[0].name;
    let audiourl = URL.createObjectURL(files[0]);
    audioTag.setAttribute("src" , audiourl);
  }
}

let isPlay = false;

pausebtn.addEventListener("click", function(event){
  if (!isPlay) {
    audioTag.play();
    pausebtn.setAttribute("src" , "img/Orion_pause.png");
  } else {
    audioTag.pause();
    pausebtn.setAttribute("src" , "img/Orion_play.png");
  }
  isPlay = !isPlay;
});

let canvas        = document.getElementById('visualizer');
let canvasContext = canvas.getContext('2d');
canvas.setAttribute('width', analyser.frequencyBinCount * 10);

render = function(){
  let spectrums = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(spectrums);
　
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for(let i=0, len=spectrums.length; i<len; i++){
    canvasContext.fillStyle = 'rgba(255, 255, 255, 0.7)';
    if (i%3 === 0){
      canvasContext.fillRect(i*10, 80, 4, spectrums[i]/6);
      canvasContext.fillRect(i*10, 70, 4, 10);
      canvasContext.fillRect(i*10, 70, 4, -(spectrums[i]/6));
    } else if (i%5 === 0) {
      canvasContext.fillRect(i*10, 80, 4, spectrums[i]/2);
      canvasContext.fillRect(i*10, 70, 4, 10);
      canvasContext.fillRect(i*10, 70, 4, -(spectrums[i]/2));
    } else {
      canvasContext.fillRect(i*10, 80, 4, spectrums[i]/5);
      canvasContext.fillRect(i*10, 70, 4, 10);
      canvasContext.fillRect(i*10, 70, 4, -(spectrums[i]/5));
    }
  }
  animationId = requestAnimationFrame(render);
};

animationId = requestAnimationFrame(render);

//https://spotify-web-playback.glitch.me/#

window.onSpotifyWebPlaybackSDKReady = () => {

  let spimport = document.getElementById(sp_send);
  sp_send.addEventListener("click", function(event){
    
    let player = new Spotify.Player({
      name: 'A Spotify Web SDK Player',
      getOAuthToken: callback => {
        callback('BQA4HFm6EL9Z5Gb23m83w8B2zZVOmq4ljtsRXLSXBHvKkQyOFIPjIZNfdyjP2Pf_BIngSo13B2gGjqD8PVUxAdDPz8XQ0a_CI9ePfoSbz_AIl7T_mOtLpcpisx7AUQGVn5D97ABfmOzxO7rrsVcjQ9rEjD1S-B95ZmcJxv7Nc9hJMK8eYAS2X4U-__Rl');
      },
      volume: 1
    });
  
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
  
      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };
  
      play({
        playerInstance: player,
        spotify_uri: 'spotify:track:4ykXvy9fdC8sowUXD9Q1Bp',
      });
  
    });
  
    player.connect();
  
    player.on('player_state_changed', state => {
      console.log(state)
      document.getElementById('lpimg').setAttribute("src" , state.track_window.current_track.album.images[0].url);
      let srcpath = document.getElementById('lpimg').getAttribute('src');
      document.querySelector('body').style.backgroundImage = 'url(' + srcpath + ')'; 
      document.getElementById('output').innerHTML = state.track_window.current_track.name;
    });

  });
};