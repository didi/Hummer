import React, {useState} from 'react'

/**
 * 使用 useState 的测试用例
 */
function UseStateComponent({initialCount}){
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(initialCount);
  return (
    <view>
      <text>Current Count: {count} </text>
      <text className="btn" onTap={() => setCount(initialCount)}> Reset </text>
      <text className="btn" onTap={() => setCount(prevCount => prevCount - 1)}> - </text>
      <text className="btn" onTap={() => setCount(prevCount => prevCount + 1)}> + </text>
    </view>
  )
}


export default UseStateComponent