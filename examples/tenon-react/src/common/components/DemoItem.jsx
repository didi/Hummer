import React from 'react';


function DemoItem(props){
  let {title, customTitle, children, operator} = props

  let titleUI = customTitle? customTitle : <text class="item-title-text">{title}</text>

  return (
    <view class="demo-item">
      <view class="item-title">
       {titleUI}
      </view>
      <view class="item-container">
         {children}
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