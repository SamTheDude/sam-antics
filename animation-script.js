//Set to use strict javascript.
"use-strict";

//Check if a direction can be moved in.
function canMove(x, y, dx, dy){
    //Get the screen dimensions.
    let screenDims = [window.screen.width, window.screen.height];

    //Calculate new coords in the direction.
    let newX = x + dx, newY = y + dy;

    //return true if the new coords are within a valid range otherwise return false.
    return (newX >= 0 && newX <= screenDims[0] && newY >= 0 && newY <= screenDims[1]);
}

//Function to get a viable direction
function getDir(x, y, lastDirection){
    //Create an array for all the possible directions.
    let directions = [];

    //Add directions only if it is possible for the line to move in that direction.
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if(canMove(x, y, dx, dy) && !(dx == 0 && dy == 0) && !(lastDirection[0] == dx && lastDirection[1] == dy) && !(lastDirection[0] == -dx && lastDirection[1] == -dy)){
                directions.push([dx, dy]);
            }
        }
    }

    if (directions.length == 0) {
        return [0, 0];
    }

    //Get one of the indexes of the array randomly.
    let randItem = Math.round(Math.random()*(directions.length-1));

    //Return direction.
    return directions[randItem];
}

//Function to control a single line's movement
function lineMove(lineID, segments, headLocation, segment, lastDirection, colour, fastItterations){
    //Get a random direction to move in.
    let direction = getDir(headLocation[0], headLocation[1], lastDirection);

    if(direction[0] == 0 && direction[1] == 0){
        headLocation = [Math.round(window.screen.width/2), Math.round(window.screen.height/2)];
    }

    //Work out screen width
    let screenWidth = window.screen.width;

    //Set time period.
    let time = 300 + screenWidth/5;
    if(fastItterations > 0){
        time = 30;
        fastItterations = fastItterations - 1;
    }

    //Get a randomised distance.
    let distance = Math.round(Math.random()*(0.1*screenWidth))+(0.05*screenWidth);

    //Get the current line segment.
    let lineSegment = document.getElementById(lineID + ":" + segment);

    //Calculate the new head location
    let newHead = [direction[0] * distance + headLocation[0], direction[1] * distance + headLocation[1]];

    //Set line colour.
    lineSegment.style.stroke = colour;

    //Draw the line in slowly.
    for (let i = 0; i < time; i++) {
        setTimeout(function() {
            //Calculate the new head location
            let newHeadTemp = [direction[0] * (distance * (i/time)) + headLocation[0], direction[1] * (distance * (i/time)) + headLocation[1]];
            lineSegment.setAttribute("x1", headLocation[0]);
            lineSegment.setAttribute("y1", headLocation[1]);
            lineSegment.setAttribute("x2", newHeadTemp[0]);
            lineSegment.setAttribute("y2", newHeadTemp[1]);
        }, i);
    }

    //Get the previous segment.
    let lastSegmentID = segment + 1;
    if(lastSegmentID >= segments){
        lastSegmentID = 0;
    }
    
    //Get the trailing line.
    let lastLineSegment = document.getElementById(lineID + ":" + lastSegmentID);

    //Calculate the previous trailing end and distance.
    let trailingX = Math.round(lastLineSegment.getAttribute("x1", lastSegmentID));
    let trailingY = Math.round(lastLineSegment.getAttribute("y1", lastSegmentID));

    let trailingX2 = Math.round(lastLineSegment.getAttribute("x2", lastSegmentID));
    let trailingY2 = Math.round(lastLineSegment.getAttribute("y2", lastSegmentID));

    let prevDistance = Math.abs(trailingX2 - trailingX);
    if(prevDistance == 0){
        prevDistance = Math.abs(trailingY2 - trailingY);
    }

    let prevDirection = [(trailingX-trailingX2)/distance, (trailingY-trailingY2)/distance]

    //Draw out trailing line.
    for (let i = 0; i < time; i++) {
        setTimeout(function() {
            lastLineSegment.setAttribute("x1", trailingX + (-prevDirection[0] * distance * (i/time)));
            lastLineSegment.setAttribute("y1", trailingY + (-prevDirection[1] * distance * (i/time)));
            lastLineSegment.setAttribute("x2", trailingX2);
            lastLineSegment.setAttribute("y2", trailingY2);
        }, i);
    }

    segment = segment + 1;

    if(segment == segments){
        segment = 0;
    }

    //Draw next line after a second.
    setTimeout(function() {
        lineMove(lineID, segments, newHead, segment, direction, colour, fastItterations);
    }, time);
}

//Produce a randomised colour code.
function randomColour() {
    //Colour code
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);

    //concatinate the colour code.
    var colourCode = "rgb(" + red + ", " + green + ", " + blue + ")";

    //return the colour code.
    return colourCode;
}

//Function to create the cool background animation.
function backgroundAnimate(concurrentLines, segments) {
    //Find the animation dump svg object.
    let animationDump = document.getElementById("animation-dump"); 
    
    //Create the contents of the animation dump.
    let concatinatedText = "";
    for (let i = 0; i < concurrentLines; i++) {
        for (let j = 0; j < segments; j++) {
            concatinatedText = concatinatedText.concat("<line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"0\" id = \"" + i + ":" + j + "\" class=\"line\"/>");
        }
    }

    //Set the contents to the created contents.
    animationDump.innerHTML = concatinatedText;

    for (let i = 0; i < concurrentLines; i++) {
        lineMove(i, segments, [Math.round(window.screen.width/2), Math.round(window.screen.height/2)], 0, [0, 0], randomColour(), 8);
    }
}

//Function to reveal screen.
function showScreen(){
    //===== Reveals the screen underneath      =====
    //===== once the site is finished loading. =====
    //Get the height of the screen
    let screenHeight = window.screen.height;
    //Get the screen cover as an object.
    let cover = document.getElementById("screen-cover");
    //Shrink the screen cover over time.
    for (let i = 0; i < screenHeight; i++) {
        setTimeout(function() {
            cover.style.height = screenHeight - i;
            if(screenHeight - i == 1){
                cover.style.display = "none";
            }
        }, i);
    }
}

//Function to Hide screen.
function hideScreen(){
    //Get the height of the screen
    let screenHeight = window.screen.height;
    //Get the screen cover as an object.
    let cover = document.getElementById("screen-cover");
    //Show the cover.
    cover.style.display = "fixed";
    //Grow the screen cover over time.
    for (let i = 0; i < screenHeight; i++) {
        setTimeout(function() {
            cover.style.height = i;
        }, i);
    }
}

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    //===== Start up the background animation. =====
    //Work out how many lines are needed.
    backgroundAnimate(20, 10);

    //Shows screen
    showScreen();
});