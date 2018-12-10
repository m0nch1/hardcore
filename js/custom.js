let source, animationId;
const audioContext = new AudioContext;

let analyser = audioContext.createAnalyser();
analyser.fftSize = 128;
analyser.connect(audioContext.destination);

let gainNode = audioContext.createGain();
gainNode.connect(analyser); 

let audioTag = document.getElementById('usermusic');
let pausebtn = document.getElementById('mplaypause')

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

  pausebtn.setAttribute("src" , "img/Orion_play.png");

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

  let spbtn = document.getElementById('sp_btn');
  spbtn.addEventListener("click", function(event){
    
    let spurl = document.getElementById('sp_url').value;

    spurl = 'spotify:track:' + spurl.slice(-22);

    pausebtn.setAttribute("src" , "img/Orion_pause.png");
    pausebtn.style.display = "inline";

    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;

    const authEndpoint = 'https://accounts.spotify.com/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = '285998fe3500467bb715878d0a767dbf';
    const redirectUri = 'https://m0nch1.github.io/visual-mv/';
    const scopes = [
      'streaming',
      'user-read-private',
      'user-modify-playback-state',
      'app-remote-control'
    ];

    // If there is no token, redirect to Spotify authorization
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }
    
    let player = new Spotify.Player({
      name: 'A Spotify Web SDK Player',
      getOAuthToken: callback => {
        callback(_token);
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
        getOAuthToken(_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${_token}`
            },
          });
        });
      };
  
      play({
        playerInstance: player,
        spotify_uri: spurl,
      });
  
    });
  
    player.connect();
  
    player.on('player_state_changed', state => {
      document.getElementById('lpimg').setAttribute("src" , state.track_window.current_track.album.images[0].url);
      let srcpath = document.getElementById('lpimg').getAttribute('src');
      document.querySelector('body').style.backgroundImage = 'url(' + srcpath + ')'; 
      document.getElementById('output').innerHTML = state.track_window.current_track.name;
    });

    pausebtn.addEventListener("click", function(event){

      let statechk = pausebtn.getAttribute('src');

      if (statechk === 'img/Orion_play.png') {
        player.resume().then(() => {
          pausebtn.setAttribute("src" , "img/Orion_pause.png");
        });
      } else {
        player.pause().then(() => {
          pausebtn.setAttribute("src" , "img/Orion_play.png");
        });
      }
    });

  });
};