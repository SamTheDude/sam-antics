//Set to use strict javascript.
"use-strict";

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    //Get the height of the screen
    let screenHeight = window.screen.height;
    let cover = document.getElementById("screen-cover");
    for (let i = 0; i < screenHeight; i++) {
        setTimeout(function() {
            cover.style.height = screenHeight - i;
            console.log(i);
        }, i*4);
    }
});