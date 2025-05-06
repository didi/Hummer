import type { HMContext } from '../Context/HMContext';
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
import { MutationType, HMNode } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
export const RootNodeId = -1;
//页面创建
export const PageOnCreate = '__onCreate__';
//页面显示
export const PageOnAppear = '__onAppear__';
//页面隐藏
export const PageOnDisappear = '__onDisappear__';
//页面销毁
export const PageOnDestroy = '__onDestroy__';
// 页面返回事件
export const PageOnBack = '__onBack__';
export class RootNode extends HMNode {
    constructor(context: HMContext) {
        super(context, RootNodeId, 'root');
    }
    appendChild(child: HMNode): HMNode {
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
    public getSortedChild(): Array<HMNode> {
        const sortedArray = Array.from(this.childNodes);
        sortedArray.sort((node1, node2) => {
            if (node1.isFixedNode() && node2.isFixedNode()) {
                const zIndex1 = isUndefined(node1.style?.zIndex) ? 0 : node1.style.zIndex;
                const zIndex2 = isUndefined(node2.style?.zIndex) ? 0 : node2.style.zIndex;
                ;
                return zIndex1 > zIndex2 ? 1 : -1;
            }
            else {
                return node1.isFixedNode() ? 1 : -1;
            }
        });
        return sortedArray;
    }
}
