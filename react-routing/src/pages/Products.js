import { Link } from "react-router-dom";


function ProductsPage()
{
    return (
        <>
            <h2>Products</h2>
            <ul>
                <li><Link to="1">Product #1</Link></li>
                <li><Link to="2">Product #2</Link></li>
                <li><Link to="3">Product #3</Link></li>
            </ul>
        </>
    )
}

export { ProductsPage };