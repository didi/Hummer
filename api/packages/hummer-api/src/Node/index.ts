import { EventTarget } from "../EventTarget"

export class Node extends EventTarget {

    /**
     * 节点名称
     */
    public nodeName: string = ""

    /**
     * 标签名称
     */
    public name: string = ""

    /**
     * 节点类型
     */
    public nodeType: Number = 0

    /**
     * 父节点
     */
    public parentNode?: Node = undefined;

    /**
     * 当前节点的前一个节点
     */
    public prevSibling?: Node | null = null;
    /**
     * 当前节点的后一个节点
     */
    public nextSibling?: Node | null = null;
    /**
     * Node 子节点集合
     */
    protected children = new Set<Node>();

    /**
     * 第一个子节点
     */
    public firstChild?: Node | null = null;

    /**
     * 最后一个子节点
     */
    public lastChild?: Node | null = null;


    /**
     * 节点构造函数
     * 
     * @param tag  节点标签
     * @param name 组件名称
     * @param props  构造参数
     * @param nodeName  节点名称
     * 
     */
    public constructor(tag: string, name: string = tag, props: any,nodeName:string = tag) {
        super(tag, false, props);
        this.name = name;
        this.nodeName = nodeName;
    }


    // Mounted 生命周期
    protected _onMounted_() {
        this.onMounted();
    }

    protected onMounted() {
        //TODO 
    }

    // Destoryed 生命周期
    protected _onDestoryed_() {
        // removeChildWithFixed(this);
        this.onDestoryed();
    }

    protected onDestoryed() {
        //TODO 
    }

    /**
     * 是否有子节点
     * 
     * @returns 有：true；没有false
     */
    public hasChildNodes(): boolean {
        if (this.children.size > 0) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param child 在末尾添加节点
     */
    public appendChild(child: Node) {
        if(!child){
            return
        }
        child.unlinkSiblings();
        child.parentNode = this;
        this.children.add(child);

        if (!this.firstChild) {
            this.firstChild = child;
        }
        child.prevSibling = this.lastChild;
        child.nextSibling = null;
        if (this.lastChild) {
            this.lastChild.nextSibling = child;
        }
        this.lastChild = child;
        this._appendChild_(child);
        child._onMounted_();
    }


    private _appendChild_(child: Node) {
        this.getOriginObject().appendChild(child.getOriginObject());
    }

    private unlinkSiblings() {
        if (this.parentNode && this.parentNode.firstChild === this) {
            this.parentNode.firstChild = this.nextSibling;
        }

        if (this.parentNode && this.parentNode.lastChild === this) {
            this.parentNode.lastChild = this.prevSibling;
        }

        if (this.prevSibling) {
            this.prevSibling.nextSibling = this.nextSibling;
        }

        if (this.nextSibling) {
            this.nextSibling.prevSibling = this.prevSibling;
        }

        this.prevSibling = null;
        this.nextSibling = null;
    }

    /**
     * 移除指定节点
     * @param child 被移除的节点
     */
    public removeChild(child: Node) {
        if(!child){
            return
        }
        child._onDestoryed_();
        child.unlinkSiblings();
        child.parentNode = undefined;
        this.children.delete(child);
        this._removeChild_(child);
    }

    private _removeChild_(child: Node) {
        this.getOriginObject().removeChild(child.getOriginObject());
    }

    /**
     * 在制定节点前插入节点
     * 
     * @param child  被插入的阶段
     * @param anchor 插入位置锚点
     */
    public insertBefore(child: Node, anchor: Node) {
        if(!child||!anchor){
            return
        }
        child.unlinkSiblings();
        child.parentNode = this;
        if (anchor.prevSibling) {
            child.prevSibling = anchor.prevSibling;
            anchor.prevSibling.nextSibling = child;
        }
        anchor.prevSibling = child;
        child.nextSibling = anchor;

        if (this.firstChild === anchor) {
            this.firstChild = child;
        }
        this.children.add(child);
        this._insertBefore_(child, anchor);
        child._onMounted_();
    }

    private _insertBefore_(child: Node, anchor: Node) {
        this.getOriginObject().insertBefore(child.getOriginObject(), anchor.getOriginObject());
    }

    /**
     * 替换节点
     * 
     * @param newNode 新节点
     * @param oldNode 旧节点
     */
    public replaceChild(newNode: Node, oldNode: Node) {
        if(!newNode||!oldNode){
            return
        }
        oldNode._onDestoryed_();
        var _prevSibling = oldNode.prevSibling
        var _nextSibling = oldNode.nextSibling
        oldNode.unlinkSiblings();
        oldNode.parentNode = undefined;
        this.children.delete(oldNode);

        newNode.unlinkSiblings();
        newNode.parentNode = this;

        if (_prevSibling) {
            _prevSibling.nextSibling = newNode;
            newNode.prevSibling = _prevSibling;
        }
        if (_nextSibling) {
            _nextSibling.prevSibling = newNode;
            newNode.nextSibling = _nextSibling;
        }

        if (this.firstChild === oldNode) {
            this.firstChild = newNode;
        }
        if (this.lastChild === oldNode) {
            this.lastChild = newNode;
        }

        this.children.add(newNode);
        this._replaceChild_(newNode, oldNode);
        newNode._onMounted_()

    }

    private _replaceChild_(newNode: Node, oldNode: Node) {
        this.getOriginObject().replaceChild(newNode.getOriginObject(), oldNode.getOriginObject());
    }

    /**
     * 删除全部节点
     */
    public removeAll() {
        this.children.forEach(child => {
            child._onDestoryed_();
            child.unlinkSiblings();
            child.parentNode = undefined;
        })
        this.children.clear()
        this._removeAll_();
    }

    private _removeAll_() {
        this.getOriginObject().removeAll();
    }
}