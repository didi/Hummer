import React from 'react';

function App() {
  const message = 'Hello Tenon React!'
  return (
    <view style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;">
      <text class="message">{message}</text>
    </view>
  );
}

export default App;
