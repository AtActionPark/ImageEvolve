// Consts for generation and mutation
var minSize = 1;
var minVertices = 3;
var maxVertices = 8;


// Create a "DNA" structure, containing all the genes : characteristics of a polygon
function DNA(){
  this.gene = [];
  this.oldGene = [];

  //gene[0] = position X
  this.gene.push(getRandomInt(0,CANVAS_WIDTH));
  //gene[1] = position Y
  this.gene.push(getRandomInt(0,CANVAS_HEIGHT));
  //gene[2] = nb of vertices
  this.gene.push(getRandomInt(4,5));
  //gene[3] = sizeX
  this.gene.push(getRandomInt(minSize,CANVAS_WIDTH/2));
  //gene[4] = sizeX
  this.gene.push(getRandomInt(minSize,CANVAS_HEIGHT/2));
  //gene[5] = color R
  this.gene.push(255);
  //gene[6] = color G
  this.gene.push(255);
  //gene[7] = color B
  this.gene.push(255);
  //gene[8] = color A
  this.gene.push(0.5);
  //gene[9] = seed - Optional, needed for random angles
  this.gene.push(getRandomInt(0,255));
  this.oldGene = cloneArray(this.gene);
}

// Mutate dna - alter the values of a set number of genes
DNA.prototype.mutate = function(){
  this.oldGene = cloneArray(this.gene);
  for(var i = 0;i<getRandomInt(minNumberOfMutations,maxNumberOfMutations+1);i++){
    var g = getRandomInt(0,this.gene.length);
    switch (g){
      // Position X
      case 0:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < 0)
            this.gene[g] = 0;
        if (this.gene[g] > CANVAS_WIDTH)
            this.gene[g] = CANVAS_WIDTH;
        break;

      // Position Y
      case 1:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < 0)
            this.gene[g] = 0;
        if (this.gene[g] > CANVAS_HEIGHT)
            this.gene[g] = CANVAS_HEIGHT;
        break;

      // number of vertices, randomly increase or decreases by 1
      case 2:
        if (getRandomInt(0,100)<50)
          this.gene[g] += 1;
        else
          this.gene[g] -= 1;
        if (this.gene[g] < minVertices)
            this.gene[g] = minVertices;
        if (this.gene[g] > maxVertices)
            this.gene[g] = maxVertices;
        break;

      // Size X
      case 3:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < minSize)
            this.gene[g] = minSize;
        break;

      // Size Y
      case 4:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < minSize)
            this.gene[g] = minSize;
        break;

      // Color : red
      case 5:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < 0)
            this.gene[g] = 0;
        if (this.gene[g] > 255)
            this.gene[g] = 255;
        break;

      // Color : green
      case 6:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < 0)
            this.gene[g] = 0;
        if (this.gene[g] > 255)
            this.gene[g] = 255;
        break;

      // Color : blue
      case 7:
        this.gene[g] += getRandomInt(-force,force);
        if (this.gene[g] < 0)
            this.gene[g] = 0;
        if (this.gene[g] > 255)
            this.gene[g] = 255;
        break;

      // Alpha
      case 8:
        this.gene[g] += getRandomInt(-force,force)/100;
        if (this.gene[g] < 0.1)
            this.gene[g] = 0.1;
        if (this.gene[g] > 1)
            this.gene[g] = 1;
        break;
    }
  }
}

// Reverts dna to his previous state
DNA.prototype.revert = function(){
  this.gene = this.oldGene;
}
