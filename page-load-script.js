//Use strict javascript.
"use-strict";

//Function to do the writing animation.

//Moves the header to the top left corner
function cornerHeader(time, tick){
    //Get the header as an object.
    let header = document.getElementsByTagName("header")[0];

    //Find the coordinates of the top corner.
    let headerx = header.offsetWidth/2;
    let headery = header.offsetHeight/2;

    //Set header position to be absolute and remove padding.
    header.style.padding = "2%";
    header.style.position = "absolute";

    headerx = Math.round(headerx - header.offsetWidth/2);
    headery = Math.round(headery - header.offsetHeight/2);

    //Find the point at which to callback
    let calbackPoint = tick * Math.floor(time/tick);

    //Set up the movement path for the header.
    for (let i = 0; i <= time; i = i + tick) {
        setTimeout(function() {
            //Calculate the ratio of the change
            let ratio = 1 - (i / time);

            //Position the header in the correct place.
            header.style.left = headerx;
            header.style.top = headery * ratio;

            //reset to relative.
            if(i == calbackPoint){
                header.style.position = "static";
                header.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            }
        }, i);
    }

    //Get the main area as an object.
    let main = document.getElementsByTagName("main")[0];

    //Hide the main area.
    main.style.display = "none";

    //Writing animation
    setTimeout(function() {
        
    }, time);
}

//Loads a page requested in.
function loadPage(pageAddress){
    cornerHeader(1000, 20);
    
    setTimeout(function() {
        //Put all the elements of the site into the dump.
        $("#site-dump").load(pageAddress);
    }, 1100);
}

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    //Get the buttons as objects.
    let aboutMe = document.getElementById("about-me"),
    universityWork = document.getElementById("university-work"),
    personalProjects = document.getElementById("personal-projects");

    aboutMe.addEventListener("click", function(){
        loadPage("/about-me.html");
    });

    universityWork.addEventListener("click", function(){
        loadPage("/university-work.html");
    });

    personalProjects.addEventListener("click", function(){
        loadPage("/personal-projects.html");
    });
});