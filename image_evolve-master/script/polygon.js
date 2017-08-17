// Allows for randomisation in polygon shapes
// Better result but more time consuming
var randomAngles = true;

// Basic Shape. Contains a dna (array of "genes", defining the polygon position, shape, color...)
function Polygon(){
  this.dna = new DNA();
  this.setUp();
}

// Calculate poygon data (vertices position, color...)
// Has to be computed every time a polygon is mutated or reverted
Polygon.prototype.setUp = function(){
  // Random angles uses the 9nth gene :
  //  a seed needed to be able te revert if needed with the same value
  if(randomAngles)
    this.seed=SeedRandom(this.dna.gene[9]);
  this.position = [this.dna.gene[0],this.dna.gene[1]];
  this.verticesCount = this.dna.gene[2];
  this.size = [this.dna.gene[3], this.dna.gene[4]];
  this.color =  "rgba(" + this.dna.gene[5] + "," + this.dna.gene[6] + "," + this.dna.gene[7] + "," + this.dna.gene[8] +")";

  // Vertices are computed by taking the center of the polygon (his position).
  // The first one is directly up (center + size),
  //  other ones are computed with an angle (random or regular)
  this.vertices = [];
  this.vertices.push(this.position );
  this.angle = 0;
  for (var i = 0; i < this.verticesCount; i++)
  {
    var pos = [this.position[0] + this.size[0]/2*Math.cos(this.angle), this.position[1] +this.size[1]/2*Math.sin(this.angle)];
    this.vertices.push(pos);
    if(randomAngles)
      this.angle += (80 + this.seed(100))/100;
    else
      // regular polygon, all angles are equal
      this.angle += 2*Math.PI/(this.verticesCount);
  }
}

// Draws the polygon, goes from vertice to vertice (exluding the first, representing the center)
//  and filling it
Polygon.prototype.draw = function(){
  canvas.fillStyle = this.color;
  canvas.lineWidth = 1.0; 
  canvas.beginPath();
  canvas.moveTo(this.vertices[1][0], this.vertices[1][1]);
  for(var i = 2;i<=this.verticesCount;i++){
    canvas.lineTo(this.vertices[i][0], this.vertices[i][1]);
  }
  canvas.lineTo(this.vertices[1][0], this.vertices[1][1])
  canvas.closePath();
  canvas.fill();
}

// Mutates the polygon dna and recomputes the characteristics
Polygon.prototype.mutate = function(nbMutation,force){
  this.dna.mutate(nbMutation,force);
  this.setUp();
}

// Reverts the polygon to his old self
Polygon.prototype.revert = function(){
  this.dna.revert();
  this.setUp();
}

