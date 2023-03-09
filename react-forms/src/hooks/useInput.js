import React from 'react'

const initialState = {
    value: "",
    isTouched: false
};

function useReducer(state, action)
{
    if (action.type === "INPUT")
    {
        return { ...state, value: action.value };
    }

    if (action.type === "BLUR")
    {
        return { ...state, isTouched: true };
    }

    if (action.type === "RESET")
    {
        return { ...state, value: "", isTouched: false };
    }

    return {
        value: action.value,
        isTouched: false
    };
}

function useInput(validate)
{
    const [state, dispatch] = React.useReducer(useReducer, initialState);

    const isValid = validate(state.value);
    const hasError = (isValid === false) && state.isTouched;

    function valueChangeHandler(event)
    {
        dispatch({ type: "INPUT", value: event.target.value })
    }

    function inputBlurHandler(event)
    {
        dispatch({ type: "BLUR" });
    }

    function reset()
    {
        dispatch({ type: "RESET" });
    }

    return {
        value: state.value,
        isValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export { useInput };