import React from 'react'
import { useInput } from '../hooks/useInput';

function validateName(name)
{
  return name.trim().length > 0;
}

function validateEmail(email)
{
  return email.includes("@");
}

const SimpleInput = (props) =>
{
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(validateName);
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(validateEmail);


  let isFormValid = false;

  if (nameIsValid && emailIsValid)
  {
    isFormValid = true;
  }

  function formSubmitHandler(event)
  {
    event.preventDefault();

    if (nameIsValid === false || emailIsValid === false) return;

    // reset values on submit
    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={ formSubmitHandler }>
      <div className={ nameInputClasses }>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={ name } onChange={ nameChangeHandler } onBlur={ nameBlurHandler } />
        {
          nameInputHasError ? <p className="error-text">Please enter valid name.</p> : null
        }
      </div>
      <div className={ emailInputClasses }>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' value={ email } onChange={ emailChangeHandler } onBlur={ emailBlurHandler } />
        {
          emailInputHasError ? <p className="error-text">Email must include @ sign.</p> : null
        }
      </div>
      <div className="form-actions">
        <button disabled={ isFormValid === false }>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
