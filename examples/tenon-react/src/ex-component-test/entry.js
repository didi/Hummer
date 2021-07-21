import React from "react"
import Tenon from "@hummer/tenon-react"

import App from "./App"
import "./App.less"

import SimpleView from './native-components/simple-view'
import AttrView from './native-components/attr-view'
import EventView from './native-components/event-view'
import SafeView from './native-components/safe-view'


Tenon.register(AttrView)
Tenon.register(SimpleView)
Tenon.register(EventView)
Tenon.register(SafeView)
Tenon.render(<App />)