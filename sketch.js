var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var mario;
var ground;
var obstacle,obstacle2,turtle,flower;
var cloud;
var cloudGroup,obstacleGroup,coinGroup;
var invisible;
var score = 0;
var castle;




function preload(){

  marioImg = loadAnimation("mario2.png","mario1.png");
  collided = loadImage("mario2.png");
  groundImg = loadImage("OIP (3).jpg");
  obstacleImg = loadImage("Untitled-3.png")
  cloudImg = loadImage("cloud.png");
  turtleImg = loadImage("turtle.png");
  flowerImg = loadImage("flower.png");
  startScreen = loadImage("start.png");
  coinImg = loadImage("coin.png");
  castleImg = loadImage("SMBCastle.png");
  
  mariodie = loadSound("mario-die.wav");
  jump = loadSound("jump.wav");
  coinS = loadSound("coin.wav");
  
}



function setup(){
  createCanvas(530,530);
  
  ground = createSprite(300,250,10,10);
  ground.addImage(groundImg);
  ground.scale = 4;
  ground.velocityX = -(5 + score/2);
  
  mario = createSprite(70,480,10,10);
  mario.addAnimation("run",marioImg);
  mario.scale = 0.1;
  mario.addAnimation("stand",collided); 
  mario.debug = false;
  
  invisible = createSprite(300,500,600,10);
  invisible.visible = false;
  
  obstacleGroup = new Group;
  cloudGroup = new Group;
  coinGroup = new Group;
  
  
  
}




function draw(){
  background("lightBlue");
  
   text("Score : "+ score, 400,50);
  
  console.log(score);
  
  mario.collide(invisible);
  
  
 if(gameState === PLAY){
  
  if(ground.x<0 || invisible.x<0){
    
   ground.x = ground.width/2;
   invisible.x = invisible.width/2;
   
    }
  
   if(keyDown("space") && mario.y >= 477 && gameState === PLAY){
      
      mario.velocityY = -10;
      jump.play();
      
      }
      
     mario.velocityY = mario.velocityY + 0.4;
  
  console.log(mario.y);

   if(mario.isTouching(coinGroup)){
      
     coinGroup.destroyEach();
     score = score + 1;
  coinS.play();
      
      }
   
   
  obstacles();
  clouds();
   coins();
  
     if(mario.isTouching(obstacleGroup)){
     
    gameState = END;
    
    mariodie.play();
    
     }
}
  
  if(gameState === END){
     
     ground.velocityX = 0;
     
     mario.changeAnimation("stand",collided); 

     mario.velocityY = 0;
    
     obstacleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);  

 coinGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
coinGroup.setLifetimeEach(-1);    
    
     }
     
  
  drawSprites();
}

function obstacles(){
 
  if(frameCount%100 === 0){
 var rand = Math.round(random(1,3));
  
  if(rand === 1){
    obstacle = createSprite(550,455,10,10);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX= -(5 + score/2);
    obstacle.scale = 0.45 ;
    obstacle.liftime = 110;
    
    obstacleGroup.add(obstacle); 
    
    
  } else if(rand  ===  2){
 
    obstacle2 = createSprite(550,470,10,10);
    obstacle2.addImage(obstacleImg);
    obstacle2.velocityX= -(5 + score/2);
    obstacle2.scale = 0.3; 
    obstacle2.lifetime = 110;
  
    obstacleGroup.add(obstacle2); 
}
  else if(rand === 3){
          
    flower = createSprite(530,480,10,10); 
    flower.addImage(flowerImg);  
    flower.scale = 0.2;
    flower.velocityX = -(5 + score/2);  
    flower.debug = false;
    flower.setCollider("rectangle",0,0,150,200);
    flower.lifetime = 110;
        
    turtle = createSprite(570,480,10,10)
    turtle.addImage(turtleImg);
    turtle.velocityX = -(5 + score/2);
    turtle.scale = 0.08
    turtle.debug = false;
    turtle.setCollider("rectangle",0,0,500,500);
    turtle.liftime = 110;
    
    obstacleGroup.add(flower); 
    obstacleGroup.add(turtle); 
  }
  
   
    
}
  
 //console.log(rand);
  
}

function clouds(){
  
  if(frameCount%200 === 0){
  cloud = createSprite(550,100,10,10);
  cloud.addImage(cloudImg);
  cloud.velocityX = -2;
  cloud.scale = 0.5;  
  cloud.lifetime = 275;
    
  cloud. y = Math.round(random(100,250));
 cloudGroup.add(cloud);
  
  }
}

function coins(){
  
  if(frameCount%100 === 0){
  coin = createSprite(550,480,10,10);
  coin.addImage(coinImg);
  coin.scale = 0.25;
  coin.velocityX = -(5 + score/2);
  coin.lifetime =110;
    coin.debug = false;
    coin.setCollider("rectangle",0,0,150,150);
    
  coin.y = Math.round(random(380,400));
    coinGroup.add(coin);
  
}
  

  
  
}



