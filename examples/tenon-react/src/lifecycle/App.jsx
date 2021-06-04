import React from 'react';
import {usePageEvent} from '@hummer/tenon-react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';


usePageEvent("onLoad", () => {
  console.log('onLoad LifeCycle')
})

usePageEvent("onShow", () => {
  console.log('onShow LifeCycle')
})

usePageEvent("onHide", () => {
  console.log('onHide LifeCycle')
})

usePageEvent("onBack", () => {
  console.log('onBack LifeCycle')
  // return true
})

usePageEvent("onUnload", () => {
  console.log('onUnload LifeCycle')
})

function App() {
  return (
    <PageItem title="LifeCycle">
      <DemoItem title="LifeCycle">
        <text>LifeCycle</text>
      </DemoItem>
    </PageItem>
  );
}

export default App;
