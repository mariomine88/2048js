var board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setgeme();
}    

function setgeme() {

    for (let r = 0; r <rows; r++) {
        for (let c = 0; c <columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.className = "tile";
            document.getElementById("board").append(tile);
            updatetile(r,c);
        }
    }
    
    setTwo();
    setTwo();
}

function updateGame(direction) {

    if(direction == "ArrowLeft"||direction == "ArrowRight"){
    for(let r = 0; r < rows; r++) {
        let row = board[r]; 
        if(direction == "ArrowRight"){row.reverse();}
        row = slide(row);
        if(direction == "ArrowRight"){row.reverse();}
        board[r] = row;

        for (let c = 0; c< columns; c++){
            updatetile (r,c);
        }
    }setTwo();
    } else if(direction == "ArrowDown"||direction == "ArrowUp"){
        for (let c = 0; c< columns; c++) {
            let row = [board[0][c],board[1][c],board[2][c],board[3][c]];

            if(direction == "ArrowDown"){row.reverse();}
            row = slide(row);
            if(direction == "ArrowDown"){row.reverse();}

            for(let r = 0; r < rows; r++){
                board[r][c] = row[r];
                updatetile (r,c);
            }
        }setTwo();
    }


/*  for(let r = 0; r < rows; r++) {
            let row = board[r]; 
            row = slide(row);
            board[r] = row;
            
            for (let c = 0; c< columns; c++){
                let num = board[r][c];
                updatetile (r,c, num);
            }
        }
    }else if(direction == "ArrowRight"){
        for(let r = 0; r < rows; r++) {
            let row = board[r];  
            row.reverse();
            row =slide(row);
            row.reverse();
            board[r] = row;

            for (let c = 0; c< columns; c++){
                let num = board[r][c];
                updatetile (r,c, num);
            }
        }


    }else if(direction == "ArrowDown"){
        for (let c = 0; c< columns; c++) {
            let row = [board[0][c],board[1][c],board[2][c],board[3][c]]; 
            row.reverse();
            row =slide(row);
            row.reverse();

            for(let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let num = board[r][c];
                updatetile (r,c, num);
            }
        }
    }else if(direction == "ArrowUp"){
        for (let c = 0; c< columns; c++) {
            let row = [board[0][c],board[1][c],board[2][c],board[3][c]]; 

            row =slide(row);


            for(let r = 0; r < rows; r++){
                board[r][c] = row[r];
                let num = board[r][c];
                updatetile (r,c, num);
            }
        }
    } */


    document.getElementById("score").innerText = score;
}

function reset(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    score = 0;
    document.getElementById("score").innerText = score;

    for (let r = 0; r <rows; r++) {
        for (let c = 0; c <columns; c++) {
            updatetile(r,c);
        }
    }

    setTwo();
    setTwo();
}

function isboardempty (){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!isboardempty()){
        return;
    }

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0){
            board[r][c] = 2;
            updatetile(r,c,2);
            found = true;
        }
    }
}


function updatetile(r,c,){
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.innerText = "";
    tile.classList.value = "";
    tile.className = "tile";
    let num = board[r][c];
    if(num>0){
        tile.innerText = num;
        if(num<= 4096){
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x4096");
        }
    }
}

document.addEventListener("keyup",(e)=>{
    updateGame(e.code);
    }
)

function slide(row){
    row = filterZero(row);
    for (let i=0; i<row.length-1;i++){
        if(row[i] == row[i+1]){
            row[i] *=2;
            row[i+1] = 0;
            score += row[i];
        }   
    }
    row = filterZero(row);
    while (row.length < 4){
        row.push(0);
    }
    return row;
}

function filterZero(row){
    return row.filter(num => num !== 0);
} 