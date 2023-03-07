import React from 'react'
import styles from "./Input.module.css"

const Input = React.forwardRef((props, ref) => 
{
    const { id } = props.input;

    return (
        <div className={ styles.input }>
            <label htmlFor={ id }>{ props.label }</label>
            <input ref={ ref } { ...props.input } />
        </div>
    );
});

export { Input };