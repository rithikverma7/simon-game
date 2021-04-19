var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStart = false;
var level = 0;

function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    gameOver();
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  gameStart=false;
}

function gameOver() {
  playSound("sounds/wrong.mp3");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}



function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  level++;
  $("#level-title").text("Level "+level);

  //animation and sound for the game
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound("sounds/"+randomChosenColour+".mp3");

}


//add click function to buttons after game started
$(".btn").click(function () {
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound("sounds/"+userChosenColour+".mp3");
  // console.log(userClickedPattern);
  // console.log(this.id);
  checkAnswer(userClickedPattern.length-1);//called on every click

});

$(document).keypress(function() {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
  }
});
