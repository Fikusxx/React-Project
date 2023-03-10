import * as Redux from "react-redux"
import classes from './Header.module.css';
import { authActions } from "../store/authSlice"


const Header = () =>
{
  const dispatch = Redux.useDispatch();
  const isAuth = Redux.useSelector(state => state.auth.isAuthenticated);

  return (
    <header className={ classes.header }>
      <h1>Redux Auth</h1>
      {
        isAuth && (
          <nav>
            <ul>
              <li>
                <a href='/'>My Products</a>
              </li>
              <li>
                <a href='/'>My Sales</a>
              </li>
              <li>
                <button onClick={ () => dispatch(authActions.logout()) }>Logout</button>
              </li>
            </ul>
          </nav>
        )
      }
    </header>
  );
};

export default Header;
