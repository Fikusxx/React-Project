import React from 'react'
import styles from "./Cart.module.css"
import { Modal } from "../UI/Modal"
import { CartContext } from '../../context/cart-context'
import { CartItem } from "./CartItem"
import { Checkout } from './Checkout'

function Cart({ onClose, ...props })
{
    const [isCheckout, setIsCheckout] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [didSubmit, setDidSubmit] = React.useState(false);
    const context = React.useContext(CartContext);
    const totalAmount = `$${ context.totalAmount.toFixed(2) }`;
    const hasItems = context.items.length > 0;

    function itemRemoveHandler(id)
    {
        context.removeItem(id);
    }

    function itemAddHandler(item)
    {
        context.addItem({ ...item, amount: 1 })
    }

    function orderHandler()
    {
        setIsCheckout(true);
    }

    async function submitOrderHandler(userData)
    {
        setIsSubmitting(true);
        await fetch("https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                items: context.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        context.clearCart();
    }

    const cartItems = (
        <ul className={ styles["cart-items"] }>
            { context.items.map(item =>
            {
                return <CartItem key={ item.id } name={ item.name } amount={ item.amount } price={ item.price }
                    onRemove={ itemRemoveHandler.bind(null, item.id) } onAdd={ itemAddHandler.bind(null, item) } />
            }) }
        </ul>)

    const modalActions = (<div className={ styles.actions }>
        <button className={ styles["button--alt"] } onClick={ onClose }>Close</button>
        {
            hasItems ? <button className={ styles["button"] } onClick={ orderHandler }>Order</button> : null
        }
    </div>)

    const cartModalContent = (
        <>
            { cartItems }
            <div className={ styles.total }>
                <span>Total Amount</span>
                <span>{ totalAmount }</span>
            </div>
            {
                isCheckout ? <Checkout onCancel={ onClose } onConfirm={ submitOrderHandler } /> : modalActions
            }
        </>
    );

    const isSubmittingModalContent = <div>Sending order data...</div>;
    const didSubmitModalContent = <div>Order was successful!</div>;

    return (
        <Modal onClose={ onClose }>
            { isSubmitting === false && didSubmit === false ? cartModalContent : null }
            { isSubmitting ? isSubmittingModalContent : null }
            { isSubmitting === false && didSubmit ? didSubmitModalContent : null }
        </Modal>
    )
}

export { Cart };