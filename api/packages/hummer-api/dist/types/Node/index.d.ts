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
    protected _onMounted_(): void;
    protected onMounted(): void;
    protected _onDestoryed_(): void;
    protected onDestoryed(): void;
    hasChildNodes(): boolean;
    appendChild(child: Node): void;
    private _appendChild_;
    private unlinkSiblings;
    removeChild(child: Node): void;
    private _removeChild_;
    insertBefore(child: Node, anchor: Node): void;
    private _insertBefore_;
    replaceChild(newNode: Node, oldNode: Node): void;
    private _replaceChild_;
    removeAll(): void;
    private _removeAll_;
}
