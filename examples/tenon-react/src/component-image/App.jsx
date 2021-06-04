import React, { useState } from 'react';
import DemoItem from './components/DemoItem';

const imageSrc = "https://dpubstatic.udache.com/static/dpubimg/RJ4ZZ_M5ie/WechatIMG24764.jpeg"
const gifSrc = "https://pt-starimg.didistatic.com/static/starimg/img/NOrrIvZGhO1605683055216.gif"
const gifRepeatCount = 2

function ResizeItem(){
  const [resizeStyle, setResizeStyle] = useState("stretch")
  return (
    <DemoItem title="普通图片（resize）"
      operator={
        <>
          <button class="btn" onTap={() => setResizeStyle("stretch")}>
            stretch
          </button>
          <button class="btn" onTap={() => setResizeStyle("origin")}>
            origin
          </button>
          <button class="btn" onTap={() => setResizeStyle("contain")}>
            contain
          </button>
          <button class="btn" onTap={() => setResizeStyle("cover")}>
            cover
          </button>
        </>
      }>
      <image
        class="image-item"
        resize={resizeStyle}
        src={imageSrc}
      ></image>
    </DemoItem>
  )
}

function App() {
  return (
    <view class="page">
      <view class="demo-header">
        <text class="demo-title">Component Image</text>
      </view>
      <view class="demo-container">
        <DemoItem title="普通图片">
          <image class="image-item" src={imageSrc}></image>
        </DemoItem>
        <DemoItem title="普通图片带圆角">
          <image class="image-item border-item" src={imageSrc}></image>
        </DemoItem>
        <DemoItem title="Gif图片 & RepeatCount 2">
          <image
            class="image-item"
            src={gifSrc}
            gifRepeatCount={gifRepeatCount}
          ></image>
        </DemoItem>
        <ResizeItem></ResizeItem>
      </view>
    </view>
  );
}

export default App;
