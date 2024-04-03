/**
 * BasicAnimation 基础动画
 */
export class BasicAnimation {

    public value: number | string | Record<string, any> = '';
    public duration: number = 0;
    public delay: number = 0;
    public repeatCount: number = 1;
    public easing: string = 'ease';

    protected type: string = 'basic';
    protected property: string = 'position';

    private _startFunc: Function | undefined = undefined;

    private _endFunc: Function | undefined = undefined;

    private _startCallback: Function = () => {
        if (this._startFunc) {
            this._startFunc();
        }
    }

    private _endCallback: Function = () => {
        if (this._endFunc) {
            this._endFunc();
        }
    }


    public constructor(property: any) {
        this.property = property
    }


    public get startCallback(): Function {
        return this._startCallback;
    }


    public get endCallback(): Function {
        return this._endCallback;
    }

    private _onEventListener(event: string, callback: Function) {
        switch (event) {
            case 'start':
                this._startFunc = callback;
                break;
            case 'end':
                this._endFunc = callback;
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
        this._onEventListener(event, eventListener)
    }


}