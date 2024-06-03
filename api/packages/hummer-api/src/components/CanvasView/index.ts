import { Canvas } from "../Canvas"


export class CanvasView extends Canvas {



    /**
     * CanvasView 与 Canvas同兼容旧Hummer
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super(id, name, props);
    }


}