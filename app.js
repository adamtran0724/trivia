$(document).ready(function () {
    var options = [
        {
            question: " How many NBA championships did Michael Jordan win with the Chicago Bulls?", 
            choice: [4 , 6, 5, 3],
            answer: 1,
         },
         
         {
             question: "Which is the only American Football team to go a whole season undefeated, including the Super Bowl?", 
            choice: ["The Miami Dolphins, in 1972.", "The San Francisco 49ers in 1988", "The Green Bay Packers, in 1990", "The Pittsburgh Steelers, in 1978"],
            answer: 0,
            
         }, 
         {
             question: "Which is the only team to play in every soccer World Cup tournament?", 
            choice: ["Spain", "Barcelona", "Brazil", "Manchester" ],
            answer: 2,
         
        }, 
        {
            question: "Which American Football team won the first two Super Bowls (in 1967 and 1968)?", 
            choice: ["The New England Patroits", "The Seattle Seahawks", "The Green Bay Packers", "The Philadelphia Eagles" ],
            answer: 2,
           
        }, 
        {
            question: "Which NFL team appeared in four consecutive Super Bowls from 1991 - 1994 and lost them all?", 
            choice: ["Chicago bears", "Cleveland Browns", "New York Giants", "Buffalo Bills" ],
            answer: 3,
          
        }, 
        {
            question: "Which Jamaican sprinter won gold medals at the 100m, 200m and 4 x 100m relay at three consecutive Olympic Games from 2008 - 2016?", 
            choice: ["Ben Johnson", "Usain Bolt", "Jesse Owens", "Carl Lewis" ],
            answer: 1,
            
        }, 
        {
            question: "Which golf tournament did Tiger Woods win by 12 strokes in 1997 to record his first major championship win?", 
            choice: ["PGA Championship", "The Masters", "U.S. Open", "British Open" ],
            answer: 1,
           
        }, 
        {
            question: "What team holds the record for the most consecutive NBA titles?	", 
            choice: ["Boston Celtics", "Chicago Bulls", "Los Angles Lakers", "Philadelphia 76ers" ],
            answer: 0,
         
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })