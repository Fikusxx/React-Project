import * as Redux from "react-redux"
import { uiActions } from "../../store/uiSlice";
import classes from './CartButton.module.css';

const CartButton = (props) =>
{
  const dispatch = Redux.useDispatch();
  const totalQuantity = Redux.useSelector(state => state.cart.totalQuantity);

  function toggleCartHandler()
  {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={ classes.button } onClick={ toggleCartHandler } >
      <span>My Cart</span>
      <span className={ classes.badge }>{ totalQuantity }</span>
    </button >
  );
};

export default CartButton;
