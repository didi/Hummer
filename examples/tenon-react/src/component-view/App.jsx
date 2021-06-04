import React from 'react';

function App() {
  return (
    <view class="page">
      <view class="demo-header">
        <text class="demo-title">Component View</text>
      </view>
      <view class="demo-container">
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">View With Border</text>
          </view>
          <view class="item-container">
            <view class="demo-box border-box"></view>
          </view>
        </view>
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">View With Border Top</text>
          </view>
          <view class="item-container">
            <view class="demo-box border-top-box"></view>
          </view>
        </view>
        <view class="demo-item">
          <view class="item-title">
            <text class="item-title-text">View With Background Image</text>
          </view>
          <view class="item-container">
            <view class="demo-box background-box"></view>
          </view>
        </view>
      </view>
    </view>
  );
}

export default App;
