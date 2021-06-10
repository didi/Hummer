import React from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';


const pressedStyle = {
  "background-color": "black",
}
const disabledStyle = {
  "background-color": "#eeeeee",
  color: "#333333",
}

function handleClickBtn(msg) {
  Toast.show(msg)
}

function App() {
  return (
    <PageItem title="Component Button">
      <DemoItem title="Button">
        <button className="btn" onTap={() => handleClickBtn("Base Button Clicked!")}>Button</button>
      </DemoItem>
      <DemoItem title="Button With Disabled">
        <button
          className="btn"
          disabled
          disabledStyle={disabledStyle}
          onTap={() => handleClickBtn("Button With DiabledStyle Clicked!")}
        > Button</button>
      </DemoItem>
      <DemoItem title="Button With PressedStyle">
        <button
          className="btn"
          pressedStyle={pressedStyle}
          onTap={() => handleClickBtn("Button With PressedStyle Clicked!")}
        > Button
        </button>
      </DemoItem>
    </PageItem>
  );
}

export default App;
