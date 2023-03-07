import React from 'react';
import { useAuthContext } from './components/Context/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App()
{
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <MainHeader />
      <main>
        { !isLoggedIn && <Login /> }
        { isLoggedIn && <Home /> }
      </main>
    </>
  );
}

export default App;