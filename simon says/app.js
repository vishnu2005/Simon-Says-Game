let gameSeq=[];
let userSeq=[];
let btns=['red','yellow','green','purple'];
let started=false;
let level=0;

let h2=document.querySelector("h2");



function levelUp(){
    userSeq=[]; //user has to click the crct seq of colors from the beginning after upgrading to next level
    level++;
    h2.innerText=`Level ${level}`;
    //rand btn to be flashed
    let randInd=Math.floor(Math.random()*3); 
    let randcolor=btns[randInd]; //rand color is choosed
    let randbtn=document.querySelector(`.${randcolor}`); //the btn corresponding to that color is selected
    // console.log(randbtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    btnFlash(randbtn);

};

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash")
    },200);
};

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash")
    },200);
};

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
    
});

function checkseq(idx){
    // let idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){ //user clicked the same color as flashed
        if(userSeq.length==gameSeq.length){ //user has completed the level by entering all the crct seq
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerText=`Game Over! Your score was ${level}  Press any key to start over`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function () {document.querySelector("body").style.backgroundColor="white"},150);
        started=false;  //to restart the game
        userSeq=[];
        gameSeq=[];
        level=0;
    }
}

function btnpress(){
    let btn=this;
    // console.log(this);
    userflash(btn);
    let usercolor= btn.getAttribute("id");
    userSeq.push(usercolor);
    checkseq(userSeq.length-1);
}



let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnpress);
};