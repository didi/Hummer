import React, {useState} from 'react';

import PageItem from '@common/components/PageItem';
import DemoItem from '@common/components/DemoItem';

const maxLength = 10;
const types = ["default", "number", "tel", "email", "password"];
const returnTypes = ["done", "go", "next", "search", "send"];

let i = 0;
function App() {
  let [focused, setFocused] = useState(false)
  let [type, setType] = useState('email')
  let [returnKeyType, setReturnType] = useState('done')


  function handleChangeType() {
    setType(types[i++ % 5]);
  }

  function handleChangeReturnKeyType() {
    setReturnType(returnTypes[i++ % 5]);
  }

  function handleInput({ value, text, state }) {
    console.log("Input Event:", value, text, state);
  }
  function handleChange(value) {
    console.log("Change Event:", value);
  }
  function handleFocus() {
    console.log("Focus Event:");
  }
  function handleBlur(value) {
    console.log("Blur Event:");
  }
  function handleConfirm(value) {
    console.log("Confirm Event:", value);
  }

  return (
    <PageItem title="Component Input">
      <DemoItem title="Input">
        <input class="input" />
      </DemoItem>
      <DemoItem title="Input(placeholder)">
        <input class="input input-place" placeholder="我是PlaceHolder" />
      </DemoItem>
      <DemoItem title="Input(focused)" operator={
        <>
          <button class="btn" onTap={() => {setFocused(!focused)}}>
            Change Input Focus
          </button>
        </>
      }>
        <input class="input input-place" focused={focused} />
      </DemoItem>
      <DemoItem title="Input(MaxLength)">
        <input class="input" maxLength={maxLength} />
      </DemoItem>
      <DemoItem customTitle={
        <>
          <text class="item-title-text">Input(type)</text>
          <text class="item-title-text">type: { type }</text> 
        </>
      } operator = {
        <button class="btn" onTap={handleChangeType}>Change Input Type</button>
      }>
        <input class="input" type={type} />
      </DemoItem>
      <DemoItem customTitle={
        <>
          <text class="item-title-text">Input(returnKeyType)</text>
          <text class="item-title-text">returnKeyType: { returnKeyType }</text> 
        </>
      } operator = {
        <button class="btn" onTap={handleChangeReturnKeyType}>Change Input ReturnKeyType</button>
      }>
        <input class="input" type={type} />
      </DemoItem>

      <DemoItem title="Input事件">
        <input
            class="input"
            onInput={handleInput}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onConfirm={handleConfirm}
          />      
        </DemoItem>
    </PageItem>
  );
}

export default App;
