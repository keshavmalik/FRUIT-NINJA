var PLAY = 1;
var END = 0;
var gameState = 1;
var sword,fruits,fruitsGroup,score;

function preload(){
  swordimage = loadImage("sword.png");
  fruit1= loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  alien1= loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  gameoverimage = loadImage("gameover.png");
  cuttingsound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400,400);
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordimage);
  sword.scale=0.5;
  
  fruitsGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;

}

function draw(){
background("yellow");
  
 text("score :"+ score,346,30);
  
  if(gameState === PLAY){
   if(fruitsGroup.isTouching(sword)){
     fruitsGroup.destroyEach();
     score=score+2;
     cuttingsound.play();
   }
  sword.y=World.mouseY;
  sword.x=World.mouseX;
    
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      gameoversound.play();
    }
    
  }
  
  if(gameState === END){
    sword.addImage(gameoverimage);
    sword.x=200;
    sword.y=200;

    fruitsGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
    
    fruitsGroup.setLifetimeEach(1);
    enemyGroup.setLifetimeEach(1);
    
    frameCount=-1;
    
   }
   fruits();
  enemy();
  
  drawSprites();
}

function fruits(){
  
 if(World.frameCount%80===0){
   fruit=createSprite(400,200,20,20);
   fruit.scale=0.2;
   
   r=Math.round(random(1,4));
   if(r == 1){
     fruit.addImage(fruit1);
   } else if (r ==2){
     fruit.addImage(fruit2);
   } else if (r == 3){
     fruit.addImage(fruit3);
   } else if (r == 4){
     fruit.addImage(fruit4);
   }
   
      position = Math.round(random(1,2));

if(position==1){
  fruit.x=400;
  fruit.velocityX=-(7+(score/4));
}
else

{
  if(position==2){
    fruit.x=0;
    
    fruit.velocityX=(7+(score/4));
  }
   
}

 
   fruitsGroup.add(fruit);
   
 
 }   
}



function enemy(){
  
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addImage(alien1);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(9+(score/4));
    alien.setLifetime=50;
    
    enemyGroup.add(alien)
  }
  
  
  
}
