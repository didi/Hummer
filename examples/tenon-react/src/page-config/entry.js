import React from "react"
import * as  Tenon from "@hummer/tenon-react"

import App from "./App"
import "./App.less"

Tenon.render(<App />, {
  canScroll: false, // 禁止滚动
  pageStyle: { // 全局页面样式
    backgroundColor: '#f3ffff'
  }
})