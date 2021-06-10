import React,{useState} from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

function handleSwitch(checked){
  Toast.show(checked);
}
function App() {

  let [checked, setChecked] = useState(false)

  return (
    <PageItem title="Use Hook">
      <DemoItem title="useState" operator={
        <>
          <button className="btn" onTap={() => { setChecked(!checked) }}>
            Toggle Checked
          </button>
        </>
      }>
        <switch
          style="width: 1rem;"
          value={checked}
          onSwitch={handleSwitch}
          openColor="#00ff00"
          closeColor="#ff0000"
          thumbColor="#00ffff"
        ></switch>
      </DemoItem>
    </PageItem>
  );
}

export default App;
