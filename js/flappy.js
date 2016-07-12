// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var lableScore;
var score;
var player;
var pipes = [];
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
var background;
/*
* Loads all resources for the game and gives them names.
*/
function preload() {
  game.load.image("backgroundImage", "../assets/images.jpg");
  game.load.image("playerImg","../assets/flappy_frog.png");
  game.load.image("backgroundImg", "../assets/flappy-footer.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("pipeBlock","../assets/pipe2-end.png");
}

/*
* Initialises the game. This function is only called once.
*/
function create() {
  game.stage.setBackgroundColor("#0099ff");
  background = game.add.image(0, 0, "backgroundImage");
  background.scale.setTo(3,2.1);
  //game.add.sprite(0, 0, "backgroundImg"); // set the background colour of the scene
  game.add.text(100, 45, "JUMPY FROGS ", {font: "30px Arial", fill: "#cc0000"});
  game.input.onDown.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, score);
  player = game.add.sprite(100, 200, "playerImg");
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
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 600;
  player.body.velocity.x = 0  ;
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown
  .add(playerJump);

  game.time.events.loop(
    pipeInterval,
    generatePipe
  );

  game.time.events.loop(
    pipeInterval,
    changeScore
  );


}
/*
* This function updates the scene. It is called for every new frame.
*/
function update() {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);

    if (player.y > 400 || player <  0 ){
      gameOver();
    }
  }

  function gameOver(){
  if (score>25){registerScore(score);
  }
   score=0;
    game.state.restart();

  }

  function clickHandler(event) {
    //  alert("click!");
    //  alert("The position of the click is: " + event.x + " and " + event.y);
    //  game.add.sprite(event.x, event.y, "playerImg");
    player.x = event.x;
    player.y = event.y;
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

  function generatePipe() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
      if (count != gap && count != gap+1) {
        addPipeBlock(750, count * 50);
      }
    }

  }

  function addPipeBlock(x, y){
    var pipeBlock = game.add.sprite(x,y,"pipeBlock");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -350;

  }

  function playerJump() {
    player.body.velocity.y = -200;
  }
