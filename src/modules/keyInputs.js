const keyboardClicked = document.querySelectorAll('.keyinput') // Allow click to be activated on virtual keyboard
const keyboardPressed = document.querySelector('body') // Allow press keys to be activated anywhere on the page
const gridFromHTML = document.querySelectorAll('.cell') // Get all the cells of the grid

const dictionary = [
    "aahed","aalii","aapas","aargh","aarti","abaca","abaci","abacs","abaft","abaht","abaka","abamp","aband","abash","abask","abaya","abbas","abbed","abbes","abcee","abeam","abear","abeat","abeer","abele","abeng","abers","abets","abeys","abies","abius","abjad","abjud","abler","ables","ablet","ablow","abmho","abnet","abohm","aboil","aboma","aboon","abord","abore","aborn","abram","abray","abrim","abrin","abris","absey","absit","abuna","abune","abura","aburn","abuts","abuzz","abyes","abysm","acais","acara","acari","accas","accha","accoy","accra",
]
let guessedWord = []
let guessedWord_processed = ''
const targetWord = dictionary[0] // Use Date object to genetae a word every day

let allMatches =[0,1,2,3,4]

const MAX_NUMBER_OF_LETTERS =5
const MAX_NUMBER_OF_TRIES =6
let letter_postion =0 
let try_position =0

let isGameOver = false

// Structre grid div into a 2D array
const getGrid = ()=>{
    let grid =[[],[],[],[],[],[]]
    let counter =0;
    let rows =0;
    for (let index = 0; index < gridFromHTML.length; index++) {
       for(let i=0; i<MAX_NUMBER_OF_LETTERS;i++){
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

//* * * * * * * Press and Click keybaord inputs * * * * * * * 

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
            // check if word exists
            if(dictionary.includes(guessedWord_processed)){
                // is correct
                if(targetWord===guessedWord_processed){
                  // all green,end game
                  addColour(try_position,allMatches,'green')
                  console.log('Correct, you win')
                  isGameOver = true

                }else if (yellowMatches(guessedWord_processed).status) {
                    // add yellow
                    addColour(try_position,yellowMatches(guessedWord_processed).yellowIndices,'yellow')
                    console.log('turn these yellow ',yellowMatches(guessedWord_processed).yellowIndices)
                    goToNextRow()
                } else if (greenMatches(guessedWord_processed).status) {
                    // add green
                    addColour(try_position,greenMatches(guessedWord_processed).grayIndices,'green')
                    console.log('turn these green ',greenMatches(guessedWord_processed).grayIndices)
                    goToNextRow()
                } else{
                    goToNextRow()
                }

            }else{
                console.log('word does not exists')
            }

 
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

// * * * * * * * * * Manipulate Grid * * * * * * * * * 

const grid = getGrid()

// Enter letters on the grid
const addLetters = (current_try,current_index,letter) =>{
    if(current_index+1<=MAX_NUMBER_OF_LETTERS && !(isGameOver)){
        grid[current_try][current_index].textContent = letter
        guessedWord.push(letter)
        guessedWord_processed = guessedWord.join().replaceAll(',','').toLowerCase()
        console.log(guessedWord_processed)
    }else{
       letter_postion=MAX_NUMBER_OF_LETTERS-1
       return
    }
}

// Enter letters from the grid
const removeLetters = (current_try,current_index) =>{
    if (!(isGameOver)) {
        grid[current_try][current_index].textContent = ''
        guessedWord.pop()
        guessedWord_processed = guessedWord.join().replaceAll(',','').toLowerCase()
        console.log(guessedWord_processed)   
    }else{
        guessedWord.pop()
    }
}

const addColour = (current_try,indexArray,colour) =>{
    for (let i = 0; i < indexArray.length; i++) {
        grid[current_try][indexArray[i]].classList.add(`cell-colour-${colour}`);
    }
}
// Try again in next row
const goToNextRow =()=>{
    // Go the next row and try again
    try_position++    
    letter_postion=0
    guessedWord =[]
}

// * * * * * * * * * Matches * * * * * * * * * 
const yellowMatches = (word)=>{
    let yellowIndices =[]
    let status = false

    for (let i = 0; i < MAX_NUMBER_OF_LETTERS; i++) {
        if(targetWord.includes(word[i])){
            status = true
            yellowIndices.push(i)
        }                
    }

    return {status, yellowIndices}
}

const greenMatches = (word)=>{
    let greenIndices =[]
    let status = false

    for (let i = 0; i < MAX_NUMBER_OF_LETTERS; i++) {
        if(targetWord[i]===(word[i])){
            status = true
            greenIndices.push(i)
        }                
    }

    return {status, grayIndices}
}
