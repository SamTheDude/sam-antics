//Set to use strict javascript.
"use-strict";

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    let cover = document.getElementById("screen-cover");
    for (let i = 0; i < 2000; i++) {
        setTimeout(function() {
            cover.style.top = i;
            console.log(i);
        }, i*2);
    }
});