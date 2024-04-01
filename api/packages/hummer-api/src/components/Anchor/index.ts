import { View } from "../../components/View"

/**
 * 锚点
 */
export class Anchor extends View {


    /**
     * 构造函数
     * 
     * @param id
     * @param name 
     * @param props 
     */
    public constructor(id: string = "", name: string = "", props: any= {}) {
        super(id, name, props);
        
        this.setStyle({
            display: "none"
        });
    }


}