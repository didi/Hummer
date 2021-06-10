import React, {useReducer} from 'react'


 const initialState = {count: 0};

 function reducer(state, action) {
   switch (action.type) {
     case 'increment':
       return {count: state.count + 1};
     case 'decrement':
       return {count: state.count - 1};
     default:
       throw new Error();
   }
 }

/**
 * 使用 useReducer 的测试用例
 */
 function Counter() {
   const [state, dispatch] = useReducer(reducer, initialState);
   return (
     <>
       <text>Count: {state.count}</text>
       <text className="btn" onTap={() => dispatch({type: 'decrement'})}>-</text>
       <text className="btn" onTap={() => dispatch({type: 'increment'})}>+</text>
     </>
   );
 }


export default Counter