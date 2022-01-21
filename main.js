var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y);
    }
}

var img1 = new Image();
img1.src = 'summer2.jpg';
 
var img2 = new Image();
img2.src = 'cloud2.jpg';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

var timer = 0;
var jumpTimer = 0;
var cactusList = [];
var animation;

function frame(){
    animation = requestAnimationFrame(frame);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer % 120 == 0){
        var cactus = new Cactus();
        cactusList.push(cactus);      
    }

    cactusList.forEach((a, i, o) => {
        //x좌표가 0미만이면 제거
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x-=3;

        collision(dino,a); //공룡과 모든 장애물 충돌체크해야하기 때문에 반복문 안에 넣음

        a.draw();
    })
    
    if(jump == true){
        dino.y-=3;
        jumpTimer+=3;
    }
    if(jump == false){
        if(dino.y < 200){
            dino.y+=3;
        }    
    }
    if(jumpTimer > 100){
        jump = false;
        jumpTimer = 0;
    }
    
    dino.draw();
}

frame();

var jump = false;
document.addEventListener('keydown', function(e){
    if(e.code == 'Space'){
        jump = true;
    }
})

//충돌
function collision(dino, cactus){
    var xSize = cactus.x - (dino.x + dino.width);
    var ySize = cactus.y - (dino.y + dino.height);
    if(xSize < 0 && ySize < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


