// Population of polygons - The result image
function Population(){
  this.population = [];
  this.fitness = 0;
  this.oldFitness = 0;
  this.initialFitness;
}

// Populate with a set number of polygons
Population.prototype.setup = function(size){
  this.population = [];
  for (var i = 0; i < size; i++)
    this.population.push(new Polygon());
}

// Computes initial fitness, kept as a reference
Population.prototype.setInitialFitness = function(){
  this.computeFitness();
  this.initialFitness = this.fitness;
  this.oldFitness = this.fitness;
  this.fitness = 0;
}

// Draw all the polygons, and compares to the original, pixel by pixel
Population.prototype.computeFitness = function(){
  this.draw();
  this.oldFitness = this.fitness;
  this.fitness = 0;
  imgd = canvas.getImageData(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  data = imgd.data;

  for(var i = 0; i < data.length; i += 4) {
    this.fitness += compareColorsNormalized(baselineData[i],baselineData[i+1],baselineData[i+2],data[i],data[i+1],data[i+2]);
  }

  this.fitness /= CANVAS_WIDTH*CANVAS_HEIGHT;

  // 100 - fitness returns a number that goes from 0 (opposite of result) to 100 (equal to result)
  this.fitness = 100-this.fitness;
}

Population.prototype.mutate = function(rand){
  this.population[rand].mutate();
  // Pushe the mutated polygon to the front, makes sure it is not hidden
  //var poly = this.population[rand];
  //this.population.splice(rand,1);
  //this.population.push(poly);
}

Population.prototype.revert = function(rand){
  this.population[rand].revert();
  this.fitness = this.oldFitness;

  // Puts backs the reverted polygon to his original place in the population
  //var poly = this.population[rand];
  //this.population.splice(rand,0,poly);
  //this.population.pop();
}

Population.prototype.draw = function(){
  canvas.fillStyle = "white";
    canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0;i< this.population.length;i++)
    this.population[i].draw();
}

