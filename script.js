let shape=document.getElementById("shape");//getting shape
let parentEle=shape.offsetParent;//getting the parent element of shape which is the shape container
let shapeList=document.getElementById("shape-list");//getting shape list
let difficultyList=document.getElementById("difficulty-list");//getting difficulty list
let shapeDifficultyButton=document.getElementById("shape-difficulty-button");//getting shape Difficulty button
let points=document.getElementById("points");//getting points
let arrow=document.getElementById("arrow");//getting arrow

let shapeSelected="square";//selected shape and is square by default
let size="100";//size of the selected shape and is 100 by default
let font="1";//font size of the content of the shape and it 1 by default(will be used with suffix rem)

let missSound=document.getElementById("miss-sound");//getting the miss and the hit sound elements
let hitSound=document.getElementById("hit-sound");

let muteContainer=document.getElementById("mute-container");//getting the mute container
let mute=document.getElementById("mute");//getting the mute element
let unmute=document.getElementById("unmute");//getting the unmute element

shapeDifficultyButton.addEventListener("click", function(){//handling the event when the shape dificulty button is clicked

    shapeSelected=shapeList.selectedOptions[0].value;//getting the shape selected
    size=difficultyList.selectedOptions[0].value; //getting the size selected from the difficulty list

    if(size=="100"){//providing different font size values for different sizes and the font size decreases as the difficulty increases or the size decreases
        font="1";
    }
    else if(size=="70"){
        font="0.8";
    }
    else{
        font="0.6";
    }

    if(shapeSelected=="square"){//handling the case if the shape selected is a square

        shape.setAttribute("style", "");//removing any previous styles
        shape.setAttribute("style", "top: 1px; left: 1px; height: "+size+"px; width: "+size+"px; font-size: "+font+"rem;");//adding square specific styles

    }
    else if(shapeSelected=="circle"){//shape selected is circle
        
        shape.setAttribute("style", "");
        shape.setAttribute("style", "top: 1px; left: 1px; height: "+size+"px; width: "+size+"px; border-radius: 50%;font-size: "+font+"rem;");

    }
    else if(shapeSelected=="rectangle"){//shape selected is rectangle
        
        shape.setAttribute("style", "");
        shape.setAttribute("style", "top: 1px; left: 1px; height: "+size+"px; width: "+(1.5*size)+"px; font-size: "+font+"rem;");

    }    
    
});

