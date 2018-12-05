let source, animationId;
const audioContext = new AudioContext;
const fileReader   = new FileReader;

let analyser = audioContext.createAnalyser();
analyser.fftSize = 128;
analyser.connect(audioContext.destination);

let gainNode = audioContext.createGain();
gainNode.connect(analyser); 

let audioTag = document.getElementById('usermusic');
source = audioContext.createMediaElementSource(audioTag);
source.connect(gainNode);

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
    document.getElementById('output').innerHTML = files[0].name;
    let url = URL.createObjectURL(files[0]);
    audioTag.setAttribute("src" , url);
    fileReader.readAsArrayBuffer(files[0]);
   
  }

  fileReader.onload = function(){

    audioContext.decodeAudioData(fileReader.result, function(buffer){

     // source.buffer = buffer;
      //source.start(0,0);
      //source.play();

      animationId = requestAnimationFrame(render);
        
      let pausebtn = document.getElementById('mplaypause')
      let isPlay = false;

      pausebtn.addEventListener("click", function(event){
        audioTag[!isPlay ? 'play' : 'pause']();
        isPlay = !isPlay;
        // if(audioContext.state === 'running') {
        //   pausebtn.setAttribute("src" , "img/Orion_play.png");
        //   audioContext.suspend();
        //   gainNode.gain.value = 0;
        //   canselAnimationFrame(animationId);
        // } else if(audioContext.state === 'suspended') {
        //   pausebtn.setAttribute("src" , "img/Orion_pause.png");
        //   audioContext.resume();
        //   gainNode.gain.value = 1;
        //   animationId = requestAnimationFrame(render);
        // }
      });

    });

  };
}