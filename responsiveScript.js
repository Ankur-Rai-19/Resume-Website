

//smooth scroll solution 

var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");  // accessing all nav menu anchor tags like =(home contact)
// console.log(navMenuAnchorTags);  // it will print the all 14 menu here

for(var i = 0; i < navMenuAnchorTags.length; i++) {  //handel click on all of them
    navMenuAnchorTags[i].addEventListener("click", function(event){  // fetch an element and add event listener on them
        event.preventDefault();  // by doing this it will not take it to that section

        var targetSectionID = this.textContent.trim().toLowerCase(); /* Getting the text of the clicked link and converting it to lowercase. */
        var targetSection = document.getElementById(targetSectionID); /* Trying to get the element with the id of `targetSectionID`. */
        console.log(targetSection);  // it will print the text that you have clicked on it 
        
/* A function that is called every 50 milliseconds. It checks if the top of the target section is less
than or equal to 0. If it is, it clears the interval and returns. If it isn't, it scrolls the window
by 50 pixels. */
        var interval = setInterval(function(){
            var targetSectionCoordinates = targetSection.getBoundingClientRect();  /* Getting the coordinates of the target section. */
            if(targetSectionCoordinates.top <= 0){
                clearInterval(interval);
                return
            }
            window.scrollBy(0,50);  /* It scrolls the window by 50 pixels. */
        },50);

    });  
}



//Auto Fill Skills Bars


/* Selecting the first div element that is a direct child of the element with the class skill-progress`. */
var progressBars = document.querySelectorAll(".skill-progress > div");
var SkillsContainer = document.getElementById("skills-container");  /* Getting the element with the id `skills-container`. */

/* Adding an event listener to the window object that will call the function `checkScroll` every time the window is scrolled. */
window.addEventListener("scroll", checkScroll);
var animationDone = false;  /* A variable that is used to check if the animation has been done. */



/* It loops through all the progress bars and sets their width to 0%.  */
function initializeBars() {
    for(let bar of progressBars) {
        bar.style.width = 0 + "%";
    }
}

initializeBars(); /* Setting the width of all the progress bars to 0%. */


function fillBars() {

    for(let bar of progressBars){
        /* Getting the value of the attribute `data-bar-width` of the progress bar. */
        let targetWidth = bar.getAttribute("data-bar-width");
        let currentWidth = 0; /* Setting the current width of the progress bar to 0. */
        let interval = setInterval(function() {
            if(currentWidth >= targetWidth){
                clearInterval(interval);
                return
            }
            currentWidth++;
            bar.style.width = currentWidth + "%"; /* Setting the width of the progress bar to the value of the variable `currentWidth`. */
        }, 5);
    }
    
}


/**
 * If the element with the id `skills-container` is visible, then fill the bars.
 * 
 * If the element with the id `skills-container` is not visible, then initialize the bars.
 */
function checkScroll() {
    // You have to check whether skill container is visible
    var coordinates = SkillsContainer.getBoundingClientRect();  /* Getting the coordinates of the element with the id `skills-container`. */

    /* Checking if the animation has been done and if the top of the element with the id skills-container` is less than the height of the 
    viewport. */
    if(!animationDone && coordinates.top <= window.innerHeight){  //window.innerHeight will give u the viewport height
        animationDone = true;
        fillBars();
        // console.log("Skill section is visible");
    } else if(coordinates.top > window.innerHeight) {
        animationDone = false;
        initializeBars();
    }
    
}