var bg, bgI, bg2
var gameState = 1;
//var YO = 0;
var PLAY = 2;
var END = 0;
var toka, tokaI
var asto1, asto2, asto3, asto4, comet, cometI, cometG, astoG
var bg1, bg2
var out, outI
var score, lifescore
var livesI, life, livesG
var fuelI, fuel, fuelG, fuelleft
var outS, collideS

function preload() {
  bgI = loadImage("BG.png")
  tokaI = loadImage("toka1.png");
  bg2 = loadImage("bg2-min.png");
  asto1 = loadImage("asto.png");
  asto2 = loadImage("asto2.png");
  asto3 = loadImage("asto3.png");
  asto4 = loadImage("asto4.png");
  outI = loadImage("out.png");
  cometI = loadImage("comet.png");
  livesI = loadImage("lives.png");
  fuelI = loadImage("petrol.png")
  outS = loadSound("yoyo.mp3")
  collideS = loadSound("ok2_1.mp3")
}

function setup() {

  createCanvas(600, 400);

  out = createSprite(300, 200, 10, 10)
  out.addImage(outI);
  out.scale = 0.5
  out.visible = false

  bg = createSprite(300, 200, 10, 10)
  bg.addImage(bgI);
  bg.scale = 0.35;

  bg1 = createSprite(0, 200, 10, 10)
  bg1.addImage(bg2);
  bg1.scale = 0.7;
  bg1.visible = false
  bg1.velocityX = -5
  //  asto=createSprite(300, 200, 10, 10);
  // asto.addImage(asto1);
  //asto.scale=0.5
  astoG = createGroup();
  fuelG = createGroup();
  cometG = createGroup();
  toka = createSprite(150, 200, 10, 10);
  toka.addImage(tokaI);
  toka.scale = 0.4;
  toka.visible = false;
  toka.debug = false;
  toka.setCollider("rectangle", 0, -35, 400, 100)

  fuelleft = 70
  life = createSprite(350, 30, 10, 10);
  life.addImage(livesI);
  life.scale = 0.2;
  life.visible = false



  lifescore = 20

  livesG = createGroup();

  score = 0;

  fuel = createSprite(270, 30, 10, 10);
  fuel.addImage(fuelI);
  fuel.scale = 0.1;
  fuel.visible = false;
}

function draw() {
  console.log(getFrameRate);
  background("black")

  drawSprites();

  //if (gameState === YO) {
  //text("let's begin", 200, 200)
  //}


  if (keyDown("space") && gameState === 1) {

    gameState = PLAY;
  } else if (gameState === PLAY) {

    fill("white")
    textSize(25);
    text(lifescore, 370, 38)
    life.visible = true;
    text("surviving: " + score, 430, 30);
    score = score + Math.round(getFrameRate() / 60);
    bg.visible = false;
    bg1.visible = true;
    toka.visible = true;
    text(fuelleft, 285, 38);
    astoF();
    cometsF();
    bg1.velocityX = -5

    if (bg1.x < 300) {
      bg1.x = bg.width / 2;
    }
    if (keyDown("up")) {
      toka.y = toka.y - 5;

    }
    if (keyDown("right")) {
      toka.x = toka.x + 5
    }
    if (keyDown("left")) {
      toka.x = toka.x - 5
    }

    if (keyDown("down")) {
      toka.y = toka.y + 5;
    }
    if (astoG.isTouching(toka) || cometG.isTouching(toka)) {
      lifescore = lifescore - 1
      collideS.play();
    }
    if (lifescore === 0) {
      //text("you lost your life", 200, 100);
      gameState = END
      outS.play();

    }
    if (fuelleft === 0) {
      gameState = END
      outS.play();
    }
    textSize(20)
    fill("white")

    livesF();
    if (livesG.isTouching(toka)) {
      lifescore = lifescore + 2;
      livesG.destroyEach();
    }
    if (fuelG.isTouching(toka)) {
      fuelleft = fuelleft + 5;
      fuelG.destroyEach();


    }
    fuelF();
    if (frameCount % 100 === 0) {
      fuelleft = fuelleft - 5;
    }
    fuel.visible = true;
  } else if (gameState === END) {
    if (lifescore === 0) {
      stroke("red");
      fill("white");
      textSize(20);

      text("OH YOUR LIVES ARE OVER :(", 150, 150);
    }
    if (fuelleft === 0) {
      stroke("red");
      fill("white");
      textSize(20);
      
      text("OH YOUR FUEL RAN OUT:(", 150, 150)
    }
    toka.visible = false;
    fill("white");
    textSize(20);
    //text("OH NO!!", 250, 170);
    text("PRESS 'R' TO RESTART", 150, 250);
    bg1.velocityX = 0;
    bg1.visible = false;
    out.visible = true;
    fuel.visible = false;
    life.visible = false;
    astoG.destroyEach();
    livesG.destroyEach();
    fuelG.destroyEach();


  }
  if (keyDown("r") && gameState === END) {

    restart();
  }










}

function astoF() {
  if (frameCount % 30 === 0) {
    asto = createSprite(650, Math.round(random(20, 370)), 10, 10)

    asto.velocityX = -5
    asto.scale = 0.5
    asto.lifetime = 200
    asto.debug = false
    asto.setCollider("circle", 0, 0, 40);

    if (score >= 100) {
      asto.velocityX = -9
    }
    if (score >= 150 && score <= 250) {
      asto.velocityX = -10
    }
    if (score >= 250) {
      asto.velocityX = -17;
    }



    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        asto.addImage(asto1);
        asto.debug = false
        asto.scale = 0.7
        break;
      case 2:
        asto.addImage(asto2);
        asto.debug = false
        break;
      case 3:
        asto.addImage(asto3);
        asto.debug = false
        break;
      case 4:
        asto.addImage(asto4);
        asto.debug = false
        break;
      default:
        break;  
    }
    astoG.add(asto);
  }

}


function restart() {
  fuelleft = 70;
  lifescore = 20;
  out.visible = false;
  //  bg.visible = true;
  gameState = PLAY;
  score = 0;
  toka.x = 150;
  toka.y = 200;
}

function cometsF() {
  if (frameCount % 60 === 0) {

    if (score >= 200 && score <= 400) {
      var comet = createSprite(Math.round(random(0, 550)), -50, 10, 10);
      comet.addImage(cometI);
      comet.scale = 0.7
      comet.setCollider("circle", -35, 80, 5);
      comet.velocityY = 25;
      comet.lifetime = 150;

      cometG.add(comet)
    }

  }
}

function livesF() {

  if (frameCount % 180 === 0) {
    var lives = createSprite(650, Math.round(random(20, 370)), 10, 10);
    lives.scale = 0.3;
    lives.velocityX = -8
    lives.addImage(livesI);
    lives.lifetime = 200;
    lives.debug = false;
    lives.setCollider("circle", 0, 0, 50)
    livesG.add(lives);

  }
}

function fuelF() {

  if (frameCount % 180 === 0) {

    var fuel = createSprite(650, Math.round(random(20, 370)), 10, 10);
    fuel.addImage(fuelI);
    fuel.scale = 0.15;
    fuel.velocityX = -8;
    fuel.lifetime = 200;

    fuel.debug = false;
    fuel.setCollider("circle", 0, 0, 60)
    fuelG.add(fuel);
  }

}