import { timestamp } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { HMEvent } from '../../Event';
import type { HMNode } from '../../Node';
const ImageOnLoad = '__onImageLoad__';
interface ImageLoadEvent extends HMEvent<number> {
    srcType: number;
}
export function dispatchImageEvent(node: HMNode, isSuccess: boolean) {
    const event: ImageLoadEvent = {
        type: ImageOnLoad,
        state: isSuccess ? 0 : -1,
        timestamp: timestamp(),
        srcType: 0
    };
    node.dispatchEvent(ImageOnLoad, event);
}
