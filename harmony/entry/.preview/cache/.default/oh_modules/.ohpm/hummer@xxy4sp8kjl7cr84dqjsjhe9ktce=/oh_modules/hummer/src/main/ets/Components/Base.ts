import type { HMContext } from '../Context/HMContext';
export default class Base {
    // 不同上下文 会重复
    public readonly id: number;
    public readonly name: string;
    // 全局唯一
    public readonly uniqueId: string;
    public readonly context: HMContext;
    constructor(context: HMContext, id: number, name: string, ...args: any[]) {
        this.context = context;
        this.id = id;
        this.name = name;
        const ctxId = this.context.id;
        this.uniqueId = ctxId + '+' + id;
    }
}
