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
          <button className="btn" onTap={() => setResizeStyle("stretch")}>
            stretch
          </button>
          <button className="btn" onTap={() => setResizeStyle("origin")}>
            origin
          </button>
          <button className="btn" onTap={() => setResizeStyle("contain")}>
            contain
          </button>
          <button className="btn" onTap={() => setResizeStyle("cover")}>
            cover
          </button>
        </>
      }>
      <image
        className="image-item"
        resize={resizeStyle}
        src={imageSrc}
      ></image>
    </DemoItem>
  )
}

function App() {
  return (
    <view className="page">
      <view className="demo-header">
        <text className="demo-title">Component Image</text>
      </view>
      <view className="demo-container">
        <DemoItem title="普通图片">
          <image className="image-item" src={imageSrc}></image>
        </DemoItem>
        <DemoItem title="普通图片带圆角">
          <image className="image-item border-item" src={imageSrc}></image>
        </DemoItem>
        <DemoItem title="Gif图片 & RepeatCount 2">
          <image
            className="image-item"
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
