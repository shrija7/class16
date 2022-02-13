var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
 
 //animation for trex is loaded
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  //ground image is loaded
  groundImage = loadImage("ground2.png");
  
  //cloud image is loaded
  cloudImage = loadImage("cloud.png");
  
  //images of obstacles are loaded
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  //image for gameover is loaded
  gameover1 = loadImage("gameOver.png")
  
  //image foe restart is loaded
  restart1 = loadImage("restart.png")
}


function setup() {
 
 //canvas is created
  createCanvas(600, 200);
  
  //trex is created ,given animation and is resized
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  //ground is created, given inamge and is made to restart after it is finished
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  //gameover is cretaed ,resized and given image
  gameover = createSprite(300,100)
  gameover.addImage(gameover1)
  gameover.scale=0.5

  //restart is cretaed ,resized and given image
  restart = createSprite(300,125)
  restart.addImage(restart1)
  restart.scale=0.5

  //invisible ground is created
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //groups of obstacles and clouds are created
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
   
   background(180);
  
   //score is made to be visible 
   text("Score: "+ score, 500,50);
  
  
   //gamestate play
   if(gameState === PLAY){
       
    ground.velocityX = -4;
   
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();

    gameover.visible=false
    restart.visible=false

    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
     gameover.visible=true
     restart.visible=true

     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   
  var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

