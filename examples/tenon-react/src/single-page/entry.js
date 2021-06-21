import React from "react"

import Tenon from "@hummer/tenon-react"

function App() {
  function handleTouch(){
    Toast.show('Touch')
  }
  return (
    <view onTouch={handleTouch}>
      <text>Touch Demo</text>
  </view>
  );
}

Tenon.render(<App/>)