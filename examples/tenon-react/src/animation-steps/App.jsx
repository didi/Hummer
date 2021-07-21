import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

import {animStep, translateStep} from './common/animation'
function App() {
  return (
    <PageItem title="次序动画">
      <DemoItem title="透明度（Opacity）& 位移">
        <view class="box" animation={animStep}></view>
      </DemoItem>
      <DemoItem title="位移">
        <view class="box" animation={translateStep}></view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
