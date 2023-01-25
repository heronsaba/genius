//Variables
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win; 

//consts
const turnCounter = document.querySelector("#turn");
const topleft = document.querySelector("#topleft");
const topright = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const btnsArr = [topleft, topright, bottomleft, bottomright];

strictButton.addEventListener("change", (e)=>{
    if(strict){
        strict = false;
    }
    else{
        strict = true;
    }
    console.log("Strict button:", strict);
});

onButton.addEventListener("change", (e)=>{
    if(on){
        on = false;
        turnCounter.innerHTML="";
    }
    else{
        on = true;
        turnCounter.innerHTML="--";
    }
    console.log("OnButton: ", on);
});





/*for(let btn of btnsArr){
    btn.addEventListener("click", (e)=>{
        alert(e.currentTarget.id);
    })
};

btnsArr.forEach((e)=>{
    e.addEventListener("click", (e)=>{
        console.log(e.currentTarget);
        alert(e.currentTarget.id);
    })
})*/