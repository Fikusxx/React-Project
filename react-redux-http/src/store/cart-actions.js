import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

function sendCartData(cart)
{
    return async (dispatch) =>
    {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart items..."
        }));

        async function sendRequest()
        {
            const response = await fetch("https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart)
            });

            if (response.ok === false) 
            {
                throw new Error("Sending data failed...")
            }
        }

        try
        {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Data has been sent succesfully!"
            }));
        }
        catch (error)
        {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error has occured!",
                message: "Something went wrong... :("
            }));
        }
    }
}

function fetchCartData()
{
    return async (dispatch) =>
    {
        async function sendRequest()
        {
            const response = await fetch("https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/cart.json");

            if (response.ok === false) 
            {
                throw new Error("Fetching data failed...")
            }

            return await response.json();
        }

        try
        {
            const data = await sendRequest();
            dispatch(cartActions.replaceCart(data));
        }
        catch (error)
        {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error has occured!",
                message: "Something went wrong... :("
            }));
        }
    }
}

export { sendCartData, fetchCartData };