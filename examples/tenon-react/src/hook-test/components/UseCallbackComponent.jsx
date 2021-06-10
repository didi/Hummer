import React, {useState, useCallback} from 'react'

function doSomething(count){
  console.log("Current Count:", count)
}
/**
 * 使用 useCallback 的测试用例
 */
function UseCallbackComponent({initialCount}){
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(initialCount);

  const memoizedCallback = useCallback(
    () => {
      // 获取当前最新的 count值
      doSomething(count);
    },
    [count],
  ); 

  return (
    <view>
      <text>Current Count: {count} </text>
      <text className="btn" onTap={() => setCount(initialCount)}> Reset </text>
      <text className="btn" onTap={() => setCount(prevCount => prevCount - 1)}> - </text>
      <text className="btn" onTap={() => setCount(prevCount => prevCount + 1)}> + </text>
      <text className="btn" onTap={() => memoizedCallback()}> memoizedCallback </text>
    </view>
  )
}


export default UseCallbackComponent