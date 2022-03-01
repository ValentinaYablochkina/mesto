const checkInputValidity = ({inputErrorClass}, {errorClass}, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`)
  if (input.validity.valid) {
  errorMessage.textContent = ''
  input.classList.remove(inputErrorClass)
  errorMessage.classList.remove(errorClass)
  } else {
  errorMessage.textContent = input.validationMessage
  input.classList.add(inputErrorClass)
  errorMessage.classList.add(errorClass)
  }
}

const checkButtonValidity = ({inactiveButtonClass}, form, button) => {
  if (form.checkValidity()) {
    button.removeAttribute('disabled')
    button.classList.remove(inactiveButtonClass)
    button.classList.add('popup__save_hover')
  } else {
    button.setAttribute('disabled', '')
    button.classList.add(inactiveButtonClass)
    button.classList.remove('popup__save_hover')
  }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const forms = document.querySelectorAll(formSelector)
  forms.forEach(form => {
  const inputs = form.querySelectorAll(inputSelector)
  const button = form.querySelector(submitButtonSelector)
  checkButtonValidity({inactiveButtonClass}, form, button)
  inputs.forEach(input => {
      input.addEventListener('input', (evt) => {
        checkInputValidity({inputErrorClass}, {errorClass}, form, input)
        checkButtonValidity({inactiveButtonClass}, form, button)
      })
  })
  })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_error',
    inputErrorClass: 'popup__text_error',
    errorClass: 'error'
  });





