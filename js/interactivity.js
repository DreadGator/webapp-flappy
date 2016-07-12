jQuery("#credits").on("click", function() {
  var message = "AWESOME game created by Thomas!";
  jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});

var bestScore=0;


function registerScore (score) {
if(score>bestScore){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  jQuery ("#scores").prepend(
    scoreEntry
  );
bestScore=score;
}
}
