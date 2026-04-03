class Walker{
  constructor(loc, size, steps, separateColors,colored,alpControl,elp_visual){
    this.loc = loc;
    this.size = size;
    this.steps = steps;
    this.prevloc = [0,0];
    this.newloc = [0,0];
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.sepColors = separateColors;
    this.colored = colored;
    this.alpControl = alpControl;
    this.elp_visual = elp_visual;
    this.vel_factorX = 1;
    this.vel_factorY = 1;
  }
  display(){
    if (frameCount % 60 == 0){
      fill(255,0,0,100);
    } else {
      fill(0,0);
    }
    let diff_loc = map(abs(this.newloc[0]-this.prevloc[0]),0,2*this.steps,0,this.steps);
    let alp = map(diff_loc, 0, this.steps, 255*(1-this.alpControl),255*this.alpControl);
    //console.log(diff_loc);
    if (this.sepColors){
      if(diff_loc < this.steps/3){
        this.r = map(diff_loc, 0, this.steps/3,0,255);
      } else {
        this.r = 255;
      }
      if (diff_loc >= this.steps/3 && diff_loc < 2*this.steps/3){
        this.g = map(diff_loc, this.steps/3, 2*this.steps/3,0,255);
      } else{
        this.g = 255;
      }
      if (diff_loc >= 2*this.steps/3){
        this.b = map(diff_loc, 2*this.steps/3, this.steps,0,255);
      } else{
        this.b = 255;
      }
    } else {
      if(diff_loc < this.steps/3){
        this.r = map(diff_loc, 0, this.steps/3,0,255);
      } else if (diff_loc >= this.steps/3 && diff_loc < 2*this.steps/3){
        this.g = map(diff_loc, this.steps/3, 2*this.steps/3,0,255);
      } else if (diff_loc >= 2*this.steps/3){
        this.b = map(diff_loc, 2*this.steps/3, this.steps,0,255);
      }
    }
    if (this.colored){
      stroke(this.r,this.g,this.b,alp);
      
    } else{
      stroke(alp,alp);
    }
    strokeWeight(2);
    if(this.elp_visual){
      ellipse(this.loc[0], this.loc[1], -(this.prevloc[0]-this.newloc[0]), -(this.prevloc[0]-this.newloc[0]));
    }
    this.prevloc[0] = this.loc[0];
    this.prevloc[1] = this.loc[1];
    
  }
  movement(){
    let rand_stepsX = randomGaussian(0,this.steps);
    let rand_stepsY = randomGaussian(0,this.steps);
    // Teleporting Boundary Condition: Teleport the particles randomly across the screen when they moved beyond the boundaries

    if((this.loc[0] > width/2) || (this.loc[0] < -width/2) || (this.loc[1] > height/2) || (this.loc[1] < -height/2)){
      this.loc[0] = random(-width/2, width/2);
      this.loc[1] = random(-height/2,height/2);
      this.vel_factorX *= -1;
      this.vel_factorY *= -1;
      console.log(this.vel_factorX);
      console.log(this.vel_factorY);
    }
    this.loc[0] += this.vel_factorX*rand_stepsX;
    this.loc[1] += this.vel_factorY*rand_stepsY;
    this.newloc[0] = this.loc[0];
    this.newloc[1] = this.loc[1];
    if (frameCount > 1){
      line(this.prevloc[0],this.prevloc[1],this.newloc[0],this.newloc[1]);
    }
  }
  
}