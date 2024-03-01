const { Document: _Document } = __hummer__

import { EventTarget } from "../EventTarget"

export class HummerComponent extends EventTarget {


    public constructor(tag: string, props: any) {
        super(tag, true, props)
    }


    
}