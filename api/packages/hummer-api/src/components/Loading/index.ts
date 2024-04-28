import { HummerElement } from "../../HummerElement"


export class Loading extends HummerElement {


    /**
     * 构造方法
     * 
     * @param id 
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any = {}) {
        super("Loading", name, { ...props, viewId: id });
    
    }


}