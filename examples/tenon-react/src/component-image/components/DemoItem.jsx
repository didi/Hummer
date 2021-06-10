import React from 'react';


function DemoItem(props){
  let {title, children, operator} = props
  return (
    <view className="demo-item">
      <view className="item-title">
        <text className="item-title-text">{title}</text>
      </view>
      <view className="item-container">
        <view className="box-container">
         {children}
        </view>
      </view>
      {operator &&
        <view className="operation-container">
          {operator}
       </view>
      }
    </view>
  )
}

export default DemoItem