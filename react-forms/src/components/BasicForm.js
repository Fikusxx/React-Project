import React from 'react'
import { useInput } from '../hooks/useInput';

function validateName(value)
{
  return value.trim().length > 0;
}

function validateEmail(value)
{
  return value.includes("@");
}

const BasicForm = (props) =>
{
  const {
    value: firstName,
    isValid: isFirstNameValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(validateName);
  const {
    value: lastName,
    isValid: isLastNameValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(validateName);
  const {
    value: email,
    isValid: isEmailValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(validateEmail);

  let isFormValid = false;
  if (isFirstNameValid && isLastNameValid && isEmailValid) isFormValid = true;

  function onSubmit(event)
  {
    event.preventDefault();

    if (isFormValid === false) return;

    console.log("submit...");
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  }

  const firstNameInputClasses = firstNameInputHasError ? "form-control invalid" : "form-control";
  const lastNameInputClasses = lastNameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={ onSubmit }>
      <div className='control-group'>
        <div className={ firstNameInputClasses }>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={ firstName } onChange={ firstNameChangeHandler } onBlur={ firstNameBlurHandler } />
          {
            firstNameInputHasError ? <div className="error-text"> Please enter valid first name </div> : null
          }
        </div>
        <div className={ lastNameInputClasses }>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' value={ lastName } onChange={ lastNameChangeHandler } onBlur={ lastNameBlurHandler } />
          {
            lastNameInputHasError ? <div className="error-text"> Please enter valid first name </div> : null
          }
        </div>
      </div>
      <div className={ emailInputClasses }>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' value={ email } onChange={ emailChangeHandler } onBlur={ emailBlurHandler } />
        {
          emailInputHasError ? <div className="error-text"> Please enter valid first name </div> : null
        }
      </div>
      <div className='form-actions'>
        <button disabled={ isFormValid === false }>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
