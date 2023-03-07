import React, { useState } from 'react';
import { useAuthContext } from '../Context/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

function emailReducer(state, action)
{
  if (action.type === "USER_INPUT")
  {
    return { value: action.value, isValid: action.value.includes("@") }
  }
  else if (action.type === "INPUT_BLUR")
  {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
}

function passwordReducer(state, action)
{
  if (action.type === "USER_INPUT")
  {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
  else if (action.type === "INPUT_BLUR")
  {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}

const Login = (props) =>
{
  const { onLogin } = useAuthContext();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = React.useReducer(emailReducer, { value: "", isValid: null });
  const [passwordState, dispatchPassword] = React.useReducer(passwordReducer, { value: "", isValid: null });

  // useEffect only runs when isValid changes
  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  React.useEffect(() =>
  {
    const identifier = setTimeout(() =>
    {
      setFormIsValid(isEmailValid && isPasswordValid)
    }, 500)

    return () =>
    {
      clearTimeout(identifier);
    }
  }, [isEmailValid, isPasswordValid])

  const emailChangeHandler = (event) =>
  {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) =>
  {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () =>
  {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () =>
  {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) =>
  {
    event.preventDefault();
    if (formIsValid)
    {
      onLogin(emailState.value, passwordState.value);
    }
  };

  return (
    <Card className={ classes.login }>
      <form onSubmit={ submitHandler }>

        <Input isValid={ emailState.isValid } label="Email" type="email" id="email" value={ emailState.value }
          onChange={ emailChangeHandler } onBlur={ validateEmailHandler } />

        <Input isValid={ passwordState.isValid } label="Password" type="password" id="password" value={ passwordState.value }
          onChange={ passwordChangeHandler } onBlur={ validatePasswordHandler } />

        <div className={ classes.actions }>
          <Button type="submit" className={ classes.btn }>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
