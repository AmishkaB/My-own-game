//variable declaration
var ninja, ninjaImg;
var bg, bgImg;
var coin, coinImg, coinGroup;
var gameState = 'PLAY';
var monster, monsterGroup, monster1, monster2, monster3, monster4;
var score=0;
var arrow,arrow4;

function preload(){

    bgImg = loadImage('images/bg.png');

   
    arrow4= loadImage('images/arrow4.png');

    ninjaImg = loadAnimation('images/n2.png','images/n1.png','images/n3.png');
    ninjaSlash = loadAnimation("images/slash1.png","images/slash2.png","images/slash3.png","images/slash4.png","images/slash5.png","images/slash6.png");

    monster1 = loadImage("images/monster1.png");
    monster2 = loadImage("images/monster2.png");
    monster3 = loadImage("images/monster3.png");
    monster4 = loadImage("images/monster4.png");


    coinImg = loadImage('images/coin.png');

    //platform = loadImage('images/platform.jpg')
   // sonic_img=createImg('images/sonic.gif')
}

function setup (){
    createCanvas(displayWidth-10,displayHeight-10);

    //create background
    bg = createSprite(displayWidth/2,displayHeight/2,displayWidth-10,displayHeight-10);
    bg.addImage('B',bgImg);
    bg.scale = 1.28

    ninja = createSprite(150,displayHeight-90,20,20);
    ninja.addAnimation('ninja_running',ninjaImg);
    ninja.scale=2

    invisibleGround = createSprite(displayWidth/2,displayHeight-20,displayWidth,20);
    invisibleGround.visible = false;

    coinGroup = createGroup();
    monsterGroup = createGroup();
    arrowGroup = createGroup();


   // sonic_img.position(300,displayHeight-90)
   ninja.frameDelay=5
    
}

function draw(){
    background('black');
    
    
    if(gameState === 'PLAY'){
       
        bg.velocityX = -9

        if (bg.x < 300){
          bg.x = bg.width/2;
        }
    
        if(keyDown('UP_ARROW')){
            ninja.velocityY = -20;
        }
        ninja.velocityY = ninja.velocityY + 0.5;
        
        ninja.collide(invisibleGround);
        
        spawnCoins();
        spawnMonsters();

        if(keyDown("RIGHT_ARROW")){
            spawnArrow()
        }
        /*for (var i = 0; i <monsterGroup.length; i++) {
            for(var j = 0; j<arrowGroup.length; j++){
                if (arrowGroup.get(j).isTouching(monsterGroup.get(i))) {
                    monsterGroup.get(i).destroy();
                    arrowGroup.get(j).destroy();
                    score=score+15;
                }
            }
           
        }*/

        if(arrowGroup.isTouching(monsterGroup)){
            monsterGroup.destroyEach()
            arrowGroup.destroyEach()
            score=score+2;
        }
        //touch the coins, earn points
        //if(ninja.isTouching(coinGroup)){
            //coinGroup.destroyEach();
    
        for (var i = 0; i <coinGroup.length; i++) {
            if (coinGroup.get(i).isTouching(ninja)) {
                coinGroup.get(i).destroy();
                score=score+2
            }
        }
        
       /*if(keyDown('DOWN_ARROW')){
        ninja.addAnimation('ninja_slash',ninjaSlash);
        ninja.changeAnimation('ninja_slash',ninjaSlash);
        ninja.scale=0.9
        ninja.frameDelay=8
            for (var i = 0; i <monsterGroup.length; i++) {*/

                if (monsterGroup.isTouching(ninja)) {
                   
                   gameState = 'END';
                    
                }
            
        

        //if(keyIsUp('UP_ARROW'))
       
//destroy one the single coin - follow fruit debug 
//spawnArrow function, similar to spawnMonsters

        drawSprites();
    }
    
   else if(gameState === 'END'){
    textSize(100)
    fill('cyan');
    text('GAME OVER',windowWidth/2-375,windowHeight/2)
   }


    fill('white');
    textSize(30)
    text('Score: ' +score, 30, 70);

}





function spawnCoins(){
    if(frameCount % 120 === 0){
        coin = createSprite(displayWidth+20,20,30,30);
        coin.addImage('C',coinImg);
        coin.scale = 0.14;
        coin.y = Math.round(random(100,400))
        coin.velocityX = -3;
        coin.lifetime = displayWidth/3
        coinGroup.add(coin);
    }
}

function spawnMonsters(){
    if(frameCount % 300 === 0){
        monster = createSprite(displayWidth+20,displayHeight -200,30,30);

        var rand = Math.round(random(1,4));
        switch(rand){
            case 1:  monster.addImage(monster1);
            break;
            case 2:  monster.addImage(monster2);
            break;
            case 3:  monster.addImage(monster3);
            break;
            case 4:  monster.addImage(monster4);
            break;
            default: break;
        }

     
        monster.scale = 1.8;
        //monster.y = Math.round(random(displayHeight/2,displayHeight/2 +200))
        monster.velocityX = -3;
        monster.lifetime = displayWidth/3
        monsterGroup.add(monster);
    }
}



function spawnArrow(){
    //if(frameCount % 10 === 0){
        arrow = createSprite(ninja.x + 30,ninja.y,30,30);
        arrow.addImage(arrow4);
        arrow.scale=0.3
      


        //monster.y = Math.round(random(displayHeight/2,displayHeight/2 +200))
        arrow.velocityX = 20;
        arrow.lifetime = displayWidth/3
        arrowGroup.add(arrow);
   // }
}
