/**
 * BasicAnimation 基础动画
 */
export class BasicAnimation {

    public value: number | string | Record<string, any> = '';
    public duration: number = 0;
    public delay: number = 0;
    public repeatCount: number = 1;
    public easing: string = 'ease';
    public key: string = '__default__';

    protected type: string = 'basic';
    protected property: string = 'position';

    //使用双下划线开始和结尾避免被falcon引擎处理 eg:"__***__"
    private __startFunc__: Function | undefined = undefined;

    //使用双下划线开始和结尾避免被falcon引擎处理 eg:"__***__"
    private __endFunc__: Function | undefined = undefined;

    private __startCallback__: Function = (event: any) => {
        if (this.__startFunc__ && (event == undefined || event.key == this.key)) {
            this.__startFunc__();
        }
    }

    private __endCallback__: Function = (event: any) => {
        if (this.__endFunc__ && (event == undefined || event.key == this.key)) {
            this.__endFunc__();
        }
    }


    public constructor(property: any) {
        this.property = property
    }


    public get startCallback(): Function {
        return this.__startCallback__;
    }


    public get endCallback(): Function {
        return this.__endCallback__;
    }

    private _setOnEventListener_(event: string, callback: Function) {
        switch (event) {
            case 'start':
                this.__startFunc__ = callback;
                break;
            case 'end':
                this.__endFunc__ = callback;
                break;
        }
    }


    /**
     * 动画执行开始或结束时的回调
     *
     * @param event 事件类型（'start' 或 'end'）
     * @param eventListener 事件回调
     */
    public on(event: string, eventListener: Function) {
        this._setOnEventListener_(event, eventListener)
    }


}