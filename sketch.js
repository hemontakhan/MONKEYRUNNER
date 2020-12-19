var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var score;

function preload(){
  
  //load the images of objects
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {

 //create sprites for monkey and ground
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving", monkey_running);
 monkey.scale = 0.1;
 
 ground = createSprite(400,350,900,10);
 ground.velocityX = -4;
 ground.x = ground.width/2;
 console.log(ground.x);
  
}

function draw() {
 background(255);

 //create score board to display lifetime
 var survivalTime = 0;
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ score,100,50);

 //make the ground move endlessly
 if(ground.x<0){
    ground.x = ground.width/2;
    }
  
 //make the monkey jump when space is pressed
 if(keyDown("space")&& monkey.y >= 200) {
     monkey.velocityY = -12;
   }
  

  //add gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //make the monkey collide with the ground
  monkey.collide(ground);
  
  //call the functions of bananas and obstacles to create them
  rockObstacles();
  fuelBananas();
  
  drawSprites(); 
}

//create function for obstacles to add all their properties
function rockObstacles(){
 if (frameCount % 300 === 0){
 var obstacle = createSprite(400,315,10,20);
 obstacle.addImage(obstacleImage);
 obstacle.velocityX = -(6 + score/10);
 //assign scale and lifetime to the obstacle           
 obstacle.scale = 0.2;
 obstacle.lifetime = 300;
 }
}

//create function for bananas to add all their properties
function fuelBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
  var banana = createSprite(600,150,40,10);
  banana.y = Math.round(random(80,120));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -3;
    
  //assign lifetime to the variable
  banana.lifetime = 200;
  
  //adjust the depth of images
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  }
}