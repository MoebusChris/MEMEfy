
//create the globally used variables - api endpoints and buttons for event listeners
var kanyeAPI = "https://api.kanye.rest";
var imageAPI = "https://imsea.herokuapp.com/api/1?q=";
var generateMeme = document.querySelector("#generate-meme");
var history1 = document.querySelector("#history1");
var history2 = document.querySelector("#history2");
var history3 = document.querySelector("#history3");
var exitMeme = document.querySelector("#exitMeme");

//default query strings randomly searched when there is no user input
var defaultQueryPool = ["Fat Cat", "Fat Dog", "Crazy Person", "Angry Panda", "Explosion", "Insane Person", "Robot Dinosaur"];

//disabling the history button if there is nothing in local memory
if (localStorage.getItem("history1") == null) {
    document.getElementById("history1").style.display = 'none';
}

//disable meme window and cancel buttom if nothing has yet been searched
if (localStorage.getItem("activeMeme") == null) {
    document.getElementById("memeWindow").style.display = 'none';
    document.getElementById("exitMeme").style.display = 'none';
}

//event listener for when the generate meme button is clicked
generateMeme.addEventListener("click", function() {
    //checks if there is text entered in the "inputText" text entry field and then either uses that or randomly generates a query
    var defaultQuery = defaultQueryPool[Math.floor(Math.random() * (defaultQueryPool.length - 1))];
    var inputText = (document.getElementById("inputText").innerHTML == "(Optional)") ? defaultQuery : document.getElementById("inputText").innerHTML;

    //gets a random kanye quote and saves it for later use
    var memeTextTemp;
    fetch(kanyeAPI)
    .then(function (response){
        var responseJSON = response.json();
        memeTextTemp = responseJSON.quote;
        document.getElementById("memeWindow").innerHTML = responseJSON.quote;
    })

    //does an image search based on the inputText entered or randomly selected
    fetch(imageAPI + inputText)
    .then(function (response){
        var responseJSON = response.json();
        var defaultImage = responseJSON.results[Math.floor(Math.random() * 10)];
        document.getElementById("memeWindow").src = defaultImage;

        //if this isn't the first search it will populate the history button (aka when generating a second meme without exiting the first)
        if (localStorage.getItem("activeMeme") != null){
            localStorage.setItem("history1", JSON.stringify(localStorage.getItem("activeMeme")));
            document.getElementById("history1").style.display = inline.flex; 
        }

        //saves the generated meme to memory and causes the meme window and exit meme button to be displayed
        localStorage.setItem("activeMeme", JSON.stringify({"text":memeTextTemp, "image":defaultImage}));
        document.getElementById("memeWindow").style.display = inline.flex;
        document.getElementById("exitMeme").style.display = inline.flex;
        
    })
})

//populates and enables the meme window with the historical meme when the history button is pressed
history1.addEventListener("click", function() {
    var history1Meme = JSON.parse(localStorage.getItem("history1"));
    document.getElementById("memeWindow").innerHTML = history1Meme.text;
    document.getElementById("memeWindow").src =  history1Meme.image;
    document.getElementById("memeWindow").style.display = inline.flex;
     
})

/*placeholders if we wanted to do multiple history buttons - as of now depreciated
history2.addEventListener("click", function() {

})

history3.addEventListener("click", function() {

})
*/

//clicking on the exit meme button saves the active meme into history and disables itself and the meme window
exitMeme.addEventListener("click", function() {
    localStorage.setItem("history1", JSON.stringify(localStorage.getItem("activeMeme")));
    document.getElementById("history1").style.display = inline.flex; 
    document.getElementById("memeWindow").style.display = none;
    document.getElementById("exitMeme").style.display = none;
})
