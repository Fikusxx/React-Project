import * as Redux from "react-redux"
import React from 'react'
import classes from './Counter.module.css';
import { counterActions } from "../store/counterSlice";

const Counter = () =>
{
  const dispatch = Redux.useDispatch();
  const counter = Redux.useSelector(state => state.counter.counter);
  const showCounter = Redux.useSelector(state => state.counter.showCounter);

  const toggleCounterHandler = () => 
  {
    dispatch(counterActions.toggle());
  };

  function incrementHandler()
  {
    dispatch(counterActions.increment());
  }

  function decrementHandler()
  {
    dispatch(counterActions.decrement());
  }

  return (
    <main className={ classes.counter }>
      <h1>Redux Counter</h1>
      {
        showCounter ? <div className={ classes.value }>{ counter }</div> : null
      }
      <div>
        <button onClick={ incrementHandler }>Increment</button>
        <button onClick={ () => dispatch(counterActions.increase({ value: 5 })) }>Increase by 5</button>
        <button onClick={ () => dispatch(counterActions.decrease({ value: 5 })) }>Decrease by 5</button>
        <button onClick={ decrementHandler }>Decrement</button>
      </div>
      <button onClick={ toggleCounterHandler }>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends React.Component
// {
//   incrementHandler()
//   {
//     this.props.increment();
//   }

//   decrementHandler()
//   {
//     this.props.decrement();
//   }

//   render()
//   {
//     return (
//       <main className={ classes.counter }>
//         <h1>Redux Counter</h1>
//         <div className={ classes.value }>{ this.props.counter }</div>
//         <div>
//           <button onClick={ this.incrementHandler.bind(this) }>Increment</button>
//           <button onClick={ this.decrementHandler.bind(this) }>Decrement</button>
//         </div>
//       </main>
//     );
//   }
// }

// function mapStateToProps(state)
// {
//   return { counter: state.counter }
// }

// function mapDispatchToProps(dispatch)
// {
//   return {
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" })
//   }
// }

// export default Redux.connect(mapStateToProps, mapDispatchToProps)(Counter);
