import React from 'react'
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from './context/CartProvider';

function App()
{
  const [isCartShown, setIsCartShown] = React.useState(false);

  function showCartHandler()
  {
    setIsCartShown(true);
  }

  function hideCartHandler()
  {
    setIsCartShown(false);
  }

  return (
    <CartProvider>
      {
        isCartShown ? <Cart onClose={ hideCartHandler } /> : null
      }

      <Header onShowCart={ showCartHandler } />

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
