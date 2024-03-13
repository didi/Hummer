import { HummerElement } from "../HummerElement";
import { BasicAnimation } from "../anim/BasicAnimation";
import { KeyframeAnimation } from "../anim/KeyframeAnimation";
export interface HummerGlobalProxy {
    setStyle(element: HummerElement, style: object, flag: boolean): undefined;
    updateClassStyle(element: HummerElement, className: string): undefined;
    handleAnimation(element: HummerElement, animation: BasicAnimation | KeyframeAnimation): undefined;
    onMounted(element: HummerElement): undefined;
    onDestoryed(element: HummerElement): undefined;
    onHandleRecieveEvent(element: HummerElement, event: any): any;
}
