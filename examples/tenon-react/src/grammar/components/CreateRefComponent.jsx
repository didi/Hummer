import React, { useEffect } from 'react'

/**
 * 使用 createRef 的测试用例
 */
function CreateRefComponent({initialCount}){
  const ref = React.createRef();

  useEffect(() => {
    ref.current.getRect((obj) => {
      console.log('Get Rect', obj)
    })
  }, [])
  return (
    <view ref={ref}>
      <text > Ref Get Rect</text>
    </view>
  )
}


export default CreateRefComponent