//Hummer api

import { Hummer } from "./Hummer"

export * from "./HMObject"

export * from "./Hummer"

export * from "./EventTarget"

export * from "./Node"

export * from "./Element"

export * from "./HummerElement"

export * from "./HummerElement/HummerGlobalProxy"

export * from "./anim/BasicAnimation"

export * from "./anim/KeyframeAnimation"

export * from "./components/View"

export * from "./components/Text"

export * from "./components/Input"

export * from "./components/TextArea"

export * from "./components/Image"

export * from "./HummerComponent"

export * from "./api/Memory"

export * from "./api/Navigator"

export * from "./api/Storage"

export * from "./api/NotifyCenter"



__GLOBAL__.Hummer = {

    getRootView() {
        return Hummer.getRootView();
    }

}





