import React from 'react';

const itemArr = Array.apply(null, new Array(500));

function App() {

  const testList = itemArr.map((item, index) => {
    return (
      <view class="cube-wrapper" key={index}>
        <text class="cube-text">{ index }</text>
        <text class="cube-text">{ index }</text>
        <text class="cube-text">{ index }</text>
        <text class="cube-text">{ index }</text>
        <text class="cube-text">{ index }</text>
      </view>
    )
  })
  
  return (
    <scroller>
      {testList}
    </scroller>
  );
}

export default App;
