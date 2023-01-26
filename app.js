//Variables
let order = [];
let playerOrder = [];
let arrComp = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let level = 1;
let playing = false;

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

strictButton.addEventListener("click", (e) => {
    if (on && !playing) {
        if (level === 4) {
            level = 0;
        }
        level++;
        turnCounter.innerHTML = `LV${level}`;
    }

});

onButton.addEventListener("click", (e) => {
    if (on) {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
    else {
        on = true;
        turnCounter.innerHTML = "-";
    }
    console.log("OnButton: ", on);
});

startButton.addEventListener("click", (e) => {
    if (on || win) {
        play();
    }
})

const play = () => {
    playing = true;
    gameSettings();
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

const gameSettings = () => {
    on = true;
    clearColor();
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
}
const gameTurn = () => {
    if (level === 1 && turn === 6) {
        gameWin();
    }
    if (level === 2 && turn === 11) {
        gameWin();
    }
    if (level === 3 && turn === 16) {
        gameWin();
    }
    if (level === 4 && turn === 21) {
        gameWin();
    }
    on = false;
    playerOrder = [];
    if (flash === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            number(order[flash]);
            flash++;
        }, 200);
    }
}
const number = (position) => {
    let audio;
    switch (position) {
        case 1:
            audio = document.querySelector("#clip1");
            audio.play();
            noise = true;
            topleft.style.backgroundColor = "lightgreen";
            setTimeout(() => {
                clearColor();
            }, 300);
            break;
        case 2:
            audio = document.querySelector("#clip2");
            audio.play();
            noise = true;
            topright.style.backgroundColor = "tomato";
            setTimeout(() => {
                clearColor();
            }, 300);
            break;
        case 3:
            audio = document.querySelector("#clip3");
            audio.play();
            noise = true;
            bottomleft.style.backgroundColor = "yellow";
            setTimeout(() => {
                clearColor();
            }, 300);
            break;
        case 4:
            audio = document.querySelector("#clip4");
            audio.play();
            noise = true;
            bottomright.style.backgroundColor = "lightskyblue";
            setTimeout(() => {
                clearColor();
            }, 300);
            break;
        default:
            alert("error");
    }
}
/*
const one = () => {
    if (noise) {
        let audio = document.querySelector("#clip1");
        audio.play();
    }
    noise = true;
    topleft.style.backgroundColor = "lightgreen";
}
const two = () => {
    if (noise) {
        let audio = document.querySelector("#clip2");
        audio.play();
    }
    noise = true;
    topright.style.backgroundColor = "tomato";
}
const three = () => {
    if (noise) {
        let audio = document.querySelector("#clip3");
        audio.play();
    }
    noise = true;
    bottomleft.style.backgroundColor = "yellow";
}
const four = () => {
    if (noise) {
        let audio = document.querySelector("#clip4");
        audio.play();
    }
    noise = true;
    bottomright.style.backgroundColor = "lightskyblue";
}
*/

const clearColor = () => {
    topleft.style.backgroundColor = "darkgreen";
    topright.style.backgroundColor = "darkred";
    bottomleft.style.backgroundColor = "goldenrod";
    bottomright.style.backgroundColor = "darkblue";
}


/*for(let btn of btnsArr){
    btn.addEventListener("click", (e)=>{
        alert(e.currentTarget.id);
    })
};*/

btnsArr.forEach((e) => {
    e.addEventListener("click", (e) => {
        if (on && !compTurn) {
            if (e.currentTarget.id === "topleft") {
                playerOrder.push(1);
                number(1);
                check();

                /*if (!win) {
                    setTimeout(() => {
                        clearColor;
                    }, 300)
                }*/

            }
            if (e.currentTarget.id === "topright") {
                playerOrder.push(2);
                number(2);

                check();

                /*if (!win) {
                    setTimeout(() => {
                        clearColor;
                    }, 300)
                }*/
            }
            if (e.currentTarget.id === "bottomleft") {
                playerOrder.push(3);
                number(3);

                check();

                /*if (!win) {
                    setTimeout(() => {
                        clearColor;
                    }, 300)
                }*/
            }
            if (e.currentTarget.id === "bottomright") {
                playerOrder.push(4);
                number(4);

                check();
                /*if (!win) {
                    setTimeout(() => {
                        clearColor;
                    }, 300)
                }*/
            }
        }
    });
    clearColor();
});

const check = () => {
    for (let i = 0; i < playerOrder.length; i++) {
        if (playerOrder[i] === order[i]) {
            good = true;
        }
        else {
            error();
        }
    }
    if (playerOrder.length === turn) {
        if (good) {
            flash = 0;
            turn++;
            turnCounter.innerHTML++;
            compTurn = true;
            intervalId = setInterval(gameTurn, 800);
        }
    }
}

const error = () => {
    playing = false;
    good = false;
    compTurn = true;
    let audio = document.querySelector("#error");
    audio.play();
    turnCounter.innerHTML = "ERR";
    setTimeout(() => {
        gameSettings();
    }, 2000);
}

const gameWin = () => {
    playing = false;
    clearColor();
    let audio = document.querySelector("#win");
    clearInterval(intervalId);
    audio.play();
    setTimeout(() => {
        topleft.style.backgroundColor = "lightgreen";
        setTimeout(() => {
            topright.style.backgroundColor = "tomato";
            setTimeout(() => {
                bottomright.style.backgroundColor = "yellow";
                setTimeout(() => {
                    bottomleft.style.backgroundColor = "lightskyblue";
                }, 300);
            }, 300);
        }, 300);
    }, 300);
    
    setTimeout(() => {
        gameSettings();
    }, 3000);
    compTurn = false;
    turnCounter.innerHTML = "WIN";

}