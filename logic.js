var playing = false
var score
var trialsleft
var fruits = ['apple','banana','cherry','pear','papaya','melon']
var step

// Background music

window.onload = setInterval(Gameloop, 1000 / 10); //10fps

let myAudio = document.getElementById("bgmusic")

myAudio.src = "no-story-70330.mp3"

function Gameloop() {
    myAudio.play();
    if (myAudio.paused == true) {
        myAudio.play();
    }
}

//action is Used for setInterval() for moving down fruit
var action

$(function(){

    // Click on Start/Reset button
    $("#startreset").click(function(){
            // Are we playing?
                // Yes
            if(playing==true){

                // Reload Page
                location.reload()
            
            // No
            }else{

                // change the playing status
                playing = true
                
                // set the score to 0
                score = 0
                $("#scorevalue").html(score)

                // // Show Trials left box
                $("#trialsleft").show()
                trialsleft = 3
                addHearts()

                // hide the game over box from the previous run
                $("#gameover").hide()

                // change Button text to Reset Game
                $("#startreset").html("Reset Game")

                // Create Random fruit
                createFruit()
            }

    })

                                
    
    // Slicing a fruit
    $("#fruit1").on("mouseover",function(){
        // Updating the score
        score++
        $("#scorevalue").html(score)

        // Play slicing sound in background
        $("#slicesound")[0].play()

        // stop the fruit
        // Stopping the setInterval() on action variable
        clearInterval(action)

        // Explode the fruit and also animate it
        $("#fruit1").hide('explode',500)

        // send new fruit after animation is finished
        setTimeout(createFruit,800)

    })
        
    
    //Functions:

    function addHearts(){
        $("#trialsleft").empty()
        for(i=0; i<trialsleft; i++){
            $("#trialsleft").append('<img src="images/heart.png" class="heart">')
        }
    }

    function createFruit(){
        // generating the fruit
        $("#fruit1").show()

        // Selecting random fruit
        chooseFruit()

        // Placing the fruits in food container
        $("#fruit1").css({
            'left': Math.round(550 * Math.random()),
            'top': -50
        })

        // Define a random step for moving down fruit
        step = 1 + Math.round(5*Math.random())

        // Move fruit down by 1 step as per random step
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step)
            
            // Check if fruit is too low
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                // Yes -> Check if any trials are left
                if(trialsleft > 1)

                    // Yes -> Create a new fruit and follow the same steps above
                    {

                    $("#fruit1").show()

                    // Selecting random fruit
                    chooseFruit()
                
                    // Placing the fruits in food container
                    $("#fruit1").css({
                        'left': Math.round(550 * Math.random()),
                        'top': -50
                    })
                
                    // Define a random step for moving down fruit
                    step = 1 + Math.round(5*Math.random())

                    // reducing the trials left by 1
                    trialsleft--

                    // Updating the trials left box
                    addHearts()
                }
                else 
                // No -> Show Game Over box & change button text to Start Game
                {
                    // Changing playing to false as we are not playing anymore
                    playing = false

                    // Changing the text of button to Start Game
                    $("#startreset").html("Start Game")

                    // Showing the Game Over box
                    $("#gameover").show()
                    $("#gameover").html('<p>Game Over!</p><p>Your Score is ' + score + '</p>')

                    // hiding the trials left box
                    $("#trialsleft").hide()
                    
                    // Stopping the movement of fruits
                    stopFruit()
                }
            }

            // No -> Move down until it is too low

        },10)

    }

    function chooseFruit(){
        $("#fruit1").attr('src','images/' + fruits[Math.round(fruits.length * Math.random())] + '.png')
    }
    
    function stopFruit() {
        // Stopping the setInterval() on action variable
        clearInterval(action)

        // Hiding the fruit
        $("#fruit1").hide()
    }

});
