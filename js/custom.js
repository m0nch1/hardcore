var source, animationId;
var audioContext = new AudioContext;
var fileReader   = new FileReader;

var analyser = audioContext.createAnalyser();
analyser.fftSize = 128;
analyser.connect(audioContext.destination);

var canvas        = document.getElementById('visualizer');
var canvasContext = canvas.getContext('2d');
canvas.setAttribute('width', analyser.frequencyBinCount * 10);

var render = function(){
  var spectrums = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(spectrums);
　
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  for(var i=0, len=spectrums.length; i<len; i++){
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

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

function execDrop(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;
  var mimecheck = files[0].type;

  if (mimecheck.startsWith('audio')) {
    document.getElementById('output').innerHTML = files[0].name;
    fileReader.readAsArrayBuffer(files[0]);
    source = audioContext.createBufferSource();
  }

  fileReader.onload = function(){

    audioContext.decodeAudioData(fileReader.result, function(buffer){

      source.buffer = buffer;
      source.connect(analyser);
      source.start(0,0);

      animationId = requestAnimationFrame(render);
        
      var pausebtn = document.getElementById('mplaypause')

      pausebtn.addEventListener("click", function(event){
        if(audioContext.state === 'running') {
          pausebtn.setAttribute("src" , "img/Orion_play.png");
          audioContext.suspend()
          animationId = requestAnimationFrame(render);
        } else if(audioContext.state === 'suspended') {
          pausebtn.setAttribute("src" , "img/Orion_pause.png");
          audioContext.resume()  
          animationId = requestAnimationFrame(render);
        }
      });

    });
  };
}




