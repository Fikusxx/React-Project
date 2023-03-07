import React from 'react'
import styles from "./MealItemForm.module.css"
import { Input } from "../../UI/Input";

function MealItemForm(props)
{
    const [amountIsValid, setAmountIsValid] = React.useState(true);
    const amountInputRef = React.useRef();

    function submitHandler(event)
    {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = Number(enteredAmount);

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5)
        {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    const input = {
        id: "amount",
        type: "number",
        min: "1",
        max: "5",
        step: "1",
        defaultValue: "1"
    }

    return (
        <form className={ styles.form } onSubmit={ submitHandler }>
            <Input ref={ amountInputRef } label="amount" input={ input } />
            <button>Add</button>
            {
                amountIsValid ? null : <p>Please enter a valid amount (1-5)</p>
            }
        </form>
    )
}

export { MealItemForm };