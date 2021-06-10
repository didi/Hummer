import React from 'react';

const baseRichText = [{
  text: "文本1",
  color: "#00FF00",
},{
  text: "文本2",
  color: "#0000FF",
},{
  text: "文本3",
  color: "#000000",
  fontSize: "18"
}]

const imageRichText = [{
  text: "文本1",
  color: "#00FF00",
},{
  image: "ic_loading",
  imageWidth: 20,
  imageHeight: 20,
  imageAlign: "center",
  color: "#0000FF",
  fontSize: "10",
}]

const hrefRichText = [
  {
    text: "超链接",
    color: "#00FF00",
    fontSize: "18",
    href: "http://www.baidu.com",
    hrefColor: "#0000FF",
  },
   {
    text: "普通文本",
    color: "#00FF00",
    fontSize: "18"
  }
]

function App() {
  return (
    <view className="page">
    <view className="demo-header">
      <text className="demo-title">Component Text</text>
    </view>
    <view className="demo-container">
      <view className="demo-item">
        <view className="item-title">
          <text className="item-title-text">普通文本</text>
        </view>
        <view className="item-container">
          <text>我是普通的文本</text>
        </view>
      </view>
      <view className="demo-item">
        <view className="item-title">
          <text className="item-title-text">富文本(richText)</text>
        </view>
        <view className="item-container">
          <text richText={baseRichText}></text>
        </view>
      </view>
      <view className="demo-item">
        <view className="item-title">
          <text className="item-title-text">富文本~图片(richText)</text>
        </view>
        <view className="item-container">
          <text richText={imageRichText}></text>
        </view>
      </view>
      <view className="demo-item">
        <view className="item-title">
          <text className="item-title-text">富文本~超链接(richText)</text>
        </view>
        <view className="item-container">
          <text richText={hrefRichText}></text>
        </view>
      </view>
    </view>
  </view>
  );
}

export default App;
