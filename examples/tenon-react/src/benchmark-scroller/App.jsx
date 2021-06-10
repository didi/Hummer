import React from 'react';

const itemArr = Array.apply(null, new Array(500));

function App() {

  const testList = itemArr.map((item, index) => {
    return (
      <view className="cube-wrapper" key={index}>
        <text className="cube-text">{ index }</text>
        <text className="cube-text">{ index }</text>
        <text className="cube-text">{ index }</text>
        <text className="cube-text">{ index }</text>
        <text className="cube-text">{ index }</text>
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
