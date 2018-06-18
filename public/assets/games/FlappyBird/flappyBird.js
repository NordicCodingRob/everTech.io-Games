function FlappyJS(){
    var cvs = document.getElementById("flappycanvas");
    var ctx = cvs.getContext("2d");
    // load images
    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeNorth = new Image();
    var pipeSouth = new Image();
    var highScore = 0;

    bird.src = "assets/games/FlappyBird/images/bird.png";
    bg.src = "assets/games/FlappyBird/images/bg.png";
    fg.src = "assets/games/FlappyBird/images/fg.png";
    pipeNorth.src = "assets/games/FlappyBird/images/pipeNorth.png";
    pipeSouth.src = "assets/games/FlappyBird/images/pipeSouth.png";

    // some variables

    var gap = 85;
    var constant;

    var bX = 10;
    var bY = 150;

    var gravity = 1.5;

    var score = 0;

    // audio files

    var fly = new Audio();
    var scor = new Audio();

    fly.src = "assets/games/FlappyBird/sounds/fly.mp3";
    scor.src = "assets/games/FlappyBird/sounds/score.mp3";

    // on key down

    document.addEventListener("keydown",moveUp);

    function moveUp(){
        bY -= 25;
        fly.play();
    }

    // pipe coordinates

    var pipe = [];

    pipe[0] = {
        x : cvs.width,
        y : 0
    };

    var getHighScore = function(){
        return score;
    };

    // draw images

    function draw(){
        
        ctx.drawImage(bg,0,0);
        
        
        for(var i = 0; i < pipe.length; i++){
            
            constant = pipeNorth.height+gap;
            ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
                
            pipe[i].x--;
            
            if( pipe[i].x == 125 ){
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                }); 
            }

            // detect collision
            
            if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
                removeElement("parent");
                $("#parent").html("<br><h1>Game over</h1>");
                score = getHighScore()
                return score;
            }
            
            if(pipe[i].x == 5){
                score++;
                scor.play();
            }
            
            
        }

        ctx.drawImage(fg,0,cvs.height - fg.height);
        
        ctx.drawImage(bird,bX,bY);
        
        bY += gravity;
        
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score,10,cvs.height-20);
        
        setTimeout(function(){requestAnimationFrame(draw)},00);
        
    }
    
    

    draw();
};
