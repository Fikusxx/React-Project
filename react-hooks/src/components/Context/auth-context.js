import React from 'react'

const defaultValue = {
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
}
const AuthContext = React.createContext(defaultValue);

function useAuthContext()
{
    const context = React.useContext(AuthContext);
    if (!context) throw new Error();

    return context;
}

function AuthContextProvider({ children, ...props })
{
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() =>
    {
        const logData = localStorage.getItem("isLoggedIn");
        if (logData === "1") setIsLoggedIn(true);

    }, [isLoggedIn])

    function logoutHandler()
    {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }

    function loginHandler()
    {
        localStorage.getItem("isLoggedIn");
        setIsLoggedIn(true);
    }

    const context = { isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler };

    return (
        <AuthContext.Provider value={ context }>{ children }</AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider };