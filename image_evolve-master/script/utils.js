function getRandomInt(min,max){
   return Math.floor(Math.random() * (max - min)) + min;
}

// Handles the file select button, and draws the image to the canvas
// Modified version of the tutorial at :
// http://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var f = files[files.length-1];

  // Only process image files.
  if (!f.type.match('image.*')) {
    return;
  }

  var reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      // Render image.

      $('.baseline').remove();
      var div = document.createElement('img');
      div.className = 'baseline';
      div.src = e.target.result;
      document.getElementById('output').insertBefore(div, null);
      var height 
      var width 

      var img = new Image;
      img.onload = function() {
          width = img.width; 
          height = img.height; 
          setUpCanvas(width, height);
      };

      img.src = reader.result;
    };
  })(f);

  // Read in the image file as a data URL
  reader.readAsDataURL(f);
  var img = new Image;

img.onload = function() {
    alert(img.width);
};
}

//  Return a normalized difference between 2 colors
function compareColorsNormalized(r1,g1,b1,r2,g2,b2){
  var d = Math.sqrt((r2 - r1) * (r2 - r1) + (g2 - g1) * (g2 - g1) + (b2 - b1) * (b2 - b1));
  var p = d / Math.sqrt(3 * 255 * 255);
  return 100*p;
}

// Creates a new array and populates it with the content of another
function cloneArray(original){
  var clone = [];
  for(var i = 0;i<original.length;i++){
    clone.push(original[i]);
  }
  return clone;
}


function clonePopulation(original){
  var clone = new Population();
  clone.population = cloneArray(original.population);
  clone.fitness = original.fitness;
  clone.initialFitness = original.initialFitness;
  clone.oldFitness = original.oldFitness;
  return clone;
}

// Creates a random number generator that can be seeded for consistency when reverting polygons
// written by eBusiness at:
// http://stackoverflow.com/questions/424292/seedable-javascript-random-number-generator
function SeedRandom(state1,state2){
  var mod1=4294967087
  var mul1=65539
  var mod2=4294965887
  var mul2=65537
  if(typeof state1!="number"){
      state1=+new Date()
  }
  if(typeof state2!="number"){
      state2=state1
  }
  state1=state1%(mod1-1)+1
  state2=state2%(mod2-1)+1
  function random(limit){
      state1=(state1*mul1)%mod1
      state2=(state2*mul2)%mod2
      if(state1<limit && state2<limit && state1<mod1%limit && state2<mod2%limit){
          return random(limit)
      }
      return (state1+state2)%limit
  }
  return random
}

// Rounds a float to a set number of decimals
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// Transforms a number of ms into a h:m:s:ms string
// Written by RobG at:
// http://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}

// Set mutation functions change the value of the force, min & max number of mutations, depending on the max values
function setMutationToSoft(){
  minNumberbOfMutations = 1;
  maxNumberOfMutations = maxNumberOfMutationsCeiling/4;
  force = maxForce/8;
  randomMutations = false;
}

function setMutationToMedium(){
  minNumberbOfMutations = maxNumberOfMutationsCeiling/4;
  maxNumberOfMutations = maxNumberOfMutationsCeiling/2 +1;
  force = maxForce/4;
  randomMutations = false;
}

function setMutationToHard(){
  minNumberbOfMutations = maxNumberOfMutationsCeiling/2;
  maxNumberOfMutations = maxNumberOfMutationsCeiling;
  force = maxForce;
  randomMutations = false;
}

function setMutationToRandom(){
  var r = Math.random();
  if (r<0.33)
    setMutationToSoft();
  else if (r<0.66)
    setMutationToMedium();
  else
    setMutationToHard();
  randomMutations = true;
}


// Handlers function 
function handleMutationType(){
    $('input:radio').on('change',function(){
    switch ($(this).val().toString()) {
    case 'Soft':
      setMutationToSoft();
      break;
    case 'Medium':
      setMutationToMedium();
      break;
    case 'Hard':
      setMutationToHard();
      break;
    case 'Random':
      setMutationToRandom();
      break;
    }
  })
}

function changePolyCount(){
  populationSize = parseInt($('.polyNbChange').val());
  setUpCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
}

function handleSimulatedAnnealing(){
  $('.annealingBox').on('change',function(){
    doSimulatedAnnealing = !doSimulatedAnnealing;
    if(doSimulatedAnnealing)
      $('.optionalAnnealing').show();
    else
      $('.optionalAnnealing').hide();
  })
}

function handleRandomAnglesChange(){
  $('.randomAnglesChange').on('change',function(){
    randomAngles= !randomAngles;
  })
}

function handleReturnToBestChange(){
  $('.returnToBestChange').on('change',function(){
    returnToBest = !returnToBest;
  })
}

function handleIncreasePolyChange(){
  $('.increasePolyBox').on('change',function(){
    increasePoly = !increasePoly;
  })
}

function handleAlphaChange(){
  $('.alphaChange').on('change',function(){
    alpha = parseFloat($(this).val());
  })
  writeInfo();
}

function handleStepToReturnToBestChange(){
  $('.returnToBestChange').on('change',function(){
    stepsToReturnToBest = parseFloat($(this).val());
  })
}
function handleMinSizeChange(){
  $('.minSizeChange').on('change',function(){
    minSize = parseFloat($(this).val());
  })
}
function handleMinVerticesChange(){
  $('.minVerticesChange').on('change',function(){
    minVertices = parseFloat($(this).val());
  })
}
function handleMaxVerticesChange(){
  $('.maxVerticesChange').on('change',function(){
    maxVertices = parseFloat($(this).val());
  })
}
function handleMaxNbOfMutationsChange(){
  $('.maxNbOfMutationsChange').on('change',function(){
    maxNumberOfMutationsCeiling = parseFloat($(this).val());
  })
}

function handleTemperatureStepChange(){
  $('.temperatureStepChange').on('change',function(){
    maxTemperatureStep = parseFloat($(this).val());
  })
}

function increasePolyCountChange(){
  $('.increasePolyChange').on('change',function(){
    increasePolyCountMax = parseFloat($(this).val());
  })
}

function setUpHandlers(){
  handleMutationType();
  handleSimulatedAnnealing();
  handleAlphaChange();
  handleStepToReturnToBestChange();
  handleMinSizeChange();
  handleMinVerticesChange();
  handleMaxVerticesChange();
  handleMaxNbOfMutationsChange();
  handleTemperatureStepChange();
  handleRandomAnglesChange();
  handleReturnToBestChange();
  handleIncreasePolyChange();
  increasePolyCountChange();
}

$(document).ready(function() {
  // allows for side bar toggle
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });

  if (navigator.userAgent.search("Firefox") >= 0) {
    $('.alert').text('Bug on Firefox : images need to be loaded twice to be displayed');
    $('.alert').css('display',"block");
  }
});



