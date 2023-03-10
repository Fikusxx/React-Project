import * as Redux from "react-redux"
import React from 'react'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-actions";
import { fetchCartData } from "./store/cart-actions";

let isInitial = true;

function App()
{
  const dispatch = Redux.useDispatch();
  const showCart = Redux.useSelector(state => state.ui.isCartVisible);
  const cart = Redux.useSelector(state => state.cart);
  const notification = Redux.useSelector(state => state.ui.notification);

  React.useEffect(() =>
  {
    dispatch(fetchCartData());
  }, [dispatch])

  React.useEffect(() =>
  {
    if (isInitial)
    {
      isInitial = false;
      return;
    }
    if (cart.changed) dispatch(sendCartData(cart));
  }, [dispatch, cart]);

  return (
    <>
      {
        notification ? <Notification { ...notification } /> : null
      }
      <Layout>
        {
          showCart ? <Cart /> : null
        }
        <Products />
      </Layout>
    </>
  );
}

export default App;
