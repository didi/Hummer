import React from 'react';


function PageItem(props){
  let {title, children} = props
  return (
    <view className="page">
      <view className="demo-header">
        <text className="demo-title">{title}</text>
      </view>
      <view className="demo-container">
        {children}
      </view>
    </view>
  )
}

export default PageItem