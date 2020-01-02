//Use strict javascript.
"use-strict";

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

    header.style.padding = "none";
    header.style.position = "static";

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
            header.style.position = "absolute";

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
    let topGap;

    cornerHeader(1000, 20);

    setTimeout(function() {
        //Get the header as an object.
        let header = document.getElementsByTagName("header")[0];    

        //Get top gap
        topGap = header.offsetHeight;

        hideScreen(topGap);
    }, 300);
    
    setTimeout(function() {
        //Put all the elements of the site into the dump.
        $("#site-dump").load(pageAddress);
        console.log("Hi");
    }, 1350);

    setTimeout(function() {
        //Show the screen.
        showScreen(topGap);
    }, 1400);
}

//Unload the page
function unload(){
    //Get the header as an object.
    let header = document.getElementsByTagName("header")[0];  

    hideScreen(0);

    setTimeout(function() {
        header.style.padding = null;
        header.style.position = "static";
        header.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

        //remove contents of the div.
        let siteDump = document.getElementById("site-dump");

        //Set div contents to nothing.
        siteDump.innerHTML = "";

        //Get the main area as an object.
        let main = document.getElementsByTagName("main")[0];

        //Show the main area.
        main.style.display = "inline";
    }, 1200);

    setTimeout(function() {
        //Show the screen.
        showScreen(0);
    }, 1300);
}

//Assign the click event to all the objects with the correct id.
function checkLink(page, done){
    contact = document.getElementById(page);

    if((contact != null)){
        if(done == false){
            contact.addEventListener("click", function(){
                loadPage("/" + page + ".html");
            });
            done = true;
        }
    }else{
        done = false;
    }

    setTimeout(function() {
        checkLink(page, done);
    }, 100);
}

//Wait for document to load
document.addEventListener("DOMContentLoaded", function(){
    //Get the buttons as objects.
    let aboutMe = document.getElementById("about-me"),
    universityWork = document.getElementById("university-work"),
    personalProjects = document.getElementById("personal-projects"),
    title = document.getElementsByTagName("header")[0];

    title.addEventListener("click", function(){
        unload();
    });

    aboutMe.addEventListener("click", function(){
        loadPage("/about-me.html");
    });

    universityWork.addEventListener("click", function(){
        loadPage("/university-work.html");
    });

    personalProjects.addEventListener("click", function(){
        loadPage("/personal-projects.html");
    });

    checkLink("contact", false);
});