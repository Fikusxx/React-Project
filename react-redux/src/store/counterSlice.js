import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increment(state) { state.counter++ },
        decrement(state) { state.counter-- },
        increase(state, action) { state.counter += action.payload.value },
        decrease(state, action) { state.counter -= action.payload.value },
        toggle(state) { state.showCounter = !state.showCounter }
    }
});

const counterActions = counterSlice.actions;

export { counterSlice, counterActions };