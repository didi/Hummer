import React from 'react';

function App() {
  return (
    <view className="page">
      <view className="demo-header">
        <text className="demo-title">Component View</text>
      </view>
      <view className="demo-container">
        <view className="demo-item">
          <view className="item-title">
            <text className="item-title-text">View With Border</text>
          </view>
          <view className="item-container">
            <view className="demo-box border-box"></view>
          </view>
        </view>
        <view className="demo-item">
          <view className="item-title">
            <text className="item-title-text">View With Border Top</text>
          </view>
          <view className="item-container">
            <view className="demo-box border-top-box"></view>
          </view>
        </view>
        <view className="demo-item">
          <view className="item-title">
            <text className="item-title-text">View With Background Image</text>
          </view>
          <view className="item-container">
            <view className="demo-box background-box"></view>
          </view>
        </view>
      </view>
    </view>
  );
}

export default App;
