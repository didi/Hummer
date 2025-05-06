import type { HMContext } from '../Context/HMContext';
import { MutationType, Node } from "@bundle:com.example.hummer/entry/src/main/Hummer/Components/Node";
export const RootNodeId = -1;
export class RootNode extends Node {
    constructor(context: HMContext) {
        super(context, RootNodeId, 'root');
    }
    appendChild(child: Node): Node {
        const idxOfRef = this.findIndex(child);
        if (idxOfRef < 0) {
            child.parentNode?.removeChild(child);
            this.childNodes.push(child);
        }
        else {
            this.childNodes.splice(idxOfRef, 1);
            this.childNodes.push(child);
        }
        child.parentNode = this;
        this.triggerMutation(MutationType.Children, this.childNodes);
        return child;
    }
}
