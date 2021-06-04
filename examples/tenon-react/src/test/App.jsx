import React from 'react';
import Hello from './components/Hello';
import DynamicHello from './components/DynamicHello';
import Image from './basic-components/Image';
import Input from './basic-components/Input';
import Textarea from './basic-components/Textarea';

function App() {
  const message = 'Hello Tenon!'
  const src = "https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg"
  return (
    <>
      <view>
        {/* <DynamicHello></DynamicHello> */}
        <Hello></Hello>
      </view>
      <view>
        <image  src={src} style="width:2rem;height:2rem;"></image>
      </view>
      <view>
        <input placeholder="Input PlaceHolder"></input>
      </view>
      <view>
        <textarea placeholder="Textarea PlaceHolder"></textarea>
      </view>
      <view>
        <switch></switch>
      </view>
      <view>
        <scroller style={{ height: "100hm", "background-color": "red", display: "flex", flexDirection: "row" }} scrollDirection="horizontal">
          <text>123  {message}</text>
          <text>123  {message}</text>
        </scroller>
      </view>
      <view style={{ backgroundColor: '#00ff00' }}>
        <text>123  {message}</text>
        <image src={src} style={{ width: "100hm", height: "100hm" }}></image>
      </view>
    </>
  );
}

export default App;
