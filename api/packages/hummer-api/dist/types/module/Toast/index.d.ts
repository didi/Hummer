import { HummerComponent } from "../../HummerComponent";
import { View } from "../../components/View";
export declare class Toast extends HummerComponent {
    constructor(props?: any);
    protected static newInstance(): Toast;
    protected static checkInstance(): void;
    static get instance(): Toast;
    static show(msg: string, duration?: number): void;
    static custom(view: View, duration: number): void;
    protected show(msg: string, duration?: number): void;
    protected custom(view: View, duration: number): void;
}
