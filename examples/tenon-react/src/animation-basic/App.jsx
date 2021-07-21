import React from 'react';
import {useAnimation} from '@hummer/tenon-react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

import {animFadeIn, animFadeOut, animRotation, animTranslation, animScale, animBackground, animWidth, animHeight} from './common/animation';

function App() {
  return (
    <PageItem title="基础动画">
      <DemoItem title="异步动画">
        <SyncAnimation></SyncAnimation>
      </DemoItem>
      <DemoItem title="透明度（Opacity）">
        <view class="box" animation={animFadeOut}></view>
        <view class="box box-opacity-hide" animation={animFadeIn}></view>
      </DemoItem>
      <DemoItem title="旋转（Rotate）">
        <view class="box" animation={animRotation}></view>
      </DemoItem>
      <DemoItem title="位移（Position）">
        <view class="box" animation={animTranslation}></view>
      </DemoItem>
      <DemoItem title="放缩（Scale）">
        <view class="box" animation={animScale}></view>
      </DemoItem>
      <DemoItem title="背景色（Background）">
        <view class="box" animation={animBackground}></view>
      </DemoItem>
      <DemoItem title="宽度（Width）">
        <view class="box" animation={animWidth}></view>
      </DemoItem>
      <DemoItem title="高度（Height）">
        <view class="box" animation={animHeight}></view>
      </DemoItem>
    </PageItem>
  );
}

function SyncAnimation(){
  let [animationRef, startAnimation] = useAnimation(animFadeOut)
  return (
    <>
      <view class="box" ref={animationRef}></view>
      <text class="btn" onTap={() => startAnimation()}>开始动画</text>
    </>
  )
}

export default App;
