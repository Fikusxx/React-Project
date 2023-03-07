import React from 'react'
import mealsImage from "../../assets/meals.jpg"
import styles from "./Header.module.css"
import { HeaderCartButton } from './HeaderCartButton'

function Header({ onShowCart, ...props })
{

    return (
        <>
            <header className={ styles.header }>
                <h1>Meals</h1>
                <HeaderCartButton onClick={ onShowCart } />
            </header>
            <div className={ styles["main-image"] }>
                <img src={ mealsImage } alt="food" />
            </div>
        </>
    )
}

export { Header };