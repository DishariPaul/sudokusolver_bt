let grid = document.getElementById("grid");
const solveBtn = document.getElementById("solve");
const clearBtn = document.getElementById("clear");
let sound = new Audio("/endgame.mp3");
//CREATE 9x9 GRID
for (let i = 0; i < 9; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement("td");
        let input = document.createElement("input");
        // input settings
        input.type = "text";
        input.maxLength = 1;
        // allowing only numbers 1–9
        input.addEventListener("input", () => {
            let val = input.value;
            if (val < 1 || val > 9) {
                input.value = "";
            }
        });
        cell.appendChild(input);
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
//GET BOARD FROM UI
function getBoard() {
    let board = [];
    let rows = document.querySelectorAll("tr");
    rows.forEach(row => {
        let rowData = [];
        let inputs = row.querySelectorAll("input");
        inputs.forEach(input => {
            let val = input.value;
            if (val) {
                input.classList.add("filled");
            }
            rowData.push(val ? parseInt(val) : 0);
        });
        board.push(rowData);
    });
    return board;
}
//VALID CHECK ----> ensures rules are not broken before a number is inserted
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;    // checks the entire row, if present already it will return false
    }
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;     // checks the entire column, if present already it will return false
    }
    // checks the 3x3 box
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;      //returns false, if the number already exists in that box
            }
        }
    }
    return true;    //checks all the numbers w.r.t. row, column, and box
}
//DELAY ----> slows down the execution and makes it visible to user
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));     //Promise = something that finishes later
}
//UPDATE UI WITH ANIMATION
function updateUI(board) {
    let rows = document.querySelectorAll("tr");  //all 9 rows
    rows.forEach((row, i) => {
        let inputs = row.querySelectorAll("input");     //all 9 cells in that row
        inputs.forEach((input, j) => {      //checking via column index j for each cell
            if (board[i][j] !== 0) {    //if cell has a number in it, changes its UI
                input.value = board[i][j];
                input.style.backgroundColor = "#163553b7";
            } else {    //if not, resets it as empty
                input.value = "";
                input.style.backgroundColor = "white";
            }
        });
    });
}
//BACKTRACKING SOLVER
    //recusion ===>   Find empty cell -> Try no.s 1-9 -> Recurse -> Backtrack if needed  (if a recusive call fails, it resets the value i.e backtracking anf tries the next number) 
async function solve(board) {       
    //finds empty cell in the board
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {    //if cell empty, it needs to be filled
                for (let num = 1; num <= 9; num++) {        //try all possible numbers in pattern
                    if (isValid(board, row, col, num)) {    //validity function
                        //place the number in that cell
                        board[row][col] = num;
                        updateUI(board);
                        //highlight the trying cell
                        let cell = document.querySelectorAll("tr")[row].querySelectorAll("input")[col];
                        cell.style.backgroundColor = "#1e90ff";
                        await sleep(200);    //making visual visible
                        //solve rest of the board recursively
                        if (await solve(board)) {
                            return true;       //no empty cells found, function return TRUE --> sudoku is solved
                        }
                        // backtrack happens here
                        board[row][col] = 0;
                        updateUI(board);
                        //highlight BACKTRACK step (red)
                        cell.style.backgroundColor = "#ff4d4d";
                        await sleep(200);
                    }
                }
                return false;       //path invalid, so go back
            }
        }
    }
    return true;    //no empty cells, so sudoku is solved
}
//FINAL DISPLAY ----> updates entire board UI with all final values
function display(board) {
    let rows = document.querySelectorAll("tr");     //selects all the 9 rows of the sudoku
    rows.forEach((row, i) => {
        let inputs = row.querySelectorAll("input");     //gets all the 9 cells of that row
        inputs.forEach((input, j) => {
            input.value = board[i][j];  //takes all the values from the board[] and fills it
        });
    });
    if (typeof sound!== "undefined"){
        sound.currentTime = 0;  //resets audio and plays it from start
        sound.play();   
    }
    showBanner();
}
//SOLVE BUTTON
async function solveSudoku() {
    clearBtn.disabled = true;
    solveBtn.disabled = true;
    let board = getBoard();     //reads all the input boxes and converts them into a 2D array
    if (await solve(board)) {   //calls backtracking solver
        display(board);         //if solution found, returns the sudoku board
    } else {
        alert("No solution exists!");
    }
    clearBtn.disabled = false;
    solveBtn.disabled = false;
}
//GAME BANNER
function showBanner() {
    let banner = document.getElementById("successBanner");
    // slide down feature
    banner.style.top = "20px";
    // hide after 3 seconds
    setTimeout(() => {
        banner.style.top = "-100px";
    }, 3000);
}

//CLEAR BUTTON
function clearGrid() {
    let inputs = document.querySelectorAll("input");    //selects all the cells from the board
    inputs.forEach(input => {
        input.value = "";   //restores value, i.e., empty cell
        input.style.backgroundColor = "#2c4b6bad";
        input.classList.remove("filled");
    });
}



/*
    ===================================== ALGORITHM USED ===============================================
        1. Start
        2. Find an empty cell in the grid
        3. If no empty cell → return TRUE (solution found)
        4. For num = 1 to 9:
            a. Check if num is valid in current cell:
                    - Not in same row
                    - Not in same column
                    - Not in same 3×3 box
            b. If valid:
                    - Place num in cell
                    - Recursively solve remaining grid
                    - If success → return TRUE
            c. Else:
                    - Remove num (Backtrack)
        5. If no number works → return FALSE
        6. End
    =====================================================================================================
*/

/*
    ===================================== SELF NOTES ===================================================
        1. Backtracking is a type of DFS with pruning using constraints.
        2. Other way to optimize this is Heuristics (MRV = Minimum Remaining Values)
            --> Choose the cell with the least possible values first to reduce branching.
        3. Generalized Sudoku is NP-Complete.
            --> NP = Nondeterministic Polynomial time
            --> An NP problem is a problem for which a given solution can be verified in 
                polynomial time (i.e., quickly)., using a deterministic algorithm
        4. This can be solved without backtracking 
            --> Constraint Propagation
            --> AI Techniques
            --> Dancing Links (Algorithm X)
        5. Time Complexity = O(9^(n²)) --> trying 9 numbers on 81 cells (9x9 grid) --> exponential 
           Space Complexity = O(n²)  --> board storage is for 81 cells (9x9 grid)
    ====================================================================================================
*/