// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var gameSpeed = 350;
var gameGravity = 300;
var jumpPower = 200;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

var score = 0;
var lableScore;
var score;
var player;
var pipes = [];
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
var background;
var startText;
var gas = [];
var blades = [];
var truth = true;

/*
* Loads all resources for the game and gives them names.
*/
function preload() {
  game.load.image("backgroundImage", "../assets/wall maria.jpg");
  game.load.image("playerImg","../assets/levi.png");
  game.load.image("backgroundImg", "../assets/flappy-footer.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("pipeBlock","../assets/pipe2-end.png");

  game.load.image("armoured","../assets/The armoured titan.png");
  game.load.image("house","../assets/small house.png");
  game.load.image("wall","../assets/anti titan wall.png");
  game.load.image("church","../assets/church anime.png");
  game.load.image("colusses","../assets/colusses titan.png");
  game.load.image("eren_titan","../assets/eren titan.png");

  game.load.image("gas","../assets/titan gas.png");
  game.load.image("blades","../assets/titan blades.png");
}

/*
* Initialises the game. This function is only called once.
*/
function create() {
  game.stage.setBackgroundColor("#0099ff");
  background = game.add.image(0, 0, "backgroundImage");
  background.height=400;
  background.width=790;
  //game.add.sprite(0, 0, "backgroundImg"); // set the background colour of the scene
  game.add.text(100, 45, "Levi VS Titans ", {font: "30px Arial", fill: "#cc0000"});
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, score);
  startText = game.add.text(40, 100, "PRESS SPACE TO START", {font: "30px Arial", fill: "#cc0000"});
  player = game.add.sprite(100, 200, "playerImg");
  player.width=50;
  player.height=50;
  player.anchor.setTo(0.5, 0.5);
  game.input
  .keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);
  game.input
  .keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);
  game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);
  game.input
  .keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(moveDown);

//  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = gameGravity;
  player.body.velocity.x = 0;
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(actuallyStart);

  game.time.events.loop(
    pipeInterval,
    generate
  );

  game.time.events.loop(
    pipeInterval,
    changeScore
  );

  game.paused=true;

}

function actuallyStart () {
  game.paused=false;
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .remove(actuallyStart);
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);
  startText.destroy();
}

/*
* This function updates the scene. It is called for every new frame.
*/
function update() {


if (truth)   {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);
}



    for(var i = gas.length - 1; i >= 0; i--){
        game.physics.arcade.overlap(player, gas[i], function (){

            changeGravity(+50);
            changeSpeed(+50);
            gas[i].destroy();
            gas.splice(i, 1);

        });

        for(var i = blades.length - 1; i >= 0; i--){
            game.physics.arcade.overlap(player, blades[i], function (){

                changeGravity(+50);
              //  changeSpeed(+50);
                blades[i].destroy();
                blades.splice(i, 1);

                  truth = false;

                  game.time.events.add(5*Phaser.Timer.SECOND, function(){
                    truth = true;
                  });

            });


    } }







    if(player.body.y < 0) {
      gameOver();
    }
    if(player.body.y > 400){
      gameOver();
    }
    player.rotation += 0.1;

  }



  function gameOver(){
    registerScore(score);
    score=0;
    game.state.restart();
    gamespeed=350;
    gameGravity = 400 ;
  }

  function spaceHandler() {
    game.sound.play("score");

  }

  function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
  }

  function moveRight() {
    player.x = player.x + 5;
  }

  function moveLeft() {
    player.x = player.x - 5;
  }

  function moveUp() {
    player.y = player.y - 5;
  }

  function moveDown() {
    player.y = player.y + 5;
  }

  function generateWall() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipeWall(750, count * 50);
      }
    }

  }

  function addPipeWall(x, y){
    var pipeBlock = game.add.sprite(x,y,"wall");
    pipeBlock.scale.setTo(1, 1);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }

  function generatechurch() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipechurch(750, count * 50);
      }
    }

  }

  function addPipechurch(x, y){
    var pipeBlock = game.add.sprite(x,y,"church");
    pipeBlock.scale.setTo(1, 1);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }

  function generatecolusses() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipecolusses(750, count * 50);
      }
    }

  }

  function addPipecolusses(x, y){
    var pipeBlock = game.add.sprite(x,y,"colusses");
    pipeBlock.scale.setTo(1, 1);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }

  function generateeren_titan() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipeeren_titan(750, count * 50);
      }
    }

  }

  function addPipeeren_titan(x, y){
    var pipeBlock = game.add.sprite(x,y,"eren_titan");
    pipeBlock.height=250;
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }

  function generatehouse() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipehouse(750, count * 50);
      }
    }

  }

  function addPipehouse(x, y){
    var pipeBlock = game.add.sprite(x,y,"house");
    pipeBlock.scale.setTo(1, 1);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }

  function generatearmoured() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipearmoured(750, count * 50);
      }
    }

  }

  function addPipearmoured(x, y){
    var pipeBlock = game.add.sprite(x,y,"armoured");
    pipeBlock.scale.setTo(1, 1);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -gameSpeed;

  }


  function playerJump() {
    player.body.velocity.y = -jumpPower;
  }




function generate() {

/*

var randomNumber = game.rnd.integerInRange(1, 6);

if (randomNumber == 1) {
  generatehouse();
}

if (randomNumber == 2) {
  generatechurch();
}

if (randomNumber == 3) {
  generateWall();
}

if (randomNumber == 4) {
  generateeren_titan();
}

if (randomNumber == 5) {
  generatearmoured();
}

if (randomNumber == 6) {
  generatecolusses();
}


*/

    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1) {
        generategas();
    }
    if(diceRoll==2) {
      generateblades();
    }
    else {
        generateObstacles();
    }
}












function generateObstacles(){

  var gap = game.rnd.integerInRange(1 ,5);

   if (gap == 1) {


       addPipecolusses(750, 100);


    }

  if (gap == 2) {

    addPipearmoured(750, 200);
    addPipechurch(750, 0);
  }

  if (gap == 3) {

    addPipeeren_titan(750, 250);
    addPipeWall(750, 0);
  }

  if (gap == 4) {
    addPipeWall(750, 350);
    addPipeeren_titan(750, 0);
  }

  if (gap == 5) {
    addPipechurch(750, 350);
    addPipearmoured(750, 0);

  }

  }


function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}

function generategas() {
    var bonus = game.add.sprite(width, 300, "gas");
    bonus.height=50;
    bonus.width=50;
    gas.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 300;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
   }


   function changeSpeed(g) {
       gameSpeed += g;
   }


   function generateblades() {
       var bonus = game.add.sprite(width, 300, "blades");
       bonus.height=50;
       bonus.width=50;
       blades.push(bonus);
       game.physics.arcade.enable(bonus);
       bonus.body.velocity.x = - 300;
       bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
      }
