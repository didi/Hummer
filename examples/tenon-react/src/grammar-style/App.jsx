import React, {useState} from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function App() {
  let [isDynamicBlackBox, setIsDynamicBlackBox] = useState(false)
  let [isDynamicStyle, setIsDynamicStyle] = useState(false)

  return (
    <PageItem title="Grammer Style">
      <DemoItem title="静态 Class(并列选择器)">
        <view className="static-class class1">
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="静态 Class(聚合选择器)">
        <view className="static-class class1 class2">
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="静态 Class(单一类)">
        <view className="static-class">
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="静态 Class(多类)">
        <view className="box static-simple-class">
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="动态 Class(单一)" operator={
        <>
          <button className="btn" onTap={() => {setIsDynamicBlackBox(false)}}>取消 Class</button>
          <button className="btn" onTap={() => {setIsDynamicBlackBox(true)}}>设定 Class</button>
        </>
      }>
        <view className={isDynamicBlackBox? 'box dynamic-black-class': 'box'}>
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="静态 Style">
        <view
          className="static-class"
          style="background-color:black;"
        >
          <text>Box</text>
        </view>
      </DemoItem>
      <DemoItem title="动态 Style" operator={
        <>
          <button className="btn" onTap={() => {setIsDynamicStyle(false)}}>取消 Style</button>
          <button className="btn" onTap={() => {setIsDynamicStyle(true)}}>设定 Style</button>
        </>
      }>
        <view
          className="static-class"
          style={isDynamicStyle?'background-color:black': 'background-color:#fa9153'}
        >
          <text>Box</text>
        </view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
