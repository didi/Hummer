import React from 'react';


function DemoItem(props){
  let {title, children, operator} = props
  return (
    <view class="demo-item">
      <view class="item-title">
        <text class="item-title-text">{title}</text>
      </view>
      <view class="item-container">
        <view class="box-container">
         {children}
        </view>
      </view>
      {operator &&
        <view class="operation-container">
          {operator}
       </view>
      }
    </view>
  )
}

export default DemoItem