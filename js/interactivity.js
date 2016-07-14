jQuery("#credits").on("click", function() {
  var message = "AWESOME game created by Thomas!";
  jQuery("#credits").append(
    "<p>" + message + "</p>"
  );
});

var bestScore=0;
var numberScores = 0;

function registerScore (score) {
  console.log(bestScore);
if(score>bestScore){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

  jQuery ("#scores").prepend(
    scoreEntry
  );
//  if( numberScores==3){
  //  jQuery("#scores").filter(function(){
//return this.innerHTML.match(/^<li>)
//    });
  
bestScore=score;
}
}

jQuery("#sharing").on("click", function(){
    var text =
        "I scored " +
        score.toString() +
        " in Flappy Birdy! Can you do better?";
    var escapedText = encodeURIComponent(text);
    var url =
        "https:twitter.com/share?text=" +
        escapedText;
    jQuery("#sharing").attr("href", url);
});
