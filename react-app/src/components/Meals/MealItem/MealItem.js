import React from 'react'
import styles from "./MealItem.module.css"
import { MealItemForm } from "./MealItemForm";
import { CartContext } from "../../../context/cart-context"

function MealItem({ id, name, description, price, ...props })
{
    const context = React.useContext(CartContext);
    const formattedPrice = `$${ price.toFixed(2) }`;

    function addToCartHandler(amount)
    {
        context.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }

    return (
        <li className={ styles.meal }>
            <div>
                <h3>{ name }</h3>
                <div className={ styles.description }>{ description }</div>
                <div className={ styles.price }>{ formattedPrice }</div>
            </div>
            <div>
                <MealItemForm onAddToCart={ addToCartHandler } />
            </div>
        </li>
    )
}

export { MealItem };