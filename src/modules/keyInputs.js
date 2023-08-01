const keyboardClicked = document.querySelectorAll('.keyinput') // Allow click to be activated on virtual keyboard
const keyboardPressed = document.querySelector('body') // Allow press keys to be activated anywhere on the page
const grid = document.querySelectorAll('.cell') // Get all the cells of the grid
const MAX_NUMBER_OF_LETTERS =5
const MAX_NUMBER_OF_TRIES =6
// Use mouse to click the virtual keybaord
keyboardClicked.forEach(key => {
    key.addEventListener('click', e=>{
        console.log(e)
    })
});

// Allow for physical key is pressed
let letter_counter =0 
keyboardPressed.addEventListener('keydown', e=>{
    // Check if character/letter press is valid
    if(/^[a-zA-Z]$/. test(e.key)){ 
        addLetters(e.key.toUpperCase(),letter_counter)
        letter_counter++
    }// At enter press: i)Check if word is 5 letters ii) submit word
    else if ( e.key==='Enter') {
        if(letter_counter === MAX_NUMBER_OF_LETTERS-1){
            //submit answer
        }else{
            // alert not enough letters
        }
    }// At backspace press remove a character/letter
    else if(e.key ==='Backspace'){
        if(letter_counter>0){ // rest the letter counter
            letter_counter--
        }else{
            letter_counter=0
        }
        removeLetters(letter_counter)
    }
})

// Enter letters on the grid
const addLetters = (letter,current_index) =>{
    grid[current_index].textContent = letter
}

// Enter letters from the grid
const removeLetters = (current_index) =>{
    grid[current_index].textContent = ''
}
