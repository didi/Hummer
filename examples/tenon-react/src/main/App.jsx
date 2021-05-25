import React from 'react';
import Hello from './components/Hello';
import DynamicHello from './components/DynamicHello';

function App() {
  const message = 'Hello Tenon!'
  const src="https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg"
  return (
    <>
      <view>
        <DynamicHello></DynamicHello>
        <Hello></Hello>
      </view>
      <view style={{backgroundColor: '#00ff00'}}>
        <text>123  {message}</text>
        <image src={src} style={{width:"100hm", height: "100hm"}}></image>
      </view>
    </>
  );
}

export default App;
