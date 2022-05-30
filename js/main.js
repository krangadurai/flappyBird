import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs"

kaboom({
    global:true,
    fullscreen:true,
    debug:true
});
let score=0

// load resources
loadSprite("brid","../Assets/bird.png");
loadSprite("bg","../Assets/bg.webp");
loadSprite("pipe","../Assets/pipe2.png");
scene("game",()=>{
    //score variable;
    let score=0;

    
    const bg=add([
        sprite("bg",{height:height(),width:width()})
    ])
    const socreLabel= add([
        text(score)
    ])

    // created player 
    const player = add([
        sprite("brid"),
        pos(100,100),
        scale(0.05),
        area(),
        body() 
    ])

    // create  producePipes
    
    
    function producePipes(){
        const offset=rand(-200,200);
        const pipe1 =add([
            sprite("pipe"),
            scale(0.3,1),
            origin("topleft"),
            pos(width()-200,height()/2+100+offset),
            area(),
            move(LEFT,100),
            "pipe",
            {
                yetToMeet:true
            }
        ])
        
        const pipe2 =add([
            sprite("pipe",{flipY:true}),
            scale(0.3,1),
            origin("botleft"),
            pos(width()-200,height()/2-100+offset),
            area(),
            move(LEFT,100),
            "pipe"
        ])
    }
    loop(2,producePipes)
    player.collides("pipe",(pipe)=>{
        destroy(player);
        go("gameover",score);
    })
    player.action(()=>{
        if(player.pos.y<=0|| player.pos.y>height()){
            go("gameover",score);
        }
    })
    action("pipe", (pipe)=>{
       if(pipe.yetToMeet==true && pipe.pos.x<player.pos.x){
           score++;
           pipe.yetToMeet=false;
       }
      socreLabel.text=score;
    })
    onKeyPress("space",()=>{
        player.jump();
    })
    // onKeyDown("up",()=>{
    //     player.pos.y-=10
    // })
    // onKeyDown("down",()=>{
    //     player.pos.y+=10
    // })
    // onKeyDown("left",()=>{
    //     player.pos.x-=10
    // })
    // onKeyDown("right",()=>{
    //     player.pos.x+=10
    // })

})
// create background Image 
scene("gameover",(score)=>{
    add([
        text("Game Over \n Your Score :"+score),
        pos(width()/2-400,height()/2)
         
    ])
})
go("game")






