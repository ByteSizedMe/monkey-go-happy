
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);

  //create a trex sprite
  monkey = createSprite(80,315,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //create a ground sprite
  ground = createSprite(400,350,800,20);
 
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  

  
}


function draw() {
   background("white");
  console.log(monkey.y);

  //jump when the space button is pressed
  if (keyDown("space")&&monkey.y >= 309) {
    
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.collide(ground);
  drawSprites();
  
  spawnFood();
  spawnObstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survivalTime: "+ survivalTime,200,200);

  
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,350,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    monkey.depth = banana.depth += 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
    
  }
  
  
  
  
}
function spawnObstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,320,40,10);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
  
    //add each cloud to the group
    obstacleGroup.add(obstacle);
    
  }
}






