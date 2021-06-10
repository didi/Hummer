import React, {useState, useEffect} from 'react'

/**
 * 使用 useEffect 的测试用例
 */
function UseStateComponent(){
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  const [number, updateNumber] = useState(0);

  useEffect(() => {
    console.log("Component  Mount Or Update Effect")
  })

  useEffect(() => {
    console.log("Component  Mount Effect")
  }, [])

  useEffect(() => {
    return () => {
      console.log("Component  UnLoader Effect")
    }
  }, [])

  useEffect(() => {
    console.log('Count Change Effect')
  }, [count])

  return (
    <view>
      <text>You clicked {count} times</text>
      <text className="btn" onTap={() => {
        console.log('Click Btn:', count)
        setCount(count + 1)
      }}> count ++ </text>
      <text className="btn" onTap={() => updateNumber(number + 1)}> number ++ </text>

    </view>
  )
}


export default UseStateComponent