shape.addEventListener("mouseover", function(event){//handling the event when the user hovers over the shape i.e. a mouseover event

    // obtaining different values when this hover event takes place

    let shapeHeight=shape.offsetHeight;//getting the height and the width of the shape
    let shapeWidth=shape.offsetWidth;

    let prevTopL=shape.style.top.length;//getting the current top and left values for the shape, which will become the previous values when the shape is moved to a new location
    let prevTop=parseInt(shape.style.top.slice(0, prevTopL-2));

    let prevLeftL=shape.style.left.length;
    let prevLeft=parseInt(shape.style.left.slice(0, prevLeftL-2));

    let parentHeight=parentEle.offsetHeight;//getting the height and the width of the parent of the shape i.e. the shape container element
    let parentWidth=parentEle.offsetWidth;

    let xRan=Math.random();//getting some random x and y values ranging from 0 to 1
    let yRan=Math.random();

    xRan*=1000000;//getting random values ranging from 0 to 1000000
    yRan*=1000000;    

    xRan=parseInt(xRan);//getting intergral values for the random x and y
    yRan=parseInt(yRan);    

    xRan%=parentWidth;//getting random x and y values ranging respectively from 0 to the width and the height of the shape container minus 1
    yRan%=parentHeight;

    xRan-=shapeWidth;//subtracting the shape width and height values respectively from the random x and y values obtained to fit the shape inside the shape container
    yRan-=shapeHeight;    

    if(xRan<=0){//if the shape tends to gets out of the shape container or just sticks to it with no top or left values, then we bring the shape back into the shape container with atleast 1px top and left values
        xRan+=(parentWidth-shapeWidth);                
    }

    if(yRan<=0){
        yRan+=(parentHeight-shapeHeight);
    }
    
    shape.style.left=(xRan+"px");//setting the left and the top values for the shape and making it appear at a new random position
    shape.style.top=(yRan+"px");

    let nextTopL=shape.style.top.length;//obtaining the new top and the left values for the shape
    let nextTop=parseInt(shape.style.top.slice(0, nextTopL-2));

    let nextLeftL=shape.style.left.length;
    let nextLeft=parseInt(shape.style.left.slice(0, nextLeftL-2));   
    
    let shapeCaught=false;//assuming that the shape is not caught by default

    if(shapeSelected=="square"){//checking if the shape is caught or not in case of square shape

        shapeCaught=(Math.abs(nextTop-prevTop)<=(size-1) && Math.abs(nextLeft-prevLeft)<=(size-1));//the shape is caught iff the previous and the new shapes overlap and in the case of square this is true iff the new and the previous values for top and left respectively have a difference lesser than the side length of the square

    }
    else if(shapeSelected=="circle"){//checking fot circle shape
        console.log("here");

        let xPrevCenter=(prevLeft+(size/2));//getting the mid point of the previous circle
        let yPrevCenter=(prevTop+(size/2));

        let xNewCenter=(nextLeft+(size/2));//getting the mid point of the new circle
        let yNewCenter=(nextTop+(size/2));

        shapeCaught=(Math.sqrt(Math.pow((xNewCenter-xPrevCenter), 2) + Math.pow((yNewCenter-yPrevCenter), 2))<=(size-1));//checking if the circles overlap by checking if the distance between their centers is lesser than the diameter of the circle

    }
    else{//checking for the rectangle shape
        shapeCaught=(Math.abs(nextTop-prevTop)<=(size-1) && Math.abs(nextLeft-prevLeft)<=((1.5*size)-1));//the rectangles overlap iff the new and the previous top and the left values respectively are lesser than the height and the width of the rectangle respectively
    }

    if(shapeCaught){//if the shape is caught       

        if(unmute.style.opacity=="1"){//if the sound is unmuted, then we enable the successful catch sound when the shape is caught
            
            hitSound.load();
            hitSound.play();

        }
    
        if(size=="100"){//increasing the points as per the difficulty level
            points.innerText=(parseInt(points.innerText)+1);       
        }
        else if(size=="70"){
            points.innerText=(parseInt(points.innerText)+4);   
        }
        else{           
            points.innerText=(parseInt(points.innerText)+10); 
        }        

        arrow.style.opacity="1";//showing the increase points sign     

        setTimeout(function(){//remove the arrow after this 1 second timeout
            arrow.setAttribute("style", "");
        }, 1000);

    }
    else{
        
        if(unmute.style.opacity=="1"){//if the sound is unmuted and we have not caught the shape, then we enable the miss sound
            
            missSound.load();
            missSound.play();

        }

    }

})

shapeDifficultyButton.addEventListener("mousedown", function(){//to handle the event when the shape difficulty button is pressed down

    shapeDifficultyButton.style.color="whitesmoke";//changing the color and the background of the button 
    shapeDifficultyButton.style.backgroundImage="linear-gradient(to right, brown, gold)";

});

shapeDifficultyButton.addEventListener("mouseup", function(){//to handle the event when the shape difficulty button is released
    shapeDifficultyButton.setAttribute("style", "");//bringing the button color and background color back to normal
});

let count=0;//for alternating the content and the styling of the mute container

muteContainer.addEventListener("click", function(){//handling the event when the mute container is clicked

    if(count%2==0){//change the background color to shade of green, hiding the mute sign and showing the unmute sign when the count is even

        muteContainer.style.backgroundColor="#33bb33";
        mute.style.opacity="0";
        unmute.style.opacity="1";

    }
    else{//change the background color to shade of red, hiding the unmute sign and showing the mute sign when the count is odd

        muteContainer.style.backgroundColor=" rgb(218, 0, 0)";
        unmute.style.opacity="0";
        mute.style.opacity="1";      

    }      

    count++;//increasing the count

});