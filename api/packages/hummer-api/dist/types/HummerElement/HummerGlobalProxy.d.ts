import { HummerElement } from "../HummerElement";
import { FlexStyle } from "../Element";
export interface HummerGlobalProxy {
    setStyle(element: HummerElement, style: FlexStyle | Record<string, any>, flag: boolean): undefined;
    updateClassStyle(element: HummerElement, className: string): undefined;
    handleAnimation(element: HummerElement, animation: any): undefined;
    onMounted(element: HummerElement): undefined;
    onDestroyed(element: HummerElement): undefined;
    onHandleReceiveEvent(element: HummerElement, event: any): any;
}
