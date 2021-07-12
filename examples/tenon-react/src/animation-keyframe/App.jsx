import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

import { animFadeIn, animFadeOut, animRotation, animTranslation, animTranslationBack, animScale, animScaleBack, animBackground, animBackgroundBack, animWidth, animWidthBack, animHeight, animHeightBack } from './common/animation';

function App() {
  return (
    <PageItem title="帧动画">
      <DemoItem title="透明度（Opacity）">
        <view class="box" animation={animFadeOut}></view>
        <view class="box" animation={animFadeIn}></view>
      </DemoItem>
      <DemoItem title="旋转（Rotate）">
        <view class="box" animation={animRotation}></view>
      </DemoItem>
      <DemoItem title="位移（Position）">
        <view class="box" animation={animTranslation}></view>
        <view class="box" animation={animTranslationBack}></view>
      </DemoItem>
      <DemoItem title="放缩（Scale）">
        <view class="box" animation={animScale}></view>
        <view class="box" animation={animScaleBack}></view>
      </DemoItem>
      <DemoItem title="背景色（Background）">
        <view class="box" animation={animBackground}></view>
        <view class="box" animation={animBackgroundBack}></view>
      </DemoItem>
      <DemoItem title="宽度（Width）">
        <view class="box" animation={animWidth}></view>
        <view class="box" animation={animWidthBack}></view>
      </DemoItem>
      <DemoItem title="高度（Height）">
        <view class="box" animation={animHeight}></view>
        <view class="box" animation={animHeightBack}></view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
