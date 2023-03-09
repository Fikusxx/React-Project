import React from 'react'
import classes from './Checkout.module.css';

function isNotEmpty(value)
{
  return value.trim() !== "";
}

function isFiveChars(value)
{
  return value.trim().length >= 5;
}


const Checkout = (props) =>
{
  const [formInputsValidity, setFormInputsVailidity] = React.useState({
    name: true,
    street: true,
    city: true,
    postal: true
  });
  const nameRef = React.useRef();
  const streetRef = React.useRef();
  const postalRef = React.useRef();
  const cityRef = React.useRef();

  const confirmHandler = (event) =>
  {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const isNameValid = isNotEmpty(name);
    const isStreetValid = isNotEmpty(street);
    const isPostalValid = isFiveChars(postal);
    const isCityValid = isNotEmpty(city);

    setFormInputsVailidity({
      name: isNameValid,
      street: isStreetValid,
      city: isCityValid,
      postal: isPostalValid
    })

    const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid;
    if (isFormValid === false) return;

    props.onConfirm({
      name,
      street,
      postal,
      city
    });
  };

  return (
    <form className={ classes.form } onSubmit={ confirmHandler }>
      <div className={ `${ classes.control } ${ formInputsValidity.name ? "" : classes.invalid }` }>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={ nameRef } />
        { formInputsValidity.name ? null : <div className={ classes["text-error"] }>Please enter valid name</div> }
      </div>
      <div className={ `${ classes.control } ${ formInputsValidity.street ? "" : classes.invalid }` }>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={ streetRef } />
        { formInputsValidity.street ? null : <div className={ classes["text-error"] }>Please enter valid street</div> }
      </div>
      <div className={ `${ classes.control } ${ formInputsValidity.postal ? "" : classes.invalid }` }>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={ postalRef } />
        { formInputsValidity.postal ? null : <div className={ classes["text-error"] }>Please enter valid ZIP code</div> }
      </div>
      <div className={ `${ classes.control } ${ formInputsValidity.city ? "" : classes.invalid }` }>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={ cityRef } />
        { formInputsValidity.city ? null : <div className={ classes["text-error"] }>Please enter valid city</div> }
      </div>
      <div className={ classes.actions }>
        <button type='button' onClick={ props.onCancel }>
          Cancel
        </button>
        <button className={ classes.submit }>Confirm</button>
      </div>
    </form>
  );
};

export { Checkout };
