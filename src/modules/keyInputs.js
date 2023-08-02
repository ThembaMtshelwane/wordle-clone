const keyboardClicked = document.querySelectorAll('.keyinput') // Allow click to be activated on virtual keyboard
const keyboardPressed = document.querySelector('body') // Allow press keys to be activated anywhere on the page
const gridFromHTML = document.querySelectorAll('.cell') // Get all the cells of the grid

const MAX_NUMBER_OF_LETTERS =5
const MAX_NUMBER_OF_TRIES =6
let letter_postion =0 
let try_position =0

// Structre grid div into a 2D array
const getGrid = ()=>{
    let grid =[[],[],[],[],[],[]]
    counter =0;
    rows =0;
    for (let index = 0; index < gridFromHTML.length; index++) {
       for(i=0; i<MAX_NUMBER_OF_LETTERS;i++){
            if((i+counter)>29){
                // continue
                return grid
            }
         grid[rows][i] = gridFromHTML[i+counter]
       }
       counter =counter+5;
       rows ++;
    }
    return grid
}

// Use mouse to click the virtual keybaord
keyboardClicked.forEach(key => {
    key.addEventListener('click', e=>{
    const entry =e.target.dataset.key
    gridEntry(entry)
    })
})

// Allow for physical key is pressed
keyboardPressed.addEventListener('keydown', e=>{
    const entry = e.key
    gridEntry(entry)
})

// Grid Entry Logic
const gridEntry = (entry) =>{
    
    // Check if character/letter is valid
    if(/^[a-zA-Z]$/. test(entry)){ 
        addLetters(try_position,letter_postion,entry.toUpperCase())
        letter_postion++
    }
    // At enter: i)Check if word is 5 letters ii) submit word
    else if ( entry==='Enter') {
        if(letter_postion === MAX_NUMBER_OF_LETTERS && try_position < MAX_NUMBER_OF_TRIES-1){
            //submit answer
            console.log('submitted')
            // Go th the next level
            try_position++
            letter_postion=0
        }else if(letter_postion < MAX_NUMBER_OF_LETTERS){
            // alert not enough letters
            console.log('not enough letters')
        }else if(try_position >= MAX_NUMBER_OF_TRIES-1){
            //submit answer
            // Out of tries
            console.log('Out of tries')
        }else{
            // inavlid
            console.log('INVALID')
        }

    }// At backspace remove a character/letter
    else if(entry ==='Backspace'){
        if(letter_postion>0){ // rest the letter counter
            letter_postion--
        }else{
            letter_postion=0
        }
        removeLetters(try_position,letter_postion)
    }
}

// **************
const grid = getGrid()

// Enter letters on the grid
const addLetters = (current_try,current_index,letter) =>{
    if(current_index+1<=MAX_NUMBER_OF_LETTERS){
        grid[current_try][current_index].textContent = letter
    }else{
       letter_postion=MAX_NUMBER_OF_LETTERS-1
       return
    }
}

// Enter letters from the grid
const removeLetters = (current_try,current_index) =>{
    grid[current_try][current_index].textContent = ''
}
