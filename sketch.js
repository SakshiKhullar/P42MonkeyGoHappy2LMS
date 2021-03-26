var backImage,backgr;
var player, player_running;
var ground,ground_img;

var obstacle, obstacleGroup,obstaceImage;
var banana, bananaGroup,bananaImage;
var END =0;
var PLAY =1;
var gameState = PLAY;

var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");   
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);

  drawSprites();
  fill("white");
  text("Score: " + score, 580, 100);
  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
 
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if (frameCount % 80 === 0) {
      var rand = Math.round(random(1,2));
      console.log(rand)
      if (rand === 2) {
        spawnObstacle();
        
      }
      else{
        spawnFood();
      }
    }


    player.collide(ground);

    if (player.isTouching(bananaGroup)) {
      bananaGroup[0].destroy();
     score= score + 1;
     player.scale = player.scale+0.01;
    }
    

    if (player.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach(); 
      gameState = END;
      player.destroy();
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      backgr.velocityX=0;
      ground.destroy();
    }
  }

  if (gameState === END) {
    fill("red");
    textSize(40);
    text("Game Over",250, 300);
    
    
  }

}

function spawnFood() {
  
  banana = createSprite(700, Math.round(random(100, 300)), 10, 10);
  banana.velocityX = -4;
  banana.addImage(bananaImage)
  banana.scale = 0.04;
  banana.lifetme = 300;
  
  
  
  bananaGroup.add(banana)
}

function spawnObstacle(){
  var obstacle = createSprite(750,320,50,50);
  obstacle.velocityX = -4;
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.2;
  obstacle.lifetme = 300;
  
  
  
  obstacleGroup.add(obstacle)
}