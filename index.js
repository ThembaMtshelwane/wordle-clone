document.addEventListener('DOMContentLoaded', function () {
  const closeSection = document.querySelector('.close')
  const modalContainer = document.querySelector('.modalContainer')
  const keys = document.getElementsByTagName('input')
  const cells = document.getElementsByClassName('cell')
  let count = 0

  // Add user input to grid
  function handleInput (value) {
    if (count < 30) {
      cells[count].textContent = value
      count++
    }
  }

  // Handle clicks
  for (let index = 0; index < keys.length; index++) {
    keys[index].addEventListener('click', function () {
      handleInput(keys[index].value)
    })
  }

  // Handle press
  function handleKeyDown (e) {
    const key = e.key.toUpperCase()
    if (count < 30 && /^[A-Z]$/.test(key)) {
      handleInput(key)
    }
  }
  document.addEventListener('keydown', handleKeyDown)

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
})
