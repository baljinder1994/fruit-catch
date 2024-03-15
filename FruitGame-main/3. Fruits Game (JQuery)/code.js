

var playing=false;
var score=0;
var livesLeft=3;
var fruits = ["apple", "banana", "cherries", "grapes", "kiwi", "mango", "orange", "peach", "pear", "watermelon"];
var step;
var $;
var i;
var j;
var action;
var location;
var clearInterval;
var setTimeout;
var timeForBomb =0;
var bomba;
var scoreToPut;
var alert;
var prompt;

$(function(){
    $('#startreset').click(function(){
        if(playing){
            location.reload()
        }else{
            bomba=true;
            livesLeft=3;
            score=0;
            playing=true;
            $('#gameover').hide();
            $('#score-value').html(score);
            $('#lifesLeft').show();
            $('#startreset').html("Reset Game");
            addHeart();
            startAction()
        }
    })
    $('#fruit1').mouseover(function(){
        score++;
        $('#score-value').html(score);
        if(score > 99){
            playing=false;
            $('#fruit1').hide();
            $('#fruitsContainer').hide('explode');
            $('#fruitsContainer').show('explode');
            clearInterval(action);
            setTimeout(function(){
                $('#startreset').html("Start Game");
                $('#liefsLeft').hide();
                $('#gameover').show();
                $('#gameover').html('<p>Game Over</p>' + score +'.');
                stopAction();
            },1000)
        }else{
            timeForBomb = -0.5
            clearInterval(action);
            $('#fruit1').hide("explode",500);
            setTimeout(function(){
                startAction();
            },1000)   
             }
    })
    $('#bomb').mouseover(function(){
        playing=false;
        $('#fruit1').hide();
        $('#bomb').hide("explode",500);
        $('#fruitsContainer').hide("explode");
        $('#fruitsContainer').show("explode");
        clearInterval(action);

        setTimeout(function(){
            $('#startrest').html("Start Game");
            $('#lifesLeft').hide();
            $('#gameover').show();
            $('#gameover').html('<p>Game Over</p>' + score +'.');
            stopAction();
        },1000)

    })
    
})
function startAction(){
    step=Math.round(Math.random()*5)+1;
    if(timeForBomb!=-1){
        timeForBomb=Math.random();
    }
    if(timeForBomb < 0.8){
        $('#fruit1').show();
        chooseFruits();
        $('#fruit1').css({
            left:530*Math.random()+10,
            top:-50

        })
    }
    action=setInterval(function(){
        if(timeForBomb < 0.8){
            $('#fruit1').css('top',$('#fruit1').position().top + step);
            if($('#fruit1').position().top > $('#fruitsContainer').height()){
                if(livesLeft > 1){
                    $('#fruit1').show();
                    chooseFruits();
                    $('#fruit1').css({
                        left:530*Math.random()+10,
                        top:-50
                    })
                    step=Math.round(Math.random()*5)+1
                    livesLeft--;
                    addHeart();
                    timeForBomb = -0.5;
                }else{
                    playing=false;
                    $('#startrest').html("Start Game");
                    $('#lifesLeft').hide();
                    $('#gameover').show();
                    $('#gameover').html('<p>Game Over! </p> Your score' +score + '.');
                    stopAction()
                }
            }
        }else{
                if(bomba){
                    $('#fruit1').hide();
                    $('#bomb').show();
                    $('#bomb').css({
                        left:530*Math.random()+10,
                        top:-50
                    })
                    bomba=false
                }
                $('#bomb').css('top',$('#bomb').position().top + step);
                if($('#bomb').position().top > $('fruitsContainer').height()){
                    $('#fruit1').show();
                    chooseFruits();
                    $('#fruit1').css({
                        left:530*Math.random()+10,
                        top:-50
                    })
                    step=Math.round(Math.random()*5)+1;
                    timeForBomb = -1;
                    bomba=true;
                }
            }
        
    },10)
}
function chooseFruits(){
    $('#fruit1').attr('src','images/' + fruits[Math.floor(9*Math.random())] + '.png');
}
function addHeart(){
    $('#lifesLeft').empty();
    for(i=0;i<livesLeft;i++){
        $("#lifesLeft").append("<img src='images/heart.png' class='life'>");
    }
}
