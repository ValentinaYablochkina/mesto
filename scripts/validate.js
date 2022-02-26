const formSubmit = (evt) => {
  evt.preventDefault()
}

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
  } else {
    button.setAttribute('disabled', '')
    button.classList.add(inactiveButtonClass)
  }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const forms = document.querySelectorAll(formSelector)
  forms.forEach(form => {
  form.addEventListener('submit', formSubmit)
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






