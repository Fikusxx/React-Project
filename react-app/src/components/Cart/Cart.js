import React from 'react'
import styles from "./Cart.module.css"
import { Modal } from "../UI/Modal"
import { CartContext } from '../../context/cart-context'
import { CartItem } from "./CartItem"

function Cart({ onClose, ...props })
{
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

    const cartItems = (
        <ul className={ styles["cart-items"] }>
            { context.items.map(item =>
            {
                return <CartItem key={ item.id } name={ item.name } amount={ item.amount } price={ item.price }
                    onRemove={ itemRemoveHandler.bind(null, item.id) } onAdd={ itemAddHandler.bind(null, item) } />
            }) }
        </ul>)

    return (
        <Modal onClose={ onClose }>
            { cartItems }
            <div className={ styles.total }>
                <span>Total Amount</span>
                <span>{ totalAmount }</span>
            </div>
            <div className={ styles.actions }>
                <button className={ styles["button--alt"] } onClick={ onClose }>Close</button>
                {
                    hasItems ? <button className={ styles["button"] } onClick={ () => console.log("ordering...") }>Order</button> : null
                }
            </div>
        </Modal>
    )
}

export { Cart };