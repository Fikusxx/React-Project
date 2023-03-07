import React from 'react'
import styles from "./HeaderCartButton.module.css"
import { CartIcon } from "../Cart/CartIcon"
import { CartContext } from "../../context/cart-context";

function HeaderCartButton({ onClick, ...props })
{
    const [isHighlighted, setIsHighlighted] = React.useState(false);
    const ctx = React.useContext(CartContext);
    const totalAmount = ctx.items.reduce((number, item) =>
    {
        return number + item.amount
    }, 0);

    const { items } = ctx;
    const btnClasses = `${ styles.button } ${ isHighlighted ? styles.bump : "" }`;

    React.useEffect(() =>
    {
        if (ctx.items.length === 0) return;

        setIsHighlighted(true);
        const timer = setTimeout(() =>
        {
            setIsHighlighted(false);
        }, 300)

        return () =>
        {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={ btnClasses } onClick={ onClick }>
            <span className={ styles.icon }>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={ styles.badge }>
                { totalAmount }
            </span>
        </button>
    )
}

export { HeaderCartButton };