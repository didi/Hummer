/**
 * 
 */
type Keyframe = {
    value: number|string|Record<string, any>
    percent:number
  }
  
/**
 * KeyframeAnimation 帧动画
 */
export class KeyframeAnimation {

    protected keyframes: Array<Keyframe> = [{
        percent: 0,
        value: { x: 0, y: 0 },
    }, {
        percent: 0.2,
        value: { x: 30, y: 0 },
    }, {
        percent: 0.6,
        value: { x: 30, y: 60 },
    }, {
        percent: 0.8,
        value: { x: 100, y: 60 },
    }, {
        percent: 1.0,
        value: { x: 100, y: 0 },
    }]
    protected duration: number = 0;
    protected delay: number = 0;
    protected repeatCount: number = 1;
    protected easing: string = 'ease';
    protected type: string = 'keyframe';
    protected property: string = 'position';

    public  _startFunc: Function = () => { };
    public _endFunc: Function = () => { };


    public constructor(property: any) {
        this.property = property
    }


    private _innerFunc(event: string, callback: Function){
        switch (event) {
            case 'start':
                this._startFunc =  () => {
                    callback.call(this, event)
                }
                break;
            case 'end':
                this._endFunc =  () => {
                    callback.call(this, event)
                }
                break;
        }
    }


    /**
     * 动画执行开始或结束时的回调
     *
     * @param event 事件类型（'start' 或 'end'）
     * @param callback 事件回调
     */
    public on(event: string, callback: Function) {
        this._innerFunc(event, callback)
    }


}