import React from 'react'
import { CartContext } from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

function cartReducer(state, action)
{
    if (action.type === "ADD")
    {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem)
        {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else
        {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if (action.type === "REMOVE")
    {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount === 1)
        {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else
        {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if (action.type === "CLEAR")
    {
        return defaultCartState;
    }

    return defaultCartState;
}


function CartProvider({ children, ...props })
{
    const [cartState, dispatch] = React.useReducer(cartReducer, defaultCartState);

    function addItem(item)
    {
        dispatch({ type: "ADD", item: item })
    }

    function removeItem(id)
    {
        dispatch({ type: "REMOVE", id: id })
    }

    function clearCartHandler()
    {
        dispatch({ type: "CLEAR" });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={ cartContext }>
            { children }
        </CartContext.Provider>
    )
}

export { CartProvider };