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

  function handleTextarea({ value, text, state }) {
    console.log("Textarea Event:", value, text, state);
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
    <PageItem title="Component Textarea">
      <DemoItem title="Textarea">
        <textarea className="textarea" />
      </DemoItem>
      <DemoItem title="Textarea(rows)">
        <textarea className="textarea" rows={2}/>
      </DemoItem>
      <DemoItem title="Textarea(placeholder)">
        <textarea className="textarea textarea-place" placeholder="我是PlaceHolder" />
      </DemoItem>
      <DemoItem title="Textarea(focused)" operator={
        <>
          <button className="btn" onTap={() => {setFocused(!focused)}}>
            Change Textarea Focus
          </button>
        </>
      }>
        <textarea className="textarea textarea-place" focused={focused} />
      </DemoItem>
      <DemoItem title="Textarea(MaxLength)">
        <textarea className="textarea" maxLength={maxLength} />
      </DemoItem>
      <DemoItem customTitle={
        <>
          <text className="item-title-text">Textarea(type)</text>
          <text className="item-title-text">type: { type }</text> 
        </>
      } operator = {
        <button className="btn" onTap={handleChangeType}>Change Textarea Type</button>
      }>
        <textarea className="textarea" type={type} />
      </DemoItem>
      <DemoItem customTitle={
        <>
          <text className="item-title-text">Textarea(returnKeyType)</text>
          <text className="item-title-text">returnKeyType: { returnKeyType }</text> 
        </>
      } operator = {
        <button className="btn" onTap={handleChangeReturnKeyType}>Change Textarea ReturnKeyType</button>
      }>
        <textarea className="textarea" type={type} />
      </DemoItem>

      <DemoItem title="Textarea事件">
        <textarea
            className="textarea"
            onTextarea={handleTextarea}
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
