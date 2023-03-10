import * as ReduxToolkit from "@reduxjs/toolkit"
import { counterSlice } from "./counterSlice";
import { authSlice } from "./authSlice";

// this will merge all reducers from reducer object into 1.
const store = ReduxToolkit.configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});

export { store };