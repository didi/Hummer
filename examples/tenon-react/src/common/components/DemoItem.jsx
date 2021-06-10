import React from 'react';


function DemoItem(props){
  let {title, customTitle, children, operator} = props

  let titleUI = customTitle? customTitle : <text className="item-title-text">{title}</text>

  return (
    <view className="demo-item">
      <view className="item-title">
       {titleUI}
      </view>
      <view className="item-container">
         {children}
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