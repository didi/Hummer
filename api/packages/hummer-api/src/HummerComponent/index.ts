import { EventTarget } from "../EventTarget"

export class HummerComponent extends EventTarget {


    public constructor(tag: string, props: any, viewType: boolean = false) {
        super(tag, true, { ...props, viewType: viewType })
        this.bindEventTarget();
    }



}