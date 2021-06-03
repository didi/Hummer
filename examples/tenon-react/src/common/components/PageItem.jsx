import React from 'react';


function PageItem(props){
  let {title, children} = props
  return (
    <view class="page">
      <view class="demo-header">
        <text class="demo-title">{title}</text>
      </view>
      <view class="demo-container">
        {children}
      </view>
    </view>
  )
}

export default PageItem