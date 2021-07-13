import React,{useState} from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function App() {
  const [eventValue, setEventValue] = useState("Event View")
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
    </PageItem>
  );
}

export default App;
