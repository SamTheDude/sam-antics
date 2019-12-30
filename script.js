//Set to use strict javascript.
"use-strict";

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
}

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    //===== Start up the background animation. =====
    backgroundAnimate(10, 3);

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
});