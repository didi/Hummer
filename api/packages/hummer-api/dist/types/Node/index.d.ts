import { EventTarget } from "../EventTarget";
export declare class Node extends EventTarget {
    nodeName: string;
    name: string;
    nodeType: Number;
    parentNode?: Node;
    prevSibling?: Node | null;
    nextSibling?: Node | null;
    protected children: Set<Node>;
    firstChild?: Node | null;
    lastChild?: Node | null;
    constructor(tag: string, name: string | undefined, props: any, nodeName?: string);
    private _onMounted;
    protected onMounted(): void;
    private _onDestoryed;
    protected onDestoryed(): void;
    hasChildNodes(): boolean;
    appendChild(child: Node): void;
    private _appendChild;
    private unlinkSiblings;
    removeChild(child: Node): void;
    private _removeChild;
    insertBefore(child: Node, anchor: Node): void;
    private _insertBefore;
    replaceChild(newNode: Node, oldNode: Node): void;
    private _replaceChild;
    removeAll(): void;
    private _removeAll;
}
