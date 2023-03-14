import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css"

function MainNavigation()
{
    function isActive({ isActive })
    {
        return isActive ? styles.active : "";
    }

    return (
        <header className={ styles.header }>
            <nav>
                <ul className={ styles.list }>
                    <li><NavLink className={ isActive } to="/">Home</NavLink></li>
                    <li><NavLink className={ isActive } to="/products">Products</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export { MainNavigation };