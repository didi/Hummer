import React, { useEffect, useState } from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function App() {
  let [startAnimation, setStartAnimation] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      console.log('Start Animation')
      setStartAnimation(true)
    }, 2000)
  }, [])
  return (
    <PageItem title="Transition 动画">
      <DemoItem title="透明度(opacity)">
        <view className={startAnimation ? 'box animation animation-opacity' : 'box animation'}></view>
      </DemoItem>
      {/* <DemoItem title="旋转（Rotate）">
        <view className="box animation" className={startAnimation ? 'animation-rotate' : ''}></view>
      </DemoItem>
      <DemoItem title="位移（Position）">
        <view className="box animation" className={startAnimation ? 'animation-translate' : ''}></view>
      </DemoItem>
      <DemoItem title="放缩（Scale）">
        <view className="box animation" className={startAnimation ? 'animation-scale' : ''}></view>
      </DemoItem>
      <DemoItem title="背景色（Background）">
        <view className="box animation" className={startAnimation ? 'animation-background' : ''}></view>
      </DemoItem>
      <DemoItem title="宽度（Width）">
        <view className="box animation" className={startAnimation ? 'animation-width' : ''}></view>
      </DemoItem>
      <DemoItem title="高度（Height）">
        <view className="box animation" className={startAnimation ? 'animation-height' : ''}></view>
      </DemoItem> */}
    </PageItem>
  );
}

export default App;
