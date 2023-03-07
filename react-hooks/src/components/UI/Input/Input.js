import React from 'react'
import classes from "./Input.module.css"

function Input({ isValid, label, id, ...props })
// function Input({ isValid, label, id, type, value, onChange, onBlur, ...props })
{

    return (
        <div className={ `${ classes.control } ${ isValid === false ? classes.invalid : '' }` }>
            <label htmlFor={ id }>{ label }</label>
            {/* <input id={ id } type={ type } value={ value } onChange={ onChange } onBlur={ onBlur } /> */ }
            <input { ...props } />
        </ div>
    )
}

export { Input };