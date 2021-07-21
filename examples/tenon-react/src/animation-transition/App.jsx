import React, { useEffect, useState } from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function App() {
  let [startAnimation, setStartAnimation] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      Toast.show('开始动画')
      setStartAnimation(true)
    }, 2000)
  }, [])
  return (
    <PageItem title="Transition 动画">
      <DemoItem title="透明度(opacity)">
        <view className={startAnimation ? 'animation-opacity' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="旋转（Rotate）">
        <view className={startAnimation ? 'animation-rotate' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="位移（Position）">
        <view className={startAnimation ? 'animation-translate' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="放缩（Scale）">
        <view className={startAnimation ? 'animation-scale' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="背景色（Background）">
        <view className={startAnimation ? 'animation-background' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="宽度（Width）">
        <view className={startAnimation ? 'animation-width' : 'box animation'}></view>
      </DemoItem>
      <DemoItem title="高度（Height）">
        <view className={startAnimation ? 'animation-height' : 'box animation'}></view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
