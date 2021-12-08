getMeme();

$("#meme-button").on("click", function(){
  
  getMeme();
  
});

function getMeme() {
  
var randNum; 
  
var memeResponses = [];
var memeImages = [];
  
  $.getJSON("https://www.reddit.com/r/dankmemes/.json?&show=all&limit=300", function(response){
    
    //log the ajax respose
    console.log(response);
    
    //for loop that goes through json response
    for(var i = 0; i < response.data.children.length; i++) {
      
      var imageURL = response.data.children[i].data.url;
      
      if( response.data.children[i].data.link_flair_text === "Meta") {
        //don't push these responses into the array
      } //else if(){
        
    //  }
    else {
        memeResponses.push(imageURL);
      }
    } // for loop end here
    
    var arrayIndex;
    
    for(var b = 0; b < memeResponses.length; b++) {
      var imageType = memeResponses[b].slice(-3);
      
      if(imageType === "jpg" || imageType === "png") {
      
        memeImages.push(memeResponses[b]);
        
      }
      
    } // "B" for loop end here
    
      randNum = Math.floor(Math.random() * memeImages.length);
    
    console.log(memeImages[randNum]);
  
  document.getElementById("meme-image").src = memeImages[randNum];
    
    }); // get json end here
  
} // getMeme() bracket end here