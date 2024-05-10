document.addEventListener('DOMContentLoaded', function () {
  const closeSection = document.querySelector('.close')
  const modalContainer = document.querySelector('.modalContainer')

  closeSection.addEventListener('click', function () {
    modalContainer.classList.add('hideModal')
  })
})
