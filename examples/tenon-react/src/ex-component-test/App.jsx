import React,{useState} from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function App() {
  const [eventValue, setEventValue] = useState("Event View")
  const [safeValue, setSafeValue] = useState("Card Content: SafeValue")

  return (
    <PageItem title="原生组件拓展">
      <DemoItem title="纯视图组件拓展">
        <ex-simple-view className="simple-view"></ex-simple-view>
      </DemoItem>
      <DemoItem title="纯视图组件（支持属性）">
        <ex-attr-view className="attr-view" value="I Am Attr View!"></ex-attr-view>
      </DemoItem>
      <DemoItem title="纯视图组件（属性&方法）">
        <ex-event-view className="event-view" value={eventValue} onChange={(value) => {console.log(`Value Change:${value}`)}}></ex-event-view>
        <button className="btn" onTap={() => setEventValue(`Random Value:${Math.floor(Math.random() * 1000)}`)}>Change Event Value</button>
      </DemoItem>
      <DemoItem title="拦截子视图组件">
        <view className="view-container">
          <ex-safe-view className="safe-view" headerText="Card Header">
            <view className="safe-view-content">
              <text>{safeValue}</text>
            </view>
            <button className="btn" onTap={() => setSafeValue(`Card Content: ${Math.floor(Math.random() * 1000)}`)}>
              Update SafeValue
            </button>
          </ex-safe-view>
        </view>
      </DemoItem>
    </PageItem>
  );
}

export default App;
