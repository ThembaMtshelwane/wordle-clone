const keyboardClicked = document.querySelectorAll('.keyinput') // Allow click to be activated on virtual keyboard
const keyboardPressed = document.querySelector('body') // Allow press keys to be activated anywhere on the page
const gridFromHTML = document.querySelectorAll('.cell') // Get all the cells of the grid

const dictionary = [
    'apple','gates','nylon','ureas','ahead','apods'
   ]
let guessedWord = []
let guessedWord_processed = ''
const targetWord = dictionary[0] // Use Date object to genetae a word every day

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
        checkIfValidGuess(guessedWord_processed)
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

// * * *  * * * * FrontEnd Functions to Manipulate Grid * * * * * * * * * 

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
// Change cell background colour
const addColourOnGrid = (current_try,indexArray,addColour,rmvColour) =>{
    for (let i = 0; i < indexArray.length; i++) {
        grid[current_try][indexArray[i]].classList.remove(`cell-colour-${rmvColour}`);
        grid[current_try][indexArray[i]].classList.add(`cell-colour-${addColour}`);
    }
}
// Change virtual keyboard letter colour
const addColourOnKeyboard = (changeLetterString,addColour,rmvColour) =>{
    // console.log('letters to change',changeLetterString)
    for (let i = 0; i < keyboardClicked.length; i++) {
        if (changeLetterString.toUpperCase().includes(keyboardClicked[i].textContent)) {
            keyboardClicked[i].classList.remove(`keyboard-colour-${rmvColour}`)
            keyboardClicked[i].classList.add(`keyboard-colour-${addColour}`)
        }
    }
}

// Move to following row
const goToNextRow =()=>{
    // Go the next row and try again
    try_position++    
    letter_postion=0
    guessedWord =[]
}

// * * * * * * * * * Word must be 5 letters and you have only 6 tries * * * * * * * * *
const checkIfValidGuess=(word)=>{
    if(letter_postion === MAX_NUMBER_OF_LETTERS && try_position < MAX_NUMBER_OF_TRIES-1){
        checkIfWordExists(word)

    }else if(letter_postion < MAX_NUMBER_OF_LETTERS){
        // alert not enough letters
        console.log('not enough letters')
        alert('Not enough letters')
    }else if(try_position >= MAX_NUMBER_OF_TRIES-1){
        //submit answer
        // Out of tries
        console.log('Out of tries')
        alert('Out of tries')
    }else{
        // inavlid
        console.log('INVALID')
        alert('INVALID')
    }
}

// * * * * * * * * * Does the word exists in the dictionary * * * * * * * * *
const checkIfWordExists =(word)=>{
 // check if word exists
 if(dictionary.includes(word)){
    checkCorrectness(word)
 }else{
     console.log('word does not exists')
     alert('Word does not exists')
 }
}

// * * * * * * * * * How close is the guess to being correct * * * * * * * * * 
const checkCorrectness = (word)=>{

    if (yellowMatches(word).status) {
        // add yellow
        addColourOnGrid(try_position,yellowMatches(word).yellowIndices,'yellow','yellow')
        addColourOnKeyboard(yellowMatches(word).yellowLetters,'yellow','yellow') 
        console.log('turn these yellow ',yellowMatches(word).yellowIndices)
        // goToNextRow()
     }
    if (greenMatches(word).status) {
        // add green
        addColourOnGrid(try_position,greenMatches(word).greenIndices,'green','yellow')
        addColourOnKeyboard(greenMatches(word).greenLetters,'green','yellow')
        console.log('turn these green ',greenMatches(word).greenIndices)
        // goToNextRow()
    }
    // is correct
    if(targetWord===word){
        // all green,end game
        let allMatches =[0,1,2,3,4]
        addColourOnGrid(try_position,allMatches,'green','yellow')
        addColourOnKeyboard(word,'green','yellow')
        console.log('Correct, you win')
        alert('Correct, you win')
        isGameOver = true
    } 
    //else{
        goToNextRow()
    // }
}

// * * * * * * * * * Matches * * * * * * * * * 
const yellowMatches = (word)=>{
    let yellowIndices =[]
    let yellowLetters =''
    let status = false

    for (let i = 0; i < MAX_NUMBER_OF_LETTERS; i++) {
        if(targetWord.includes(word[i])){
            status = true
            yellowIndices.push(i)
            yellowLetters = yellowLetters+word[i]
        }                
    }
    return {status, yellowIndices, yellowLetters}
}

const greenMatches = (word)=>{
    let greenIndices =[]
    let greenLetters =''
    let status = false

    for (let i = 0; i < MAX_NUMBER_OF_LETTERS; i++) {
        if(targetWord[i]===(word[i])){
            status = true
            greenIndices.push(i)
            greenLetters=greenLetters+word[i]
        }                
    }
    return {status, greenIndices,greenLetters}
